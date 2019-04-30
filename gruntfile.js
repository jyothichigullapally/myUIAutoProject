function getLastOption(options) {
    if (Array.isArray(options)) {
        return options[options.length - 1];
    }
    return options;
}

module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            files: ['Gruntfile.js'],
            options: {
                // options here to override JSHint defaults
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true
                }
            }
        },
        protractor: {
            options: {
                noColor: false,
                args: {
                    // Arguments passed to the command
                }
            },
            test: {   // Grunt requires at least one target to run so you can simply put 'all: {}' here too.
                options: {
                    configFile: getLastOption(grunt.option('conf')),
                    keepAlive: false,
                    args: {
                        suite: getLastOption(grunt.option('test-suite')),
                        params: {
                            baseUrl: getLastOption(grunt.option('baseUrl'))
                        }
                    }
                }
            }
        },

        // protractor_webdriver:{
        //     start: {
        //         command: 'node ./node_modules/protractor/bin/webdriver-manager start'
        //     }
        // },
        shell: {
            options: {
                stdout: true
            },
            yarn_install: {
                command: 'npm install'
            },
            protractor_install: {
                command: 'node ./node_modules/protractor/bin/webdriver-manager update'
            },
        }
    });

    grunt.loadNpmTasks('grunt-protractor-webdriver');
    grunt.loadNpmTasks('grunt-protractor-runner');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-shell-spawn');

    grunt.registerTask('install', ['shell:yarn_install', 'shell:protractor_install']);

    grunt.registerTask('test', function () {
        try {
            grunt.task.run('jshint');
            grunt.task.run('shell');
            //grunt.task.run('protractor_webdriver');
            grunt.task.run('protractor:test');
        } catch (e) {
            // Something went wrong.
            grunt.verbose.or.write().error().error(e.message);
            grunt.fail.warn('Something went wrong.');
        }
    });
};