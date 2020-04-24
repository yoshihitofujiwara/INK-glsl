// precision highp float;
precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

uniform sampler2D u_map1;
uniform float u_split;
uniform float u_offset;

varying vec2 vUv;


#pragma glslify:splitScreen=require("../splitScreen.frag")


void main(){
	// vec4 color=vec4(0.1647, 0.3843, 0.4549, 1.0);
	// vec2 st = gl_FragCoord.xy/u_resolution.xy;

	vec2 uv = vUv;

	uv = splitScreen(uv, vec2(u_offset), u_split);

	gl_FragColor= texture2D( u_map1, uv);
}
