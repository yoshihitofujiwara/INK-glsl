// precision highp float;
precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

uniform sampler2D u_map1;
uniform float u_fineness;
uniform float u_speed;
uniform float u_volume;

varying vec2 vUv;

void main(){
	// vec4 color=vec4(0.1647, 0.3843, 0.4549, 1.0);
	// vec2 st = gl_FragCoord.xy/u_resolution.xy;


	float speed = u_time * u_speed;
	float radius = 1./u_fineness*u_volume;

	vec2 uvOffset=vec2(
		cos(vUv.x * u_fineness + speed),
		sin(vUv.y * u_fineness + speed)
	);
	uvOffset *= radius;

	gl_FragColor = texture2D(u_map1, vUv + uvOffset);
}
