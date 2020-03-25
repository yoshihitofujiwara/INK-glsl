import {Filter, Matrix, TextureMatrix}  from "pixi.js";

export default class DefaultFilter extends Filter{
  constructor(sprite) {

    super(
      require("./filter.vert").default,
      require("./filter.frag").default,
      {
      }
    );

    this.padding = 0;

    // for apply method
    this.sprite = sprite;
    this.maskMatrix = new Matrix();
  }


  /*--------------------------------------------------------------------------
    uv座標調整
    see: https://github.com/pixijs/pixi.js/blob/dev/packages/core/src/filters/spriteMask/SpriteMaskFilter.ts
  --------------------------------------------------------------------------*/
  apply(filterManager, input, output, clearMode){
    const sprite = this.sprite;
    const tex = sprite._texture;

    if (!tex.valid)
    {
        return;
    }
    if (!tex.uvMatrix)
    {
        // margin = 0.0, let it bleed a bit, shader code becomes easier
        // assuming that atlas textures were made with 1-pixel padding
        tex.uvMatrix = new TextureMatrix(tex, 0.0);
    }
    tex.uvMatrix.update();

    this.uniforms.npmAlpha = tex.baseTexture.alphaMode ? 0.0 : 1.0;
    this.uniforms.mask = tex;
    this.uniforms.otherMatrix = filterManager.calculateSpriteMatrix(this.maskMatrix, sprite)
        .prepend(tex.uvMatrix.mapCoord);
    this.uniforms.alpha = sprite.worldAlpha;
    this.uniforms.maskClamp = tex.uvMatrix.uClampFrame;

    filterManager.applyFilter(this, input, output, clearMode);
  }
}
