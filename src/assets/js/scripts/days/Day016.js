import { ImageUtils} from "three";
import gsap from "gsap";
import RenderManager from "$utils/RenderManager";
import ShaderPlaneMesh from "$utils/ShaderPlaneMesh";
import Debug from '$utils/Debug';
import dayFrag from "$shader/days/day016.frag";

import { LinearFilter, Vector2 } from "three";



export default class Day{
  static title(){
    return "Split Screen";
  }

  constructor(){
    let debug = new Debug();

    let map1 = ImageUtils.loadTexture("./assets/img/img03.jpg");

    map1.magFilter = map1.minFilter = LinearFilter;

    let mesh = new ShaderPlaneMesh(null, {
      fragmentShader: dayFrag,
      uniforms: {
        u_map1: {
          type: "t",
          value: map1
        },
        u_split: { type: "f", value: 4},
        u_offset: { type: "f", value: .5},
      }
    });

    // @debug
    debug.gui.add(mesh.material.uniforms.u_split, "value", 1, 32, 1).name("Split");
    debug.gui.add(mesh.material.uniforms.u_offset, "value", 0, 1, 0.1).name("Offset");





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

