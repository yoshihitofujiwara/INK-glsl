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


// #pragma glslify:circle=require("../circle.frag")

vec2 square(vec2 p){
	return vec2(abs(p.x)+abs(p.y), 0.5);
}

vec2 circle(vec2 p){
	return vec2(length(p), .5);
}


void main(){
	// vec4 color=vec4(0.1647, 0.3843, 0.4549, 1.0);
	// vec2 st = gl_FragCoord.xy/u_resolution.xy;
	vec2 p=(gl_FragCoord.xy*2.-u_resolution)/min(u_resolution.x,u_resolution.y);

	float a=sin(u_time*5.)*.5+.5;
	vec2 d=mix(circle(p), square(p),a);

	vec3 color=mix(vec3(1.),vec3(0.), step(d.x, d.y));

	gl_FragColor = vec4(color,1.);
}
