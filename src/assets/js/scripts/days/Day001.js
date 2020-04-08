import RenderManager from "$utils/RenderManager";
import ShaderPlaneMesh from "$utils/ShaderPlaneMesh";
import Debug from '$utils/Debug';
import dayFrag from "$shader/days/day001.frag";


export default class Day001{
  static title(){
    return "Circle";
  }


  constructor(){
    let debug = new Debug();

    let mesh = new ShaderPlaneMesh(null, {
      fragmentShader: dayFrag
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

