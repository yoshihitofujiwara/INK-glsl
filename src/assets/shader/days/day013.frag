// precision highp float;
precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

uniform sampler2D u_map1;
uniform float u_velocity;
uniform float u_radius;
uniform float u_zoom;
uniform vec2 u_followMouse;

varying vec2 vUv;



#pragma glslify:circleSmoothstep=require("../circleSmoothstep.frag")


void main(){
	// vec4 color=vec4(0.1647, 0.3843, 0.4549, 1.0);
	// vec2 st = gl_FragCoord.xy/u_resolution.xy;
  vec2 uv = vUv;

	float c = circleSmoothstep(uv, u_followMouse, 0., u_velocity + u_radius);
	// u_velocityをかけて加速・減速
	c *= (u_zoom * u_velocity);

	vec2 warpedUV = mix(vUv, u_followMouse, c);
	vec4 color = texture2D(u_map1,warpedUV);

	// スクリーン
	gl_FragColor = color + color * vec4(vec3(c), 1.);
}
