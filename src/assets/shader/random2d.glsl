//2D (returns 0 - 1)
float random2d(vec2 v2) {
	return fract(sin(dot(v2, vec2(12.9898, 4.1414))) * 43758.5453);
}
#pragma glslify:export(random2d)
