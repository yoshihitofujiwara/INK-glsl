import { ImageUtils} from "three";
import gsap from "gsap";
import RenderManager from "$utils/RenderManager";
import ShaderPlaneMesh from "$utils/ShaderPlaneMesh";
import Debug from '$utils/Debug';
import dayFrag from "$shader/days/day010.frag";

import { LinearFilter, Vector2 } from "three";



export default class Day{
  static title(){
    return "RGB Split";
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
        u_distance: { type: "f", value: 0.01},
        u_speed: { type: "f", value: 0.5},
      }
    });

    // @debug
    debug.gui.add(mesh.material.uniforms.u_speed, "value", 0.1, 3, 0.01).name("Speed").onChange(()=>{
      mesh.material.uniformsNeedUpdate = true;
    });


    debug.gui.add(mesh.material.uniforms.u_distance, "value", 0, 0.03, 0.001).name("Distance").onChange(()=>{
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

