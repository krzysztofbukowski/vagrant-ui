'use strict'
module.exports = function(grunt) {
    require('time-grunt')(grunt);

    // Automatically load required Grunt tasks
    require('jit-grunt')(grunt, {});

    var pkg = require("./package.json");
    grunt.initConfig({
        clean: [
            'dist'
        ],
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
        uglify: {
            dist: {
                files: [{
                    expand: false,
                    // cwd: 'src',
                    // ext: '.js',
                    src: 'src/scripts/**/*.js',
                    dest: 'dist/scripts/app.min.js'
                }]
            }
        },

        wiredep: {
            app: {
                src: ['src/index.html'],
                ignorePath: /\.\.\//
            }
        },

        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            html: 'dist/index.html',
            options: {
                dest: 'dist',
                flow: {
                    html: {
                        steps: {
                            js: ['concat']
                                // css: ['cssmin']
                        },
                        post: {}
                    }
                }
            }
        },

        concat: {
            angular: {
                //src: 'bower_components/angular*/angular*.min.js',
                src: [
                    'bower_components/angular/angular.min.js',
                    'bower_components/angular-route/angular-route.min.js',
                    'bower_components/angular-animate/angular-animate.min.js',
                    'bower_components/angular-cookies/angular-cookies.min.js',
                ],
                dest: 'dist/scripts/angular.min.js'
            },
            app: {
                src: 'src/scripts/**/*.js',
                dest: 'dist/scripts/app.min.js'
            }
        },

        // Performs rewrites based on filerev and the useminPrepare configuration
        usemin: {
            html: ['dist/{,*/}*.html'],
            // css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
            // js: ['<%= yeoman.dist %>/scripts/{,*/}*.js'],
            options: {}
        },

        copy: {
            html: {
                expand: true,
                cwd: 'src',
                src: '**/*.html',
                dest: 'dist'
            },
            main: {
                src: 'src/main.js',
                dest: 'dist/main.js'
            }
            // bower_components: {
            //     cwd: 'bower_components',
            //     src: [
            //         'angular/angular.min.js',
            //         'angular-animate/angular.min.js',
            //     ]
            // }
        }

    })

    grunt.registerTask('build', [
        'clean',
        'less',
        'concat',
        // 'uglify',
        'wiredep',
        'copy',
        'usemin'
    ]);
}
