import { ImageUtils} from "three";
import gsap from "gsap";
import RenderManager from "$utils/RenderManager";
import ShaderPlaneMesh from "$utils/ShaderPlaneMesh";
import Debug from '$utils/Debug';
import dayFrag from "$shader/days/day007.frag";


export default class Day006{
  static title(){
    return "Fade";
  }

  constructor(){
    let debug = new Debug();

    let mesh = new ShaderPlaneMesh(null, {
      fragmentShader: dayFrag,
      uniforms: {
        u_map1: {
          type: "t",
          value: ImageUtils.loadTexture("./assets/img/img03.jpg")
        },
        u_map2: {
          type: "t",
          value: ImageUtils.loadTexture("./assets/img/img04.jpg")
        },
        u_progress: { type: "f", value: 0.0}
      }
    });

    // @debug
    let p = debug.gui.add(mesh.material.uniforms.u_progress, "value", 0, 1, 0.01).name("Progress").onChange(()=>{
      mesh.material.uniformsNeedUpdate = true;
    });

    let params = {
      tween: ()=>{
        let value = 1;
        if(mesh.material.uniforms.u_progress.value == 1){
          value = 0;
        }
        gsap.to(mesh.material.uniforms.u_progress, {
          value: value,
          duration: 1,
          onUpdate: ()=>{
            debug.gui.updateDisplay();
          }
        });
      }
    }

    debug.gui.add(params, "tween");



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

