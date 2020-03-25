import { EventDispatcher, WebGLRenderer, PerspectiveCamera, Scene} from "three";


export default class RenderManager extends EventDispatcher {
	/**
	 * constructor
	 * @param  {Object} oprions
	 */
	constructor(params) {
    super();

    this.params = {
      width: 512,
      height: 512,
      isUpdate: false,
      ...params
    }

		this.canvas = canvas;

    // renderer
		this.renderer = new WebGLRenderer({
			canvas: this.canvas,
			// antialias: true,
			// alpha: true
		});
		this.renderer.setClearColor(0xFFFFFF, 0);
		this.renderer.setPixelRatio(window.devicePixelRatio);
		this.renderer.setSize(this.params.width, this.params.height);

    // camera
		let fov = 45;
		this.camera = new PerspectiveCamera(fov, this.params.width / this.params.height, 1, 1000);
		this.camera.position.z = this.params.height / (2 * Math.tan(fov * (Math.PI / 180) / 2));

    // scene
    this.scene = new Scene();

    // private props
    this._animationId = null;
    this._startTime = null;


    if(this.params.isUpdate){
      this.params.isUpdate = false;
      this.start();
    }
	}

  /*--------------------------------------------------------------------------
    @method
  --------------------------------------------------------------------------*/
	/**
	 * start
	 */
	start() {
    if(this.params.isUpdate){
      return;
    }
    this.params.isUpdate = true;
    this._startTime = performance.now() / 1000;
    this.dispatchEvent({type: "start"});
		this._update();
	}


	/**
	 * stop
	 */
	stop() {
    if(this.params.isUpdate){
      this.dispatchEvent({type: "stop"});
      cancelAnimationFrame(this._animationId);
    }
	}


	/**
	 * update
	 */
	_update() {
		// this.event.trigger('renderBefore', this);
		// this.event.trigger('renderAfter', this);
		// this.camera.lookAt(new THREE.Vector3(0, this.offsetY, 0));

    this.dispatchEvent({
      type: "update",
      time: (performance.now() - this._startTime) / 1000
    });
		this.render();

    if(this.params.isUpdate){
  		this._animationId = requestAnimationFrame(this._update.bind(this));
    }
	}


	/**
	 * render
	 */
	render() {
		this.renderer.render(this.scene, this.camera);
	}
}
