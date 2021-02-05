# lib-logging

A node.js logging implementation.

## Installation
```
npm install --save lib-logging
```

## Usage
**Example**
```javascript
const logging = require('lib-logging')
logging.log(1, 'server', 'Hello World')
// will log in console:
// [NOTE - SERVER | Thu Feb 04 2021 21:13:16 GMT+0100 ] Hello World
```
By default `lib-logging` will store all loggings in `./logs/lib-logging.log`. You can disable this feature by using the `addOptions()` function (see configuration for more details).

## Possible parameters
The log() function takes three arguments. 
1. `level`: The log level as number (1: Note, 2: Warning, 3: Error)
2. `service`: The corresponding service triggering the log function, by default `['server', 'cors', 'redis', 'lifesign', 'mariadb']` are possible values
3. `msg`: The message string to log

## Configuration
To modify the default values of `lib-logging` you can use the `addOptions(options)` function. 
```javascript
const options = {
  enableLogging: false,
  level: {
    debug: 4
  },
  services: ['my service']
}
log.addOptions(options)
```