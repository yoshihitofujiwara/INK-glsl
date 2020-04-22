// precision highp float;
precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

uniform sampler2D u_map1;
uniform float u_grid;

varying vec2 vUv;

#pragma glslify:mosaic=require("../mosaic.frag")


void main(){
	// vec4 color=vec4(0.1647, 0.3843, 0.4549, 1.0);
	// vec2 st = gl_FragCoord.xy/u_resolution.xy;

	vec2 uv = mosaic(vUv, u_grid);

  gl_FragColor = texture2D(u_map1, uv);

}
