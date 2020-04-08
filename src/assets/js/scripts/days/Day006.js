import { ImageUtils} from "three";
import RenderManager from "$utils/RenderManager";
import ShaderPlaneMesh from "$utils/ShaderPlaneMesh";
import Debug from '$utils/Debug';
import dayFrag from "$shader/days/day006.frag";

import { Vector2 } from "three";

export default class Day006{
  static title(){
    return "Lens";
  }

  constructor(){
    let debug = new Debug();


    let mesh = new ShaderPlaneMesh(null, {
      fragmentShader: dayFrag,
      uniforms: {
        u_map1: {
          type: "t",
          value: ImageUtils.loadTexture("./assets/img/img06.jpg")
        },
        u_thickness: { type: "f", value: 0.6},
        u_radius: { type: "f", value: 0.4}
      }
    });

    // @debug
    debug.gui.add(mesh.material.uniforms.u_thickness, "value", 0, 1).name("Zoom").onChange(()=>{
      mesh.material.uniformsNeedUpdate = true;
    });

    debug.gui.add(mesh.material.uniforms.u_radius, "value", 0.1, 0.5).name("Radius").onChange(()=>{
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

