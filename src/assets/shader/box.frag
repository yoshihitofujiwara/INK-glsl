vec4 box(vec2 position, float size, vec4 color){
	size=.5+size*.5;
	vec2 size2=vec2(size);
	vec2 pos=step(position,size2)*step(1.-position,size2);
	return vec4(color.rgb, step(size, pos.x*pos.y));
	// return pos.x*pos.y;
}
#pragma glslify:export(box)
