import { ImageUtils} from "three";
import gsap from "gsap";
import RenderManager from "$utils/RenderManager";
import ShaderPlaneMesh from "$utils/ShaderPlaneMesh";
import Debug from '$utils/Debug';
import dayFrag from "$shader/days/day008.frag";

import { LinearFilter, Vector2 } from "three";



export default class Day{
  static title(){
    return "Distortion";
  }

  constructor(){
    let debug = new Debug();

    let map1 = ImageUtils.loadTexture("./assets/img/img03.jpg");
    let map2 = ImageUtils.loadTexture("./assets/img/img04.jpg");

    map1.magFilter = map2.magFilter = LinearFilter;
    map1.minFilter = map2.minFilter = LinearFilter;

    let mesh = new ShaderPlaneMesh(null, {
      fragmentShader: dayFrag,
      uniforms: {
        u_map1: {
          type: "t",
          value: map1
        },
        u_map2: {
          type: "t",
          value: map2
        },
        u_effectMap: {
          type: "t",
          value: ImageUtils.loadTexture("./assets/img/pattern/1.jpg")
        },
        u_progress: { type: "f", value: 0.0},
        u_intensity: { type: "f", value: 0.2},
        u_angle: { type: "f", value: Math.PI * 0.25},
        u_aspect: { type: "v", value: new Vector2(1.0, 1.0)},
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

