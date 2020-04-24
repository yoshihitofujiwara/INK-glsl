/// INKjs Javascript Library
/// The MIT License (MIT)
/// Source https://github.com/yoshihitofujiwara/INKjs
/// Author Yoshihito Fujiwara
/// Copyright (c) 2012 Yoshihito Fujiwara

import Events from "../class_events/Events";
import * as utils from "../utils";


/**
 * @class WebCamera
 * @constructor
 */
export default class WebRTC extends Events {
  /**
   * constructor
   */
  constructor(video, options) {
    super();

    /**
     * イベントリスト
     * @private
     * @property _EVENTS
     * @type {object}
     */
    this._EVENTS = {
      // FAIL        : 'fail',
      DONE : "done",
      ERROR: "error",
      LOAD : "load"
    };

    /**
     * 表示用video
     * @property video
     * @type {DOM}
     */
    this.video = video || document.createElement("video");

    /**
     * options
     * @type {object}
     */
    this.options = utils.mixin(true, {
      video: true,
      audio: false
    }, options);
  }


  /**
   * setup
   * @return {Promise}
   */
  setup(){
		return navigator.mediaDevices.getUserMedia(
			this.options
		)
    .then(
      (stream) => {
        this.trigger(this._EVENTS.DONE, stream);
				this.video.srcObject = stream;
				this.trigger(this._EVENTS.LOAD);
      }
    )
    .catch((err) => {
      this.trigger(this._EVENTS.ERROR, err);
      console.log(err.name + ": " + err.message);
    });
  }


  /**
   * play
   * @return {WebCamera}
   */
  play(){
    this.video.play();
    return this;
  }


  /**
   * pause
   * @return {WebCamera}
   */
  pause(){
    this.video.pause();
    return this;
  }
}
