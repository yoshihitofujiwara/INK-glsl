// vec3 LUMINANCE = vec3(0.298912, 0.586611, 0.114478);

vec4 grayscale(vec4 color){
	return vec4(
		vec3(dot(color.rgb, vec3(0.298912, 0.586611, 0.11447))),
		color.a
	);
}
#pragma glslify: export(grayscale)
