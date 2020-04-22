// precision highp float;
precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

uniform sampler2D u_map1;
uniform sampler2D u_map2;
uniform sampler2D u_effectMap;
uniform float u_progress;
uniform float u_intensity;
uniform float u_angle;
uniform vec2 u_aspect;

varying vec2 vUv;

float PI2=6.283185307179586;
float PI_H4=PI2/8.0;

#pragma glslify:rotate=require("../rotate.glsl")


void main(){
	// vec4 color=vec4(0.1647, 0.3843, 0.4549, 1.0);
	vec2 st = gl_FragCoord.xy/u_resolution.xy;


	vec4 effect = texture2D(u_effectMap, vUv);
	vec2 effectVec = vec2(effect.r, effect.g);
	vec2 uv = (st-vec2(.5)) * u_aspect + vec2(.5);

	float angle1 = u_angle;
	// float angle2 = u_angle * 5.0;
	float angle2 = -u_angle * 3.0;

	vec2 uv1=uv+rotate(angle1)*effectVec*u_intensity*u_progress;
	vec2 uv2=uv+rotate(angle2)*effectVec*u_intensity*(1.-u_progress);

	vec4 color1 = texture2D(u_map1, uv1);
	vec4 color2 = texture2D(u_map2, uv2);
	gl_FragColor = mix(color1, color2, u_progress);
}
