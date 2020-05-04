// precision highp float;
precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

uniform sampler2D u_map1;



varying vec2 vUv;


#define PI 3.14159265359

#pragma glslify:box=require("../box.frag")


// float box(vec2 st, float size)
// {
// 	size =.5 + size * .5;
// 	vec2 size2 = vec2(size);
// 	st = step(st, size2) * step(1.-st, size2);
// 	return st.x * st.y;
// }


float dotWave(vec2 position, float grid){
	position=(floor(position*grid) + vec2(.5))/grid;
	float d=distance(vec2(.5), position);
	return (1.+sin(d*3.-u_time*3.))*.5;
}

float boxWave(vec2 uv,float n){
	vec2 st=fract(uv*n);
	float size=dotWave(uv,n);
	vec4 color = box(st, size, vec4(1.0));
	return color.a;
}


// next
float rand(vec2 st)
{
	return fract(sin(dot(st, vec2(12.9898,78.233)))*43758.5453);
}



void main(){
	vec4 color=vec4(.3804,.7647,.8784,1.);
	// vec2 st = gl_FragCoord.xy/u_resolution.xy;

	vec2 uv = vUv;

	// float n = 10.;
	// vec2 st = fract(uv * n);
	// float size = dotWave(uv, n); // 0 - 1
	// gl_FragColor= box(st, size, color);


	gl_FragColor= vec4(
		boxWave(uv, 9.),
		boxWave(uv, 18.),
		boxWave(uv, 36.),
		1.
	);
}
