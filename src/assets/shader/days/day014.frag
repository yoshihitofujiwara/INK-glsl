// precision highp float;
precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

uniform sampler2D u_map1;
uniform float u_velocity;
uniform float u_radius;
uniform float u_zoom;
uniform float u_colorShift;
uniform vec2 u_followMouse;

varying vec2 vUv;


#pragma glslify:circleSmoothstep=require("../circleSmoothstep.frag")


void main(){
	// vec4 color=vec4(0.1647, 0.3843, 0.4549, 1.0);
	// vec2 st = gl_FragCoord.xy/u_resolution.xy;
  vec2 uv = vUv;

	// cは距離に応じてかかるエフェクトの強さを決めている（近ければエフェクト量が増える）
	float c = circleSmoothstep(uv, u_followMouse, 0., u_velocity + u_radius);
	// u_velocityをかけて加速・減速
	c *= (u_zoom * u_velocity);

	vec2 warpedUV = mix(vUv, u_followMouse, c);

	float r = texture2D(u_map1,warpedUV + c * (u_velocity * u_colorShift)).r;
	float g = texture2D(u_map1,warpedUV + c * (u_velocity)).g;
	float b = texture2D(u_map1,warpedUV - c * (u_velocity * u_colorShift)).b;
	vec4 color = vec4(r, g, b, 1.);

	// スクリーン
	gl_FragColor = color + color * vec4(vec3(c), 1.);
}
