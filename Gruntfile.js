'use strict';

module.exports = function(grunt) {

    grunt.initConfig({
        watch : {
            files : ['src/IronLog.js6'],
            tasks : ['babel']
        },
        babel : {
            options: {
                sourceMap: true
            },
            dist: {
                files: {
                    "dist/IronLog.js": "src/IronLog.js6"
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask("default", ["watch"]);

}