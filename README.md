# lib-logging
![Test](https://github.com/cira-cloud/lib-logging/workflows/Test/badge.svg)
![Publish](https://github.com/cira-cloud/lib-logging/workflows/Publish/badge.svg)


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
// will log in console (and file):
// [NOTE - SERVER | Thu Feb 04 2021 21:13:16 GMT+0100 ] Hello World
```
If you would like to log also the origin of the message you can use:
```javascript
const logging = require('lib-logging')
logging.log(1, 'server', 'Hello World', true)
// will log in console (and file):
// [NOTE - SERVER | Thu Feb 04 2021 21:13:16 GMT+0100 ] (/my/path:35 - myFunction) Hello World
```
By default `lib-logging` will store all loggings in `./logs/lib-logging.log`. You can disable this feature by using the `addOptions()` function (see configuration for more details).

## Possible parameters
The log() function takes four arguments. 
1. `level`: The log level as number (1: Note, 2: Warning, 3: Error)
2. `service`: The corresponding service triggering the log function, by default `['server', 'cors', 'redis', 'lifesign', 'mariadb']` are possible values
3. `msg`: The message string to log
4. `caller`: Boolean value (default false) which provides additional information about the origin

## Configuration
To modify the default values of `lib-logging` you can use the `addOptions(options)` function. 
```javascript
const options = {
  enableLogging: false,
  level: {
    debug: 4
  },
  services: ['my service'],
  globalCaller: false
}
log.addOptions(options)
```
For debugging purposes, you can set the `globalCaller` property to `true`. This will ptovide the additional caller information on all log events.