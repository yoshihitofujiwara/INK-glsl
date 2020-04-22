vec2 mosaic(vec2 position, float grid){
	float split=1./grid;

	if(grid!=0.&&split>0.){
		// グリッド分割し小数点を切り捨ててモザイク化。モザイクの中心点を足す
		return floor(position/split)*split+(split*.5);
	}else{
		return position;
	}
}

#pragma glslify:export(mosaic)
