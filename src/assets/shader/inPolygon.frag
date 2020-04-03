float PI2 = 6.283185307179586;
float antialias = .005;

bool inPolygon(vec2 position, vec2 offset, int vert, float radius){
	vec2 p = offset-position;
	float a=atan(p.x, p.y);
	float b=PI2/float(vert);

	float amount = smoothstep(
		radius,
		radius + antialias,
		cos(floor(.5 + a/b) * b - a) * length(p.xy)
	);

	if(amount == 0.0){
		return true;
	}
	return false;
}
#pragma glslify:export(inPolygon)
