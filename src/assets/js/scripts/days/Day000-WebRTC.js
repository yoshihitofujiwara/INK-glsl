import { ImageUtils} from "three";
import gsap from "gsap";
import RenderManager from "$utils/RenderManager";
import ShaderPlaneMesh from "$utils/ShaderPlaneMesh";
import Debug from "$utils/Debug";
import WebRTC from "$ink/class_utils/WebRTC";
import dayFrag from "$shader/days/day000.frag";
import { LinearFilter, RGBFormat, Vector2, Texture, VideoTexture } from "three";


export default class Day{
  static title(){
    return "WebRTC";
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
        }
      }
    });


    // @debug
    // debug.gui.add(mesh.material.uniforms.u_grid, "value", 0, 512/4).name("Grid"));

// console.log(WebRTC);


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
      mesh.material.uniforms.u_mouse.value.x = e.offsetX / window.innerWidth;
      mesh.material.uniforms.u_mouse.value.y = 1. - (e.offsetY / window.innerHeight);
    });
  }
}

