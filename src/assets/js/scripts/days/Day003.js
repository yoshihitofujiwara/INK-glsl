import RenderManager from "$utils/RenderManager";
import ShaderPlaneMesh from "$utils/ShaderPlaneMesh";
import Debug from '$utils/Debug';
import dayFrag from "$shader/days/day003.frag";

import { Vector2 } from "three";

export default class Day003{
  constructor(){
    let debug = new Debug();

    let mesh = new ShaderPlaneMesh(null, {
      fragmentShader: dayFrag,
      uniforms: {
        u_rotate: { type: "f", value: 0.0 },
        u_translate: { type: "v2", value: new Vector2(512*0.5, 512*0.5) },
        u_scale: { type: "v2", value:  new Vector2(1, 1) },
        u_vert: { type: "i", value: 6 },
        u_radius: { type: "f", value: 0.25 },
      }
    });


    // @debug
    debug.gui.add(mesh.material.uniforms.u_translate.value, "x", 0, 512).name("translateX").onChange(()=>{
      mesh.material.uniformsNeedUpdate = true;
    });
    debug.gui.add(mesh.material.uniforms.u_translate.value, "y", 0, 512).name("translateY").onChange(()=>{
      mesh.material.uniformsNeedUpdate = true;
    });

    debug.gui.add(mesh.material.uniforms.u_scale.value, "x", 0, 2).name("scaleX").onChange(()=>{
      mesh.material.uniformsNeedUpdate = true;
    });
    debug.gui.add(mesh.material.uniforms.u_scale.value, "y", 0, 2).name("scaleY").onChange(()=>{
      mesh.material.uniformsNeedUpdate = true;
    });

    debug.gui.add(mesh.material.uniforms.u_rotate, "value", 0, Math.PI * 2, 0.01).name("rotate").onChange(()=>{
      mesh.material.uniformsNeedUpdate = true;
    });

    debug.gui.add(mesh.material.uniforms.u_vert, "value", 3, 36, 1).name("Vert").onChange(()=>{
      mesh.material.uniformsNeedUpdate = true;
    });

    debug.gui.add(mesh.material.uniforms.u_radius, "value", 0, 0.5).name("Radius").onChange(()=>{
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
      mesh.material.uniforms.u_mouse.value.x = e.offsetX
      mesh.material.uniforms.u_mouse.value.y = e.offsetY
    });
  }
}

