// precision highp float;
precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

uniform sampler2D u_map1;
uniform float u_amount;
uniform float u_speed;
uniform bool u_rgbSlice;

varying vec2 vUv;


#pragma glslify:random2d=require("../random2d.glsl")


float inRandomRange (in vec2 seed, in float min, in float max) {
	return min + random2d(seed) * (max - min);
}

// return 1 if v inside 1d range
float insideRange(float v, float bottom, float top) {
	return step(bottom, v) - step(top, v);
}


void main(){
	// vec4 color=vec4(0.1647, 0.3843, 0.4549, 1.0);
	// vec2 st = gl_FragCoord.xy/u_resolution.xy;
	vec2 uv = vUv;

	float time = floor(u_time * u_speed * 60.0);
	vec4 color = texture2D(u_map1, uv);

	//randomly offset slices horizontally
	float maxOffset = u_amount/2.0;
	float max = 10.0 * u_amount;
	vec2 guv = vec2(0.0);


	for (float i = 0.0; i < 10.0; i += 1.0) {
		float sliceY = random2d(vec2(time, 2345.0 + float(i)));
		float sliceH = random2d(vec2(time, 9035.0 + float(i))) * 0.25;

		float hOffset = inRandomRange(
			vec2(time, 9625.0 + float(i)), -maxOffset, maxOffset
		);

		vec2 uvOff = uv;
		uvOff.x += hOffset;

		if (insideRange(uv.y, sliceY, fract(sliceY+sliceH)) == 1.0 ){
			color = texture2D(u_map1, fract(uvOff));
			guv = uvOff;
			// color = texture2D(u_map1, uvOff);
		}
	}


	// rgb slice
	if(u_rgbSlice){
		float maxColOffset = u_amount/6.0;

		vec2 colOffset = vec2(
			inRandomRange(vec2(time, 9545.0), -maxColOffset, maxColOffset), inRandomRange(vec2(time, 7205.0), -maxColOffset, maxColOffset)
		);

		// colOffset = vec2(0.01);
		vec2 gUv = fract(uv + colOffset);

		float rnd = random2d(vec2(time , 9545.0));

		if (rnd < 0.33){
			color.r = texture2D(u_map1, gUv).r;
		}else if (rnd < 0.66){
			color.g = texture2D(u_map1, gUv).g;
		} else{
			color.b = texture2D(u_map1, gUv).b;
		}
	}

	gl_FragColor = color;
}
