import { ImageUtils} from "three";
import gsap from "gsap";
import RenderManager from "$utils/RenderManager";
import ShaderPlaneMesh from "$utils/ShaderPlaneMesh";
import Debug from '$utils/Debug';
import {lerp} from '$ink/utils/calc';
import WebRTC from '$ink/class_utils/WebRTC';
import dayFrag from "$shader/days/day015.frag";

import { LinearFilter, RGBFormat, Vector2, Texture, VideoTexture } from "three";

// https://github.com/akella/webgl-mouseover-effects/blob/master/js/post/fragment.glsl

export default class Day{
  static title(){
    return "Sobel Filter";
  }

  constructor(){
    this.video = document.querySelector("#video");

    this.webRTC = new WebRTC(this.video, {
      video: { width: 512, height: 512 }
    });

    this.webRTC.on("load", ()=>{
      this.start();
    });

    this.webRTC.setup();
  }


  start(){
    let videoTexture = new VideoTexture(this.video);
    videoTexture.minFilter = LinearFilter;
    videoTexture.magFilter = LinearFilter;
    videoTexture.format = RGBFormat;


    let debug = new Debug();


    let mesh = new ShaderPlaneMesh(null, {
      fragmentShader: dayFrag,
      uniforms: {
        u_map1: {
          type: "t",
          value: videoTexture
        },
        u_amount: {
          type: "f",
          value: 1
        }
      }
    });


    // @debug
    debug.gui.add(mesh.material.uniforms.u_amount, "value", 0, 1, 0.01).name("Amount");


    this.renderManager = new RenderManager(document.querySelector("#canvas"));
    this.renderManager.scene.add(mesh);

    this.renderManager.start();

    // @event
    this.renderManager.addEventListener("update", (_params) => {
      mesh.material.uniformsNeedUpdate = true;
      mesh.material.uniforms.u_time.value = _params.time;
      debug.update();
    });

    this.renderManager.canvas.addEventListener("mousemove", (e)=>{
      mesh.material.uniforms.u_mouse.value.x = e.offsetX / 512;
      mesh.material.uniforms.u_mouse.value.y = 1. - (e.offsetY / 512);
    });
  }
}

