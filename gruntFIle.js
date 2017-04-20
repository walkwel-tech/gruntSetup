
module.exports = function(grunt) {
require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
		  /*options: {
		    // define a string to put between each file in the concatenated output
		    separator: ';'
		  },*/
		  dist: {
		    // the files to concatenate
		    src: ['tmp/annotate/**/*.js'],
		    // the location of the resulting JS file
		    dest: 'public/dist/<%= pkg.name %>.js'
		  }
		},
		uglify: {
		  options: {
		    // the banner is inserted at the top of the output
		    banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
		  },
		  dist: {
		    files: {
		      'public/dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
		    }
		  }
		},
		qunit: {
		  files: ['test/**/*.html']
		},
		jshint: {
		  // define the files to lint
		  files: ['Gruntfile.js', 'public/app/angularApp.js','public/app/**/*.js','public/modules/chat/chatModule.js','public/modules/chat/**/*.js', 'public/test/**/*.js'],
		  // configure JSHint (documented at http://www.jshint.com/docs/)
		  options: {
		    // more options here if you want to override JSHint defaults
		    globals: {
		      jQuery: true,
		      console: true,
		      module: true
		    },
		    ignores:['public/modules/chat/js/controller.js']
		  }
		},
		ngAnnotate: {
		    options: {
		        singleQuotes: true
		    },
		    app: {
		        files: [
		        	{
		        		expand:true,
		        		src:['public/app/angularApp.js','public/app/**/*.js','public/modules/chat/chatModule.js','public/modules/chat/**/*.js'],
		        		ext: '.annotated.js',
		        		extDot: 'last',
		        		//rename: function (dest, src) { return src + '-annotated'; },
		        		dest: 'tmp/annotate'
		        	}
		        ]
		    }
		},
		watch: {
		  files: ['public/app/angularApp.js','public/app/**/*.js','public/modules/chat/chatModule.js','public/modules/chat/**/*.js'],
		  tasks: ['min']
		},		
	    babel: {
	        options: {
	            sourceMap: true,
	            presets: ['es2015']
	        },
	        dist: {
	            files: {
					//"babel/chatModule.js"  : ["public/modules/chat/chatModule.js"],
		            'babel/controller.js'  : ['public/modules/chat/js/controller.js'],
					/*"babel/routes1.js"  : ["public/routes.js"],
		            'babel/chatEndCo.js': ['public/modules/chat/js/chatEndController.js'], 
		            'babel/factory.js'  : ['public/modules/chat/js/factory.js'],
		            "babel/searchP.js"  : ["public/modules/chat/factory/searchPartner.js"],
		            "babel/repotUC.js"  : ["public/modules/chat/js/reportUserController.js"],
		            "babel/directi.js"  : ["public/modules/chat/js/directives.js"],
		            "babel/routes.js"   : ["public/modules/chat/js/routes.js"],
					"babel/photoFa.js"  : ["public/modules/chat/js/photoFactory.js"],
					"babel/factory1.js" : ["public/assets/javascripts/factory.js"]*/
	            }
	        }
	    },
			wiredep:{
				task:{
					src:['public/index.html'],
					options:{

					}
				}
			}
	});
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-ng-annotate'); 
	grunt.loadNpmTasks('grunt-babel'); 
	grunt.loadNpmTasks('grunt-wiredep');

	// this would be run by typing "grunt test" on the command line
	grunt.registerTask('test', ['jshint']);

	// this would be run by typing "grunt annotate" on the command line
	grunt.registerTask('annotate', ['ngAnnotate', 'concat']);

	// the default task can be run just by typing "grunt" on the command line
	grunt.registerTask('min', ['jshint', 'ngAnnotate', 'concat']);//, 'uglify'

	// the default task can be run just by typing "grunt" on the command line
	grunt.registerTask('default', ['watch']);
};