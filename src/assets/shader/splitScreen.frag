vec2 splitScreen(vec2 position, vec2 offset, float split){
	vec2 p = position;
	p += vec2(offset);
	p *= split;
	p -= vec2(offset);
	p = fract(p);
	return p;
}
#pragma glslify:export(splitScreen)
