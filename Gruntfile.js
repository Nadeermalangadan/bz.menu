module.exports = function(grunt) {
    grunt.initConfig({
        requirejs: {
            'bz.menu': {
                options: {
                    name: 'run',
                    exclude: ['angular', 'bz', 'bz-nested-model'],
                    out: 'build/menu.src.js'
                }
            },
            options: {
                baseUrl: 'src',
                optimize: 'none',
                preserveLicenseComments: false,
                useStrict: true,
                wrap: true,
                mainConfigFile: 'src/config.js',
                onBuildWrite: function(moduleName, path, contents) {
                    return contents.replace(/define\('run'/g, "define('bz.menu'");
                }
            }
        },
        uglify: {
            'bz.menu': {
                src: ['build/menu.src.js'],
                dest: 'build/menu.js'
            },
            options: {
                compress: true,
                mangle: true,
                preserveComments: false,
                sourceMapPrefix: 1,
                sourceMappingURL: function(fileName) {
                    return fileName.replace(/^build\//, '').replace(/\.js$/, '.map');
                },
                sourceMap: function(fileName) {
                    return fileName.replace(/\.js$/, '.map');
                }
            }
        },
        htmlmin: {
            backend: {
                files: {
                    'build/admin/index.html': 'src/backend/views/index.html'
                },
                options: {
                    removeComments: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeOptionalTags: true,
                    collapseWhitespace: true
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.registerTask('default', ['requirejs', 'uglify']);
};