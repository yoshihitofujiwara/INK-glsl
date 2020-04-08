// precision highp float;
precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;
uniform float u_tile;

varying vec2 vUv;

#pragma glslify:polygon=require("../polygon.frag")
#pragma glslify:inPolygon=require("../inPolygon.frag")

// SEE: https://thndl.com/square-shaped-shaders.html

void main(){
	vec4 color=vec4(.3804,.7647,.8784,1.);
	vec2 st=gl_FragCoord.xy/u_resolution.xy;
	st *= vec2(u_tile);
	st = fract(st);

	vec2 offset = vec2(.5);

	// polygon
	gl_FragColor = polygon(st, offset, 6, 0.3, color);
}
