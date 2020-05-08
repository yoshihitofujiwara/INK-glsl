import { ImageUtils} from "three";
import gsap from "gsap";
import RenderManager from "$utils/RenderManager";
import ShaderPlaneMesh from "$utils/ShaderPlaneMesh";
import Debug from '$utils/Debug';
import dayFrag from "$shader/days/day021.frag";

import { LinearFilter, Vector2 } from "three";


// https://www.shadertoy.com/view/MtXBDs

export default class Day{
  static title(){
    return "Glitch Noise2";
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
        u_amount: { type: "f", value: 0.2},
        u_speed: { type: "f", value: 0.2},
        u_rgbSlice: { type: "b", value: true},
      }
    });

    // @debug
    debug.gui.add(mesh.material.uniforms.u_amount, "value", 0, 1, 0.01).name("Amount");
    debug.gui.add(mesh.material.uniforms.u_speed, "value", 0, 1, 0.01).name("Speed");
    debug.gui.add(mesh.material.uniforms.u_rgbSlice, "value").name("Rgb Slice");


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

