module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // tasks
        // minify css (this plugin can also concatenate files)
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: ['*.css', '!*.min.css'],
                    dest: 'public_html/css/',
                    ext: '.min.css'
                }]
            }
        },
        // minify js
        uglify: {
            my_target: {
                files: {
                    'public_html/js/main.min.js': ['src/main.js'],
                    'public_html/js/init.min.js': ['src/init.js']
                }
            }
        },
        // minify html
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'public_html/index.html': 'src/index.html'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.registerTask('default', ['cssmin', 'uglify', 'htmlmin']);
};