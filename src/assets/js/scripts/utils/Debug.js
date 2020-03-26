import Stats from "stats-js";
import * as dat from "dat.gui";


export default class Debug{
  constructor(){
    this.gui = new dat.GUI();
    this.stats =  new Stats();
    document.body.appendChild(this.stats.dom);
  }


  update(){
    this.stats.update();
    // requestAnimationFrame(this.update.bind(this));
  }
}
