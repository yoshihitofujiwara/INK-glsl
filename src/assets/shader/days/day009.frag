// precision highp float;
precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

uniform sampler2D u_map1;
uniform sampler2D u_map2;
uniform sampler2D u_effectMap;
uniform float u_threshold;
uniform float u_progress;

varying vec2 vUv;


const float adjustF = .00001;

void main(){
	// vec4 color=vec4(0.1647, 0.3843, 0.4549, 1.0);
	vec2 st = gl_FragCoord.xy/u_resolution.xy;

	vec4 color1=texture2D(u_map1,vUv);
	vec4 color2=texture2D(u_map2,vUv);
	vec4 transionColor=texture2D(u_effectMap,vUv);

	float p=mix(-u_threshold-adjustF,1.+u_threshold,u_progress);
	float q=smoothstep(p-u_threshold,p+u_threshold,transionColor.r);

	gl_FragColor=mix(color1,color2,1.-q);

	// if(u_progress==0.){
	// 	gl_FragColor=texture2D(u_map1,vUv);

	// }else if(u_progress==1.){
	// 	gl_FragColor=texture2D(u_map2,vUv);

	// }else{
	// 	typeA
	// 	vec4 color1=texture2D(u_map1,vUv);
	// 	vec4 color2=texture2D(u_map2,vUv);
	// 	vec4 transionColor=texture2D(u_effectMap,vUv);

	// 	float p=mix(-u_threshold,1.+u_threshold,u_progress);

	// 	float q=smoothstep(p-u_threshold,p+u_threshold,transionColor.r);

	// 	gl_FragColor=mix(color1,color2,1.-q);

	// 	// typeB
	// 	vec4 color1=texture2D(u_map1,vUv);
	// 	vec4 color2=texture2D(u_map2,vUv);
	// 	vec4 transionColor=texture2D(u_effectMap,vUv);

	// 	float r=u_progress*(1.+u_threshold*2.)-u_threshold;
	// 	float mixf=clamp((r-transionColor.r)*(1./u_threshold),0.,1.);

	// 	gl_FragColor=mix(color1,color2,mixf);
	// }
}
