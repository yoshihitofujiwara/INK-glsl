// precision highp float;
precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

uniform sampler2D u_map1;
uniform float u_split;
uniform float u_offset;

varying vec2 vUv;


#define PI 3.14159265359


void main(){
	// vec4 color=vec4(0.1647, 0.3843, 0.4549, 1.0);
	// vec2 st = gl_FragCoord.xy/u_resolution.xy;

	vec2 uv = vUv;


	// DEMO4: Circle Gradient2
	// vec2 st = vec2(.5) - uv;
	// float a = atan(st.y, st.x);
	// float c = abs(sin (a * 5.));
	// gl_FragColor= vec4(c, c, c, 1.0);


	// DEMO3: Circle Gradient
	vec2 st = vec2(.5) - uv;
	float a = atan(st.y, st.x);
	float c = (a + PI) / (PI * 2.);
	gl_FragColor= vec4(c, c, c, 1.0);


	// DEMO2: ring
	// float d = distance(vUv, vec2(0.5));
	// d *= 30.;
	// d = abs(sin(d-u_time * 2.0));
	// d = step(0.7, d);
	// float c = d;
	// gl_FragColor= vec4(c, c, c, 1.0);


	// DEMO1: circle
	// float d = distance(vUv, vec2(0.5));
	// float a = abs(sin(u_time)) * 0.5;
	// float c = step(d, a);
	// gl_FragColor= vec4(c, c, c, 1.0);
}
