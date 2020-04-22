float circleSmoothstep(vec2 position,vec2 offset,float radius,float smooth){
	// 内積の平方根は対角線の長さ
	// position -= offset;
	// float dist = sqrt(dot(position, position));

	float dist=length(position-offset);
	return smoothstep(radius+smooth,radius-smooth,dist);
}

#pragma glslify:export(circleSmoothstep)
