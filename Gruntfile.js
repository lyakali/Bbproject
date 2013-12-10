module.exports = function(grunt) {

  grunt.initConfig({
    
    jshint: {
      src: ['Gruntfile.js', 'js/*.js'],
      options: {
    
      }
    },

    sass: {                              // Task
    dist: {                            // Target
      options: {                       // Target options
        style: 'expanded'
      },
      files: {                         // Dictionary of files
        'css/styles.css': 'scss/styles.scss'
      }
    }
  },

  watch: {
  css: {
    files: '**/*.sass',
    tasks: ['sass'],
    options: {
      livereload: {
        port: 8080 
      }
    },
  },
},


  });

  // Load JSHint task
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task.
  grunt.registerTask('default', 'jshint', 'sass');


};