// precision highp float;
precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

uniform vec2 u_translate;
uniform vec2 u_scale;
uniform float u_rotate;

uniform int u_vert;
uniform float u_radius;

varying vec2 vUv;

#pragma glslify:polygon=require("../polygon.frag")
#pragma glslify:rotate=require("../rotate.vert")


// SEE: https://thndl.com/square-shaped-shaders.html


void main(){
	vec4 color = vec4(0.3804, 0.7647, 0.8784, 1.0);
	vec2 st=gl_FragCoord.xy/u_resolution.xy;
	// vec2 c = (vec2(0.5) - st) * 2.0;

	// translate
	vec2 offset = u_translate/u_resolution;
	offset.y = 1.0 - offset.y;

	// rotate
	st *= rotate(u_rotate);
	offset *= rotate(u_rotate);

	// scale
	if(u_scale.x == 0.0 || u_scale.y == 0.0){
		discard;
	}
	st /= u_scale;
	offset /= u_scale;

	// polygon
	vec4 fColor = polygon(st, offset, u_vert, u_radius, color);

	gl_FragColor = fColor;
}
