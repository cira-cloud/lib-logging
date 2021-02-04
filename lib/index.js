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
// require fs module to avail write operations on the host system
const fs = require('fs')
// require path module to provide correct directory information on different enviroments
const path = require('path')

module.exports = {
  // setup default values
  logfile: path.dirname(require.main.filename) + '/logs/backend.log',
  
  getDateTime: function () {
    return new Date(Date.now)
  },
  writeLog: function(msg) {
    fs.appendFile(logfile, msg + '\r\n', function(error) {
      if (error) throw error;
    })
  }
};