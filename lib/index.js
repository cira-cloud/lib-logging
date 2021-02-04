/**
 * Logging libary for CIRAcloud backend servers
 * 
 * @version 1.0.0
 * @since 1.0.0
 * @author syr0s <daniel.noetzel@gmail.com>
 * @license MIT
 * 
 **/
 
/* Load dependencies */
// require fs module to provide write operations on the host system
const fs = require('fs')

module.exports = {
  // setup default values
  directory: './logs',
  logfile: `./logs/backend.log`,
  
  getDateTime: function () {
    return new Date(Date.now)
  },
  writeLog: function(msg) {
    that = this
    // check if file allready exists
    fs.stat(this.logfile,function(error) {
      if (!error) {
        // file exists
        fs.appendFile(that.logfile, msg + '\r\n', function(error) {
          if (error) throw error;
          // for testing only
          if (process.env.NODE_ENV === 'dev') {
            return true
          }
        })
      } else {
        // file does not exists yet
        // nested function to create a new logfile
        function createFile(msg) {
          fs.writeFile(that.logfile, msg + '\r\n', (error) => {
            if (error) throw error;
            // for testing only
            if (process.env.NODE_ENV === 'dev') {
              return true
            }
          })
        }
        // create directory if not exists
        if (!fs.existsSync(that.directory)) {
          fs.mkdir(that.directory, (error) => {
            if (!error) {
              createFile(msg)
            } else {
              throw error
            }
          })
        } else {
          createFile(msg)
        }
      }
    })
  }
};