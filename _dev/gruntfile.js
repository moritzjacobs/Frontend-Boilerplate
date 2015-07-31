module.exports = function (grunt) {

	grunt.registerTask('default', ['dev', 'watch']);

	grunt.registerTask('dev', ['sass:dev', 'postcss:dev', 'concat:dev']);
	grunt.registerTask('dist', ['sass:dist', 'postcss:dist', 'concat:dist', 'uglify:js', 'clean:dist']);

	grunt.registerTask('server', ['php']);


	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		config: grunt.file.readJSON('gruntconfig.json'),

		// SASS is working
		sass: {
			dev: {
				options: {
					style: 'expanded'
					//banner: '<%= config.banner %>'
				},
				files: [{
					expand: true,
					cwd: '<%= config.path_src_scss %>',
					src: ['*.scss'],
					dest: '<%= config.path_dist_css %>',
					ext: '.css'
				}]
			},

			dist: {
				options: {
					style: 'compressed'
					//banner: '<%= config.banner %>'
				},
				files: [{
					expand: true,
					cwd: '<%= config.path_src_scss %>',
					src: ['*.scss'],
					dest: '<%= config.path_dist_css %>',
					ext: '.css'
				}]
			}
		},
		

		postcss: {
			options: {
				map: true,
				processors: [
				require('autoprefixer-core')({
					browsers: 'last 3 version'
				})]
			},
			dev: {
				src: '<%= config.path_dev_css %>*.css'
			},
			dist: {
				options: {
					map: false,
					processors: [
					require('autoprefixer-core')({
						browsers: 'last 3 version'
					}), require('csswring')]
				},
				src: '<%= config.path_dist_css %>*.css'
			}
		},


		watch: {
			options: {
				livereload: true
			},
			php: {
				files: ['<%= config.path_src %>/**/*.php']
			},
			html: {
				files: ['<%= config.path_src %>/**/*.html']
			},
			js: {
				files: ['<%= config.path_src_js %>/**/*.js'],
				tasks: ['concat:dev']
			},
			sass: {
				options: {
					livereload: false
				},
				files: ['<%= config.path_src_scss %>/**/*.scss'],
				tasks: ['sass:dev', 'postcss:dev']
			},
			css: {
				files: ['<%= config.path_dev_css %>/*.css']
			}
		},





		// JS stuff
		concat: {
			dev: {
				options: {
					separator: ';',
					stripBanners: true,
					banner: '<%= config.banner %>',
				},
				src: ['<%= config.path_src_js %>*.js'],
				dest: '<%= config.path_dev_js %>scripts.js',
				nonull: true,
			},
			dist: {
				options: {
					separator: ';',
					stripBanners: true,
					banner: '<%= config.banner %>',
				},
				src: ['<%= config.path_src_js %>*.js'],
				dest: '<%= config.path_dist_js %>scripts.js',
				nonull: true,
			},
		},

		uglify: {
			options: {
				mangle: false,
				banner: '<%= config.banner %>'
			},
			js: {
				files: {
					'<%= config.path_dist_js %>scripts.js': ['<%= config.path_dist_js %>scripts.js']
				}
			}
		},

		jshint: {
			beforeconcat: ['<%= config.path_src_js %>*.js'],
			afterconcat: ['<%= config.path_dev_js %>scripts.js']
		},


		clean: {
			options: {
				force: true
			},
			dist: ['<%= config.path_dist_css %>*.map']
		},



		php: {
			dist: {
				options: {
					keepalive: true,
					open: true,
					port: '<%= config.conf_port %>',
					base: '<%= config.conf_base %>'
				}
			}
		},


		htmllint: {
			options: {

			},
			src: '<%= config.path_public %>/**/*.html'
		}

	});



	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-postcss');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-htmllint');
	grunt.loadNpmTasks('grunt-shell');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-php');

};