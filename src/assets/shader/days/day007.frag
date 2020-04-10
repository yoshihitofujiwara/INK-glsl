// precision highp float;
precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

uniform sampler2D u_map1;
uniform sampler2D u_map2;
uniform float u_progress;

varying vec2 vUv;


void main(){
	// vec4 color=vec4(0.1647, 0.3843, 0.4549, 1.0);
	// vec2 st=gl_FragCoord.xy/u_resolution.xy;
	vec4 color1 = texture2D(u_map1, vUv);
	vec4 color2 = texture2D(u_map2, vUv);

	gl_FragColor = mix(color1, color2, u_progress);
}
