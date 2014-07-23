	module.exports = function(grunt) {
 
    grunt.registerTask('default', ['compass:dev', 'concat', 'watch']);
    grunt.registerTask('dist', ['compass:dist', 'concat', 'uglify']);
 
	grunt.initConfig({
        pkg:    grunt.file.readJSON('package.json'),
        config: grunt.file.readJSON('gruntconfig.json'),

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
				tasks: ['compass:dev'],
			}
		},



	});
 
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-watch');
 
};
