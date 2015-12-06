'use strict'
module.exports = function(grunt) {
    var pkg = require("./package.json");
    grunt.initConfig({
        less: {
            options: {
                compress: false,
                // sourceMap: true,
                // outputSourceFiles: true,
                // sourceMapBasepath: '/css',
                // sourceMapRootpath: '/',
                // sourceMapFilename: 'public/css/therootmatter.css.map',
                // sourceMapURL: '/css/therootmatter.css.map'
            },
            src: {
                files: {
                    'dist/css/app.css': [
                        'src/less/app.less'
                    ]
                }
            }
        },

        copy: {
            html: {
                processContent: true,
                expand: true,
                src: 'src/views/**',
                dest: 'dist/views',
                flatten: true
            },
            app: {
                src: 'src/main.js',
                dest: 'dist/main.js'
            }
        }

    })

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('build', [
        'less',
        'copy'
    ]);
}
