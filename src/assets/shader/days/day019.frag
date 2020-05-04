// precision highp float;
precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

uniform sampler2D u_map1;



varying vec2 vUv;


#define PI 3.14159265359

#pragma glslify:box=require("../box.frag")
#pragma glslify:random=require("../random.glsl")

float dotWave(vec2 position, float grid){
	position=(floor(position*grid) + vec2(.5))/grid;
	float d=distance(vec2(.5), position);
	return (1.+sin(d*3.-u_time*3.))*.5;
}

float boxWave(vec2 uv,float n){
	vec2 st=fract(uv*n);
	float size=dotWave(uv,n);
	vec4 color = box(st, size, vec4(1.0));
	return color.a;
}



float boxSize(vec2 st, float n){
	st = (floor(st * n) + .5) / n;
	float offs = random(st) * 5.;
	return (1. + sin(u_time * 3. + offs)) * .5;
}



void main(){
	vec4 color=vec4(.3804,.7647,.8784,1.);
	// vec2 st = gl_FragCoord.xy/u_resolution.xy;

	vec2 uv = vUv;

	float n = 10.;
	vec2 st = fract(uv * n);

	// float size = boxSize(uv, n);
	vec2 st2 = (floor(uv * n) + .5) / n;
	float offs = random(st2) * 5.;
	float size = (1. + sin(u_time * 3. + offs)) * .5;

	gl_FragColor= box(st, size, color);

}
