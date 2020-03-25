/**
 * config.js v1.0.0
 * 2019-07-01
 */
import _ from "lodash";

let config = {
	isDev: process.argv[2] == void 0,
	isStg: process.argv[2] == "stg",
	isPrd: process.argv[2] == "prd",
	mode: process.argv[2] || "dev",
	args: process.argv.slice(2),
	src: "./src/",
	dest: "./htdocs/",
}

// webpack: webpackでのjsコンパイル
import path from "path";
import ConcatPlugin from "webpack-concat-plugin";
import UglifyJSPlugin from "uglifyjs-webpack-plugin";
import { ProvidePlugin } from "webpack";

config.webpack = {
	src: [
		`${config.src}assets/js/**/*.js`,
		`${config.src}assets/shader/**/*.frag`,
		`${config.src}assets/shader/**/*.vert`,
		`${config.src}assets/shader/**/*.glsl`
	],
	dest: `${config.dest}assets/js/`,
	config: {
		mode: config.isDev ? "development" : "production",
		entry: {
			"scripts.js": `${config.src}assets/js/scripts/index.js`
		},
		output: {
			filename: "[name]"
		},
		module: {
			rules: [
				{
					test: /\.(js)$/,
					// exclude: /node_modules/,
					use: [{
						loader: "babel-loader",
						options: {
							presets: [
								["@babel/preset-env", {
									targets: "last 2 versions, ie >= 11, Android >= 4.4"
								}]
							]
						}
					}]
				},
        {
          test: /\.(glsl|vert|frag)$/,
          exclude: /node_modules/,
          use: [
            "raw-loader",
            "glslify-loader",
          ]
        }
			]
		},
		devtool: "source-map",

    resolve: {
  		extensions: [".js", ".glsl", ".vert", ".frag"],
      alias: {
        $ink: path.resolve("./", "src/assets/js/libs/inkjs"),
        $scripts: path.resolve("./", "src/assets/js/scripts/scripts"),
        $utils: path.resolve("./", "src/assets/js/scripts/utils"),
        $shader: path.resolve("./", "src/assets/shader"),
      }
    },

		plugins: [
			new ProvidePlugin({
				Promise: "es6-promise",
			}),
		],
		optimization: {
			minimizer: [
				new UglifyJSPlugin({
					uglifyOptions: {
						output: {
							comments: /^\**!|@preserve|@license|@cc_on/
						},
						compress: {
							drop_console: true
						}
					}
				})
			]
		}
	}
}


// sass: sassコンパイル
config.sass = {
	src: `${config.src}assets/sass/**/*.scss`,
	dest: `${config.dest}assets/css/`,
	sass: {
		outputStyle: config.isDev ? "expanded" : "compressed"
	},
	autoprefixer: {
		browsers: ["last 2 versions", "Android >= 4.4"],
		add: true
	}
}


// clean: ファイル削除
config.clean = {
	files: [
		`${config.dest}assets/js/**/*.map`
	]
}


// server: ローカルサーバー
config.server = {
	browserSync: {
		isUse: true, // browserSync 有無
		liveReload: true,
		watchFiles: [
			`${config.dest}**/*.html`,
			`${config.dest}**/*.php`,
			`${config.dest}assets/css/**/*.css`
		],
		// pro
		// apiServer: {
		// 	context: "/api",
		// 	options: {
		// 		target: "http://www.example.org"
		// 	}
		// }
	},
	connectPhp: {
		isUse: true, // connectPhp 有無
	}
}

export default config;
