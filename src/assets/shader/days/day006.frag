// precision highp float;
precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;
uniform sampler2D u_map1;
uniform float u_thickness;
uniform float u_radius;

varying vec2 vUv;

#pragma glslify:inCircle=require("../inCircle.frag")


// https://gist.github.com/detunized/1317940
// SEE: https://www.taylorpetrick.com/blog/post/dispersion-opengl

void main(){
	vec4 color=vec4(.3804,.7647,.8784,1.);
	vec2 st=gl_FragCoord.xy/u_resolution.xy;

	vec2 mouse=u_mouse.xy/u_resolution;
	mouse.y = 1.0 - mouse.y;


	float R = u_radius;
	float h = u_radius * u_thickness;
	float hr = R * sqrt(1.0 - ((R - h) / R) * ((R - h) / R));
	vec2 xy = st.xy - mouse.xy;
	float r = sqrt(xy.x * xy.x + xy.y * xy.y);
	vec2 new_xy = r < hr ? xy * (R - h) / sqrt(R * R - r * r) : xy;

	gl_FragColor = texture2D(u_map1, (new_xy + mouse.xy));
}
