// precision highp float;
precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;
uniform sampler2D u_map1;
uniform float u_zoom;
uniform int u_vert;
uniform float u_radius;

varying vec2 vUv;

#pragma glslify:inCircle=require("../inCircle.frag")
#pragma glslify:inPolygon=require("../inPolygon.frag")


// SEE: https://thndl.com/square-shaped-shaders.html

void main(){
	vec4 color=vec4(.3804,.7647,.8784,1.);
	vec2 st=gl_FragCoord.xy/u_resolution.xy;

	vec2 mouse=u_mouse.xy/u_resolution.xy;
	mouse.y = 1.0 - mouse.y;

	if(inPolygon(st, mouse, u_vert, u_radius)){
		vec2 zoomCoord = st - (mouse);
		zoomCoord = zoomCoord / u_zoom + mouse;
		gl_FragColor = texture2D(u_map1, zoomCoord);
	// }
	// if(inCircle(st, mouse, u_radius)){
	// 	vec2 zoomCoord = st - (mouse);
	// 	zoomCoord = zoomCoord / u_zoom + mouse;
	// 	gl_FragColor = texture2D(u_map1, zoomCoord);

	} else {
		gl_FragColor = texture2D(u_map1, vUv);
	}


}
