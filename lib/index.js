/**
 * Logging libary for node.js
 * This libary provides a complete logging functionallity to implement in node.js
 * 
 * @version 1.0.0
 * @since 1.0.0
 * @author syr0s <daniel.noetzel@gmail.com>
 * @license MIT
 * 
 **/
 
/* Load dependencies */
// require fs module (core) to provide write operations on the host system
const fs = require('fs');

module.exports = {
  // setup default values
  enableLogging: true,            // will enable logging on the hosts file system (Default: true)
  directory: './logs',            // directory of the logfile
  logfile: './logs/lib-logging.log',  // path and name of the logfile
  level: {
    note: 1,
    warn: 2,
    error: 3
  },
  services: ['server', 'cors', 'redis', 'lifesign', 'mariadb'],
  
  // add options to the default values
  addOptions(options) {
    // options must be an object
    if (typeof(options) != 'object') throw `Type exception on options, must be an object (got ${typeof(options)})`;
    for (let key in options) {
      // options only allowed for
      if (key === 'enableLogging' || 'level' || 'services') {
        switch(key) {
          case 'enableLogging':
            // type check enableLogging (boolean)
            if(!typeof(key) === 'boolean') throw `Type exception on parameter options ${key}, must be boolean (got ${typeof(key)})`;
            this.enableLogging = options[key]
            break;
          case 'level':
            // type check level (object)
            if(!typeof(key) === 'object') throw `Type exception on parameter options ${key}, must be object (got ${typeof(key)})`;
            // loop through the nested object
            for (let k in options[key]) {
              // type check on value must be number
              if (typeof(options[key][k]) != 'number') throw `Type exception on parameter options ${key} ${k} must be number (got ${typeof(options[key][k])})`;
              this.level[k] = options[key][k];
            }
            break
          case 'services':
           let that = this;
            // type check services (array)
            if(typeof(options.services) != 'object') throw `Type exception on parameter options ${key}, must be object (got ${typeof(options.services)})`;
            // loop through the array
            for (let i=0; i < options.services.lenght; i++) {
              // type check on array content
              if(typeof(options.services[i]) != 'string') throw `Type exception on content of parameter options services must be string (got ${typeof(options.services[i])})`;
              // index check no duplicates
              if (this.services.indexOf(options.services[i])) throw `Index exception duplicate detected for services ${options.services[i]}`;
            }
            // push value to the array
            options.services.forEach(pushToArray);
            function pushToArray(value) {
              that.services.push(value);
            }
            break;
        }
      } else {
        throw `Index exception on options, ${key} not allowed`;
      }
    }
  },
  // get the current date and time
  getDateTime: function () {
    return new Date(Date.now);     // will return date and time (UTC) as string
  },
  // write the actual message to the logfile
  writeLog: function (msg) {
    let that = this;
    // check if file allready exists
    fs.stat(this.logfile,function(error) {
      // use the error handler to determine file exists or not
      if (!error) {
        // file exists
        // append msg to the existing logfile
        fs.appendFile(that.logfile, msg + '\r\n', function(error) {
          // throw exception on any error
          if (error) throw error;
          // for testing only
          if (process.env.NODE_ENV === 'dev') {
            return true;
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
              return true;
            }
          })
        }
        // create directory if not exists
        if (!fs.existsSync(that.directory)) {
          fs.mkdir(that.directory, (error) => {
            if (!error) {
              // create a new logfile
              createFile(msg);
            } else {
              // exception on failure
              throw error;
            }
          })
        } else {
          // directory allready exists, create a new logfile
          createFile(msg);
        }
      }
    })
  },
  // validate the given parameters
  validateParams(level, service, msg) {
    // type check level, must be number
    if (typeof(level) != 'number') throw `Type exception on parameter level, must be number (got ${typeof(level)})`;
    // type check service, must be string
    if (typeof(service) != 'string') throw `Type exception on parameter service, must be string (got ${typeof(service)})`;
    // type check msg, must be string
    if (typeof(msg) != 'string') throw `Type exception on parameter msg, must be string (got ${typeof(msg)})`;
    // index check level
    if (Object.values(this.level).indexOf(level) === -1) throw `Index exception on parameter level, ${level} not allowed here.`;
    // index check service
    if (!this.services.indexOf(service)) throw `Index exception on parameter service, ${service} not allowed here.`;
    // return true on valid parameters
    return true;
  },
  // get the formated level string
  formatLevel(level) {
    // loop the level object
    for (let key in this.level) {
      // check if passed level parameter is a value of the this.level object
      if (this.level[key] === level) {
        // format and return the this.level.key
        return key.toUpperCase();
      }
    }
  },
  // get the formated service string
  formatService(service) {
    return service.toUpperCase();
  },
  // format the logging message
  format(level, service, msg) {
    if (this.validateParams(level, service,msg)) {
      return `[${this.formatLevel(level)} - ${this.formatService(service)} | ${this.getDateTime()}] ${msg}`;
    }
  },
  // log the actual event
  log(level, service, msg) {
    const formatMsg = this.format(level, service, msg);
    // log as file
    if (this.enableLogging) {
      this.writeLog(formatMsg);
    }
    // output event in console
    console.log(formatMsg);
  }
};