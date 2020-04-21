// precision highp float;
precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

uniform sampler2D u_map1;
uniform float u_velocity;
uniform float u_radius;
uniform vec2 u_followMouse;

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

	float c = circle(uv, u_followMouse, 0., u_velocity + u_radius);
	c = c * 40. * u_velocity;

	vec2 offsetVector = normalize(u_followMouse-vUv);

	vec2 warpedUV = mix(vUv, u_followMouse, c * .99); //power

	gl_FragColor = texture2D(u_map1, warpedUV) + texture2D(u_map1, warpedUV) * vec4(vec3(c), 1.);
}
