const LICENSE = [
	"Everything is Plus! Plus KKuTu",
	"Copyright (C) 2024 Morem.ME (support@morem.me) - Distributed under AGPL 3.0 License",
	"If you're interested in, please visit our repo for more information.",
].join('\n');

var File = require('fs');

const LIST = [
	"global",
	
	"in_login",
	"in_game_kkutu",
	"in_game_kkutu_help",
	"in_admin",
	"in_portal",
	"in_loginfail",
];
const OLD_LIST = [
	"old_global",
	"old_in_game_kkutu",
]
const KKUTU_LIST = [
	"Web/lib/kkutu/head.js",
	"Web/lib/kkutu/ready.js",
	"Web/lib/kkutu/rule_classic.js",
	"Web/lib/kkutu/rule_jaqwi.js",
	"Web/lib/kkutu/rule_mathquiz.js",
	"Web/lib/kkutu/rule_crossword.js",
	"Web/lib/kkutu/rule_typing.js",
	"Web/lib/kkutu/rule_hunmin.js",
	"Web/lib/kkutu/rule_moum.js",
	"Web/lib/kkutu/rule_daneo.js",
	"Web/lib/kkutu/rule_drawing.js",
	"Web/lib/kkutu/rule_sock.js",
	"Web/lib/kkutu/body.js",
	"Web/lib/kkutu/tail.js"
];

const KKUTU_LEGACY_LIST = [
	"Web/lib/kkutu/legacy/head.js",
	"Web/lib/kkutu/legacy/ready.js",
	"Web/lib/kkutu/legacy/body.js",
	"Web/lib/kkutu/legacy/tail.js",
	"Web/lib/kkutu/legacy/rule_classic.js",
	"Web/lib/kkutu/legacy/rule_jaqwi.js",
	"Web/lib/kkutu/legacy/rule_crossword.js",
	"Web/lib/kkutu/legacy/rule_typing.js",
	"Web/lib/kkutu/legacy/rule_hunmin.js",
	"Web/lib/kkutu/legacy/rule_daneo.js",
	"Web/lib/kkutu/legacy/rule_sock.js"
];

module.exports = function(grunt){
	var i, files = {}, cons = {};
	var KKUTU = "Web/public/js/in_game_kkutu.min.js";
	var KKUTU_LEGACY = "Web/public/js/old_in_game_kkutu.min.js";

	for(i in LIST){
		files["Web/public/js/"+LIST[i]+".min.js"] = "Web/lib/"+LIST[i]+".js";
	}
	files[KKUTU] = KKUTU_LIST;
	
	//create legacy files too
	for(i in OLD_LIST){
		files["Web/public/js/"+OLD_LIST[i]+".min.js"] = "Web/lib/"+OLD_LIST[i]+".js";
	}
	files[KKUTU_LEGACY] = KKUTU_LEGACY_LIST;

	grunt.initConfig({
		uglify: {
			options: {
				banner: "/**\n" + LICENSE + "\n*/\n\n"
			},
			build: {
				files: files
			}
		},
		concat: {
			basic: {
				src: KKUTU_LIST,
				dest: "Web/lib/in_game_kkutu.js"
			},
			extras: {
				src: KKUTU_LEGACY_LIST,
				dest: "Web/lib/old_in_game_kkutu.js"
			}
		}
	});
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	
	grunt.registerTask('default', ['concat', 'uglify']);
	grunt.registerTask('pack', 'Log', function(){
		var done = this.async();
		var url = __dirname + "/" + KKUTU;
		
		File.readFile(url, function(err, res){
			File.writeFile(url, "(function(){" + res.toString() + "})();", function(err, res){
				done();
			});
		})
	});

	//do same for legacy
	grunt.registerTask('pack_legacy', 'Log', function(){
		var done = this.async();
		var url = __dirname + "/" + KKUTU_LEGACY;
		
		File.readFile(url, function(err, res){
			File.writeFile(url, "(function(){" + res.toString() + "})();", function(err, res){
				done();
			});
		})
	});
};
