import { ImageUtils} from "three";
import gsap from "gsap";
import RenderManager from "$utils/RenderManager";
import ShaderPlaneMesh from "$utils/ShaderPlaneMesh";
import Debug from '$utils/Debug';
import dayFrag from "$shader/days/day011.frag";

import { LinearFilter, Vector2 } from "three";



export default class Day{
  static title(){
    return "Wave";
  }

  constructor(){
    let debug = new Debug();

    let map1 = ImageUtils.loadTexture("./assets/img/img01.jpg");

    map1.magFilter = map1.minFilter = LinearFilter;

    let mesh = new ShaderPlaneMesh(null, {
      fragmentShader: dayFrag,
      uniforms: {
        u_map1: {
          type: "t",
          value: map1
        },
        u_fineness: { type: "f", value: 16},
        u_speed: { type: "f", value: 5},
        u_volume: { type: "f", value: 0.25},
      }
    });

    // @debug
    debug.gui.add(mesh.material.uniforms.u_speed, "value", 0, 10, 0.1).name("Speed").onChange(()=>{
      mesh.material.uniformsNeedUpdate = true;
    });

    debug.gui.add(mesh.material.uniforms.u_fineness, "value", 0, 512).name("Fineness").onChange(()=>{
      mesh.material.uniformsNeedUpdate = true;
    });

    debug.gui.add(mesh.material.uniforms.u_volume, "value", 0, 1, 0.01).name("Volume").onChange(()=>{
      mesh.material.uniformsNeedUpdate = true;
    });

    this.renderManager = new RenderManager(document.querySelector("#canvas"));
    this.renderManager.scene.add(mesh);

    this.renderManager.start();

    // @event
    this.renderManager.addEventListener("update", (params) => {
      mesh.material.uniformsNeedUpdate = true;
      mesh.material.uniforms.u_time.value = params.time;
      debug.update();
    });

    this.renderManager.canvas.addEventListener("mousemove", (e)=>{
      mesh.material.uniforms.u_mouse.value.x = e.offsetX;
      mesh.material.uniforms.u_mouse.value.y = e.offsetY;
    });
  }
}

