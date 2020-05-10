// precision highp float;
precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

uniform sampler2D u_map1;
uniform float u_amount;
uniform vec3 u_color1;
uniform vec3 u_color2;

varying vec2 vUv;


#pragma glslify:grayscale=require("../grayscale.frag")


void main(){
	// vec4 color=vec4(0.1647, 0.3843, 0.4549, 1.0);
	// vec2 st = gl_FragCoord.xy/u_resolution.xy;
	vec2 uv = vUv;

	vec4 color = texture2D(u_map1, uv);
	vec4 gray = grayscale(color);
	vec4 duoTone = vec4(mix(u_color1,u_color2,gray.rgb), color.a);
	gl_FragColor = mix(color,duoTone,u_amount);
}
