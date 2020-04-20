// precision highp float;
precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

uniform sampler2D u_map1;
uniform float u_grid;

varying vec2 vUv;



float circle(vec2 uv, vec2 offset, float radius, float border) {
	uv -= offset;
	// uv *= u_resolution;
	float dist = sqrt(dot(uv, uv));
	return smoothstep(radius + border, radius - border, dist);
}

void main(){
	// vec4 color=vec4(0.1647, 0.3843, 0.4549, 1.0);
	// vec2 st = gl_FragCoord.xy/u_resolution.xy;

  vec2 uv = vUv;
  float moz = 1. / u_grid;

  if(u_grid != 0. && moz > 0.){
		// グリッド分割し小数点を切り捨ててモザイク化。モザイクの中心点を足す
    uv = floor(uv / moz) * moz + (moz * .5);
  }

  gl_FragColor = texture2D(u_map1, uv);

}