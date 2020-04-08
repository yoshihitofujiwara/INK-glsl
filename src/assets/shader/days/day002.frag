// precision highp float;
precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

varying vec2 vUv;

#pragma glslify:polygon=require("../polygon.frag")
#pragma glslify:inPolygon=require("../inPolygon.frag")


// SEE: https://thndl.com/square-shaped-shaders.html

void main(){
	vec2 st=gl_FragCoord.xy/u_resolution.xy;
	vec2 c = (vec2(0.5) - st) * 2.0;

	// polygon
	// gl_FragColor = polygon(st, vec2(0.5), 6, 0.3, vec4(0.3804, 0.7647, 0.8784, 1.0));

	// inPolygon
	if(inPolygon(st, vec2(0.5), 6, 0.3)){
		gl_FragColor = vec4(0.3804, 0.7647, 0.8784, 1.0);
	}
}
