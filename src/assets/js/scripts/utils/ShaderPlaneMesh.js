import { PlaneBufferGeometry, ShaderMaterial, Mesh, Vector2 } from "three";
import { mixin } from "$ink/utils/utility";


const VERTEX_SHADER = `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4( position, 1.0 );
}`;

const FRAGMENT_SHADER = `
// precision highp float;
precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;
uniform float u_mouse;

void main() {
  vec2 st = gl_FragCoord.xy/u_resolution.xy;
  gl_FragColor=vec4(st.x, st.y, 0.0, 1.0);
}`;


export default class ShaderPlaneMesh extends Mesh {
	/**
	 * constructor
	 * @param  {Object} geometryParams
	 * @param  {Object} materialParams
	 */
	constructor(geometryParams, materialParams) {
    let gParams = mixin(true, {
        width: 2,
        height : 2,
        segX: 1,
        segY: 1,
      },
      geometryParams
    );
    let geometry = new PlaneBufferGeometry(
      gParams.width,
      gParams.height,
      gParams.segX,
      gParams.segY
    );

    let mParams = mixin(true, {
      uniforms: {
        u_time: { type: "f", value: 1.0 },
        u_resolution: { type: "v2", value: new Vector2(512, 512) },
        u_mouse: { type: "v2", value: new Vector2(512 * 0.5, 512 * 0.5) }
       },
       vertexShader: VERTEX_SHADER,
       fragmentShader: FRAGMENT_SHADER,
        transparent: true
      },
      materialParams
    );
    let material = new ShaderMaterial(mParams);

    super(geometry, material);
	}
}
