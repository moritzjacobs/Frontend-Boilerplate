module.exports = function (grunt) {

	grunt.registerTask('default', ['sass:dev', 'concat', 'watch']);
	grunt.registerTask('dist', ['sass:dist', 'concat', 'uglify', 'autoprefixer']);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		config: grunt.file.readJSON('gruntconfig.json'),

		sass: {
			dev: {
				options: {
					style: 'expanded'
				},
				files: [{
					expand: true,
					cwd: 'scss',
					src: ['*.scss'],
					dest: 'css',
					ext: '.css'
				}]
			},
			dist: {
				options: {
					style: 'compressed',
                    banner: '<%= config.banner %>',
				},
				files: [{
					expand: true,
					cwd: 'scss',
					src: ['*.scss'],
					dest: 'scss',
					ext: '.css'
				}]
			}
		},
		autoprefixer: {
			dist: {
				files: {
					'public/css/styles.css': 'css/styles.css'
				}
			}
		},

		concat: {
			dist: {
				options: {
					separator: ';'
				},
				src: ['js/*.js'],
				dest: 'public/js/main.js'
			},
		},


		uglify: {
			options: {
				mangle: false,
				banner: '<%= config.banner %>'
			},
			js: {
				files: {
					'public/js/main.min.js': ['public/js/main.js']
				}
			}
		},


		watch: {
			js: {
				files: ['js/*.js'],
				tasks: ['concat'],
			},
			sass: {
				files: ['scss/**/*.scss'],
				tasks: ['sass:dev', 'autoprefixer'],
			}
		},



	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');

};