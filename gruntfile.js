module.exports = function(grunt) {
 
    grunt.registerTask('default', ['compass:dev', 'concat', 'watch']);
    grunt.registerTask('dist', ['compass:dist', 'concat', 'uglify']);
 
	grunt.initConfig({
        pkg:    grunt.file.readJSON('package.json'),
        config: grunt.file.readJSON('gruntconfig.json'),

        compass: {
			dist: {
				options: {
					sassDir: 'scss',
					cssDir: 'css',
					environment: 'production',
					outputStyle: 'compressed',
				}
			},
			dev: {
				options: {
					sassDir: 'scss',
					cssDir: 'css'
				}
			}
		},

        concat: {
            dist: {
                options: {
                    separator: ';'
                },
                src: ['<%= config.path_js %>*.js'],
                dest: '<%= config.path_js %>public/main.js'
            },
        },


        uglify: {
            options: {
                mangle: false,
                banner: '<%= config.banner %>'
            },
            js: {
                files: {
                    '<%= config.path_js %>public/main.min.js': ['<%= config.path_js %>public/main.js']
                }
            }
        },


		watch: {
			php: {
				files: ['<%= config.path_theme %>/**/*.php'],
				options: {
					livereload: true
				}
			},
    		js: {
    			files: ['<%= config.path_js %>/**/*.js'],
    			options: {
    				livereload: true
    			}
    		},
			sass: {
				files: ['<%= config.path_scss %>/**/*.scss'],
				tasks: ['compass:dev'],
				options: {
					livereload: true
				}
			}
		},



	});
 
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-watch');
 
};
