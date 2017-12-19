module.exports = function (grunt) {

    grunt.initConfig({
        uglify: {
            master: {
                files: {
                    'dist/nerde.min.js': 'src/nerde.js'
                }
            }
        },
        cssmin: {
            options: {
                mergeIntoShorthands: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    'dist/nerde.min.css': 'src/nerde.css'
                }
            }
        },
        watch: {
            js: {
                files: ['src/nerde.js'],
                tasks: ['uglify']
            },
            css: {
                files: ['src/nerde.css'],
                tasks: ['cssmin']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['uglify','cssmin']);
};