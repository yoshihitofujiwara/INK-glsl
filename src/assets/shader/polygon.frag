float PI2 = 6.283185307179586;
float antialias = .005;

vec4 polygon(vec2 position, vec2 offset, int vert, float radius, vec4 color){
	vec2 p = offset-position;
	float a=atan(p.x, p.y);
	float b=PI2/float(vert);

	float amount = smoothstep(
		radius,
		radius + antialias,
		cos(floor(.5 + a/b) * b - a) * length(p.xy)
	);

	return color * vec4(1.0 - amount);
}
#pragma glslify:export(polygon)
