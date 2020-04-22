// precision highp float;
precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

uniform sampler2D u_map1;
uniform float u_distance;
uniform float u_speed;

varying vec2 vUv;

#pragma glslify: snoise2 = require(glsl-noise/simplex/2d)
#pragma glslify:rotate=require("../rotate.glsl")

float PI2 = 6.283185307179586;


void main(){
	// vec4 color=vec4(0.1647, 0.3843, 0.4549, 1.0);
	vec2 st = gl_FragCoord.xy/u_resolution.xy;

	float delta = PI2 * snoise2(vec2(u_time *u_speed));

  float r = texture2D( u_map1, vUv + vec2(rotate(delta) * u_distance)).r;
  float g = texture2D( u_map1, vUv ).g;
  float b = texture2D( u_map1, vUv - vec2(rotate(delta) * u_distance)).b;


	gl_FragColor= vec4(r, g, b, 1.0);
}
