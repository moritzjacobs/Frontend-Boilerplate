	module.exports = function(grunt) {

    grunt.registerTask('default', ['sass:dev', 'concat', 'watch']);
    grunt.registerTask('dist', ['sass:dist', 'concat', 'uglify']);

	grunt.initConfig({
        pkg:    grunt.file.readJSON('package.json'),
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
                    banner: '<%= config.banner %>'
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


        compass: {
            options: {
                sassDir: 'scss',
                cssDir: 'css',
                specify: ['scss/**/*.scss']
            },
            dist: {
				options: {
					force: true,
					banner: '<%= config.banner %>',
					environment: 'production',
					outputStyle: 'compressed'
				}
			},
			dev: {
				options: {
					environment: 'development',
					outputStyle: 'expanded'
				}
			}
		},

        concat: {
            dist: {
                options: {
                    separator: ';'
                },
                src: ['js/*.js'],
                dest: 'js/public/main.js'
            },
        },


        uglify: {
            options: {
                mangle: false,
                banner: '<%= config.banner %>'
            },
            js: {
                files: {
                    'js/public/main.min.js': ['js/public/main.js']
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
				tasks: ['sass:dev'],
			}
		},



	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');

};
