// precision highp float;
precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

uniform sampler2D u_map1;

varying vec2 vUv;


void main(){
	// vec4 color=vec4(0.1647, 0.3843, 0.4549, 1.0);
	// vec2 st = gl_FragCoord.xy/u_resolution.xy;
	vec2 p=(gl_FragCoord.xy*2.-u_resolution)/min(u_resolution.x,u_resolution.y);


	vec2 axis=1.-smoothstep(.01,.02,abs(p));
	vec2 color=mix(p,vec2(1.),axis.x+axis.y);
	gl_FragColor=vec4(color,1.,1.);
}
