// precision highp float;
precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;
uniform float u_mouse;

varying vec2 vUv;

#pragma glslify:circle=require("../circle.frag")
#pragma glslify:inCircle=require("../inCircle.frag")


void main(){
	vec2 st=gl_FragCoord.xy/u_resolution.xy;

	// circle
	gl_FragColor = circle(st, vec2(0.5), 0.3, vec4(0.3804, 0.7647, 0.8784, 1.0));

	// inCircle
	// if(inCircle(st, vec2(.5), .5)){
	// 	gl_FragColor = vec4(0.3804, 0.7647, 0.8784, 1.0);
	// }
}
