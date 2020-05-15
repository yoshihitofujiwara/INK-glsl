import { ImageUtils} from "three";
import gsap from "gsap";
import RenderManager from "$utils/RenderManager";
import ShaderPlaneMesh from "$utils/ShaderPlaneMesh";
import Debug from '$utils/Debug';
import dayFrag from "$shader/days/day026.frag";

import { LinearFilter, Vector3 } from "three";


export default class Day{
  static title(){
    return "Folding Tiles";
  }

  constructor(){
    let debug = new Debug();

    let map1 = ImageUtils.loadTexture("./assets/img/img04.jpg");

    map1.magFilter = map1.minFilter = LinearFilter;


    let mesh = new ShaderPlaneMesh(null, {
      fragmentShader: dayFrag,
      uniforms: {
        u_map1: {
          type: "t",
          value: map1
        },
        u_tile: { type: "f", value: 3},
      }
    });

    // @debug
    debug.gui.add(mesh.material.uniforms.u_tile, "value", 1, 10, 1).name("Tile");




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
