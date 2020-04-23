precision mediump float;

#pragma glslify: import('../common/define.glsl')

//==========================================================================
// @params
//==========================================================================
varying vec2 vUv;

uniform sampler2D texture;
uniform float uTime;
uniform vec2 resolution;

// effect
uniform float uSlices;
uniform float uOffset;
uniform float uAngle;


//==========================================================================
// @import
//==========================================================================

#pragma glslify: import('../utils/rotate2d.glsl')

vec2 rotate(vec2 v, float a) {
    float s = sin(a);
    float c = cos(a);
    mat2 m = mat2(c, -s, s, c);
    return m * v;
}


float pxToNorm(float px, float res){
	return px / res;
}



//==========================================================================
// @main
//==========================================================================
void main() {
  vec2 uv = vUv;

vec2 px = 1.0 / resolution;
	float angle = radians(uAngle);
	// float len = sqrt(resolution.x * resolution.x + resolution.y + resolution.y);

  uv = rotate(uv - 0.5, angle);
  float y = uv.y;

  float dir = step(0.5, fract(y * (uSlices - 1.0) * 0.5)) * 2.0 - 1.0;
	vec2 rotate = vec2(cos(angle), sin(angle));

	float amount = pxToNorm(uOffset, resolution.x);

	uv = vec2(
		vUv.x + (rotate.x * amount * dir),
		vUv.y + (rotate.y * amount * dir)
	);

	vec4 color = texture2D(texture, uv);

	if(uv.x < .0 ||  uv.x > 1.0 || uv.y < .0 || uv.y > 1.0) {
		gl_FragColor = vec4(color.rgb, 0.);

	}  else {
		gl_FragColor = color;

	}

}
