module.exports = function (grunt) {


  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: [
        'Gruntfile.js',
        'scripts/*.js'
      ],
      globals: {
        jQuery: true
      }
    },


    sass: {
      dist: {
        options: {
          lineNumbers: true,
          style: 'expanded'
        },
        files: {
          'css/styles.css': 'sass/styles.scss'
        }
      }
    },


    watch: {
      jshint: {
        files: [
          'Gruntfile.js',
          'scripts/*'
        ],
        tasks: ['jshint']
      },
      css: {
        files: 'sass/*.scss',
        tasks: ['sass']
      }
    },


    server: {
       port: 3000,
       base: 'backbone.html'
    },

    // starts the dev server
    open : {
      dev : {
        path: 'http://localhost:3000/'
      }
    }

  });


  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-open');                   // Open browser when server has been created


  //Register tasks!
  grunt.registerTask('server', 'Start a custom web server', function() {
    grunt.log.writeln('Started web server on port 3000');
   require('./js/model.js').listen(3000);
  });

  //run a web server and run the watch command.
  grunt.registerTask('default', ['build', 'server', 'open:dev', 'watch']);

  grunt.registerTask('build', ['jshint', 'sass']);

  //grunt.registerTask('default', ['jshint', 'concat', 'sass']);
};