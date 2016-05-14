module.exports = function(grunt){
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    watch: {
      executable: {
        files: ['ascii.sjs'],
        tasks: ['exec'],
      }
    },

    exec: {
      executable: './ascii.sjs'
    },

  })

  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-exec')
}
