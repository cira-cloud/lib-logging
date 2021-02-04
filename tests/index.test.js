const logging = require('../lib/index.js')
const fs = require('fs')

describe('Test getDateTime function', () => {
  test('getDateTime must return a string', () => {
    expect(logging.getDateTime()).toBeDefined
  });
});

describe('Test writeLog function', () => {
  test('Write logfile', () => {
    const msg = 'foo'
    logging.writeLog(msg, (response) => {
      expect(response).toBe(true)
    })
  })
})