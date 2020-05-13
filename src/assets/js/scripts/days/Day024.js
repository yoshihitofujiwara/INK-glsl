import { ImageUtils} from "three";
import gsap from "gsap";
import RenderManager from "$utils/RenderManager";
import ShaderPlaneMesh from "$utils/ShaderPlaneMesh";
import Debug from '$utils/Debug';
import dayFrag from "$shader/days/day024.frag";

import { LinearFilter, Vector3 } from "three";


export default class Day{
  static title(){
    return "Morphing2";
  }

  constructor(){
    let debug = new Debug();

    let map1 = ImageUtils.loadTexture("./assets/img/img04.jpg");

    map1.magFilter = map1.minFilter = LinearFilter;

    let params = {
      color1: [244, 41, 136],
      color2: [251, 240, 122],
    }

    function normColor(color) {
      return new Vector3(
        color[0] / 255,
        color[1] / 255,
        color[2] / 255
      );
    }

    let mesh = new ShaderPlaneMesh(null, {
      fragmentShader: dayFrag,
      uniforms: {
        u_map1: {
          type: "t",
          value: map1
        },
        u_amount: { type: "f", value: 1},
        u_color1: { type: "v3", value: normColor(params.color1)},
        u_color2: { type: "v3", value: normColor(params.color2)}
      }
    });

    // @debug
    debug.gui.add(mesh.material.uniforms.u_amount, "value", 0, 1, 0.01).name("Amount");




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
