bool inCircle(vec2 position,vec2 offset,float radius){
	float len=length(position-offset);
	if(len<radius){
		return true;
	}
	return false;
}
#pragma glslify:export(inCircle)
