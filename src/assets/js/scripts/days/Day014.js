import { ImageUtils} from "three";
import gsap from "gsap";
import RenderManager from "$utils/RenderManager";
import ShaderPlaneMesh from "$utils/ShaderPlaneMesh";
import Debug from '$utils/Debug';
import {lerp} from '$ink/utils/calc';
import dayFrag from "$shader/days/day014.frag";

import { LinearFilter, Vector2 } from "three";

// https://github.com/akella/webgl-mouseover-effects/blob/master/js/post/fragment.glsl

export default class Day{
  static title(){
    return "RGB Split Effect";
  }

  constructor(){
    let debug = new Debug();

    let map1 = ImageUtils.loadTexture("./assets/img/img06.jpg");

    map1.magFilter = map1.minFilter = LinearFilter;

    let mesh = new ShaderPlaneMesh(null, {
      fragmentShader: dayFrag,
      uniforms: {
        u_map1: {
          type: "t",
          value: map1
        },
        u_velocity: { type: "f", value: 0},
        u_radius: { type: "f", value: .3},
        u_zoom: { type: "f", value: 40.},
        u_colorShift: { type: "f", value: .5},
        u_followMouse: { type: "v2", value: new Vector2()}
      }
    });

    let params = {
      targetSpeed: 0,
      speed: 0,
      mouse: new Vector2(),
      prevMouse: new Vector2(),
      followMouse: new Vector2(),
      decay: 0.1
    }

    // @debug
    debug.gui.add(params, "decay", 0.01, 1, 0.01).name("Decay");
    debug.gui.add(mesh.material.uniforms.u_radius, "value", 0, 1, 0.01).name("Radius");
    debug.gui.add(mesh.material.uniforms.u_zoom, "value", 0, 50).name("Zoom");
    debug.gui.add(mesh.material.uniforms.u_colorShift, "value", 0, 5, 0.01).name("Color Shift");

    this.renderManager = new RenderManager(document.querySelector("#canvas"));
    this.renderManager.scene.add(mesh);

    this.renderManager.start();


    // @event
    this.renderManager.addEventListener("update", (_params) => {
      mesh.material.uniformsNeedUpdate = true;
      mesh.material.uniforms.u_time.value = _params.time;
      debug.update();

      // day013

      params.speed = Math.sqrt(
        Math.pow(params.prevMouse.x - params.mouse.x, 2) +
        Math.pow(params.prevMouse.y - params.mouse.y, 2)
      );

      params.targetSpeed = lerp(params.decay, params.targetSpeed, params.speed);
      params.followMouse.x = lerp(params.decay, params.followMouse.x, params.mouse.x);
      params.followMouse.y = lerp(params.decay, params.followMouse.y, params.mouse.y);

      mesh.material.uniforms.u_followMouse.value = params.followMouse;
      mesh.material.uniforms.u_velocity.value = Math.min(params.targetSpeed, 0.05);

      params.prevMouse.x = params.mouse.x;
      params.prevMouse.y = params.mouse.y;
      params.targetSpeed *= 0.999;
    });

    this.renderManager.canvas.addEventListener("mousemove", (e)=>{
      mesh.material.uniforms.u_mouse.value.x = e.offsetX / 512;
      mesh.material.uniforms.u_mouse.value.y = 1. - (e.offsetY / 512);

      // day013
      params.mouse.x = mesh.material.uniforms.u_mouse.value.x;
      params.mouse.y = mesh.material.uniforms.u_mouse.value.y;
    });
  }
}

