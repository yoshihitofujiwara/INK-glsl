/**
 * clean v1.0.0
 * 2019-06-17
 */
import config from "../config.js";
import _ from "lodash";
import del from "del";


let cleanConfig = _.merge({
	files: [`${config.dest}assets/js/**/*.map`]
}, config.clean);


export function clean() {
	return del(cleanConfig.files);
}
