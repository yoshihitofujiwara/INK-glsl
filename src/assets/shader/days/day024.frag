// precision highp float;
precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

uniform sampler2D u_map1;

varying vec2 vUv;

vec2 square(vec2 p){
	return vec2(abs(p.x)+abs(p.y),.5);
}

vec2 circle(vec2 p){
	return vec2(length(p),.5);
}

vec2 heart(vec2 st){
	st=(st)*vec2(2.1, 2.8);
	return vec2(
		pow(st.x, 2.)+pow(st.y-sqrt(abs(st.x)),2.),
		1.
	);
}

// 距離関数の補間 ( x = 距離, y = 閾値 )
vec2 morphing(vec2 p){
	float t=u_time*2.5;

	// 距離関数のペア// loop[0, 1, 2]
	int pair=int(floor(mod(t,3.)));

	// 補間値
	float a=smoothstep(.2,.8,mod(t,1.));

	if(pair==0)return mix(heart(p),circle(p),a);
	if(pair==1)return mix(circle(p),square(p),a);
	else return mix(square(p),heart(p),a);
}

void main(){
	// vec4 color=vec4(0.1647, 0.3843, 0.4549, 1.0);
	// vec2 st = gl_FragCoord.xy/u_resolution.xy;
	vec2 p=(gl_FragCoord.xy*2.-u_resolution)/min(u_resolution.x,u_resolution.y);

	vec2 d=morphing(p);
	vec3 color=mix(vec3(1.),vec3(0.),step(d.x,d.y));

	gl_FragColor=vec4(color,1.);
}
