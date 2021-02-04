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
describe('Test format function', () => {
  test('Type exception parameter level not number', () => {
    const level = 'foo'
    const service = 'bar'
    const msg = 'buz'
    expect(() => {
      logging.format(level, service, msg)
    }).toThrow
  })
})