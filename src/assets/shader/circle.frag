vec4 circle(vec2 position, vec2 offset, float radius, vec4 color){
	float len=length(offset-position);
	return vec4(color.rgb, color.a * (1.-step(radius,len)));
}
#pragma glslify:export(circle)
