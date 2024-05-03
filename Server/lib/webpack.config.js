const File = require("fs");
const { resolve } = require("path");
const { BannerPlugin } = require("webpack");
const TerserPlugin = require('terser-webpack-plugin');

const LICENSE = [
	"Copyright (C) 2023~2024 Morem.ME",
].join('\n');

class ConcatPlugin{
	constructor({ files, destination }){
		this.files = files;
		this.destination = destination;
	}
	apply(compiler){
		const result = ["/**", LICENSE, "*/", "(function(){"];
		
		compiler.hooks.beforeCompile.tap("ConcatPlugin", () => {
			this.files
				.filter(file => File.existsSync(file))
				.forEach(file => result.push(File.readFileSync(file, "utf8")));
			result.push("})();");
			File.writeFileSync(this.destination, result.join("\n"), { encoding: "UTF-8" });
		});
	}
}

const sourcePath = resolve(__dirname, "Web/webpack");
const gameSourcePath = resolve(sourcePath, "kkutu");
const distributionPath = resolve(__dirname, "Web/public/js");
const files = File.readdirSync(sourcePath, { withFileTypes: true })
	.filter(u => u.isFile())
	.map(u => u.name);

module.exports = {
	mode: "production",
	target: "web",
	/*
		inline-source-map은 개발 시 개발자 도구 이용을 쉽게 해 줍니다.
		production mode에서는 주석 처리하는 것을 권장합니다. (파일 용량이 커짐)
	*/
	// devtool: "inline-source-map",
	entry: files.reduce((etr, file) => {
		etr[file.substring(0, file.length - 3)] = resolve(sourcePath, file);
		return etr;
	}, {}),
	output: {
		path: distributionPath,
		filename: "[name].min.js"
	},
	plugins: [
		new ConcatPlugin({
			files: [
				resolve(gameSourcePath, "head.js"),
				resolve(gameSourcePath, "ready.js"),
				resolve(gameSourcePath, "rule_classic.js"),
				resolve(gameSourcePath, "rule_jaqwi.js"),
				resolve(gameSourcePath, "rule_mathtype.js"),
				resolve(gameSourcePath, "rule_moum.js"),
				resolve(gameSourcePath, "rule_originkkt.js"),
				resolve(gameSourcePath, "rule_all.js"),
				resolve(gameSourcePath, "rule_drawing.js"),
				resolve(gameSourcePath, "rule_mathquiz.js"),
				resolve(gameSourcePath, "rule_crossword.js"),
				resolve(gameSourcePath, "rule_typing.js"),
				resolve(gameSourcePath, "rule_hunmin.js"),
				resolve(gameSourcePath, "rule_daneo.js"),
				resolve(gameSourcePath, "rule_sock.js"),
				resolve(gameSourcePath, "body.js"),
				resolve(gameSourcePath, "tail.js"),
			],
			destination: resolve(sourcePath, "in_game_kkutu.js")
		}),
		new BannerPlugin(LICENSE),
	],
	optimization: {
		minimizer: [new TerserPlugin({
			extractComments: false,
		})],
	},
};