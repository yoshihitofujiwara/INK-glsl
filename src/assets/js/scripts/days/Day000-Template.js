// console.log("scripts");
// import source from '../../shader/default.vert';
// console.log(source);

import { PlaneBufferGeometry, ShaderMaterial, Mesh, Vector2} from "three";

import RenderManager from "$utils/RenderManager";
import ShaderPlaneMesh from "$utils/ShaderPlaneMesh";
import Debug from '$utils/Debug';


export default class Day001{
  constructor(){
    let debug = new Debug();

    let mesh = new ShaderPlaneMesh(null, {
      // fragmentShader: fragmentShader
    })

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

