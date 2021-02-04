const logging = require('../lib/index.js')
const fs = require('fs')

describe('Test getDateTime() function', () => {
  test('getDateTime must return a string', () => {
    expect(logging.getDateTime()).toBeDefined
  });
});

describe('Test writeLog(msg) function', () => {
  test('Write logfile', () => {
    const msg = 'foo'
    logging.writeLog(msg, (response) => {
      expect(response).toBe(true)
    })
  })
})
describe('Test format(level, service, msg) function', () => {
  test('Type exception parameter level not number', () => {
    const level = 'foo'
    const service = 'bar'
    const msg = 'buz'
    expect(() => {
      logging.format(level, service, msg)
    }).toThrow
  })
  test('Type exception parameter service not string', () => {
    const level = 1
    const service = 999
    const msg = 'foo'
    expect(() => {
      logging.format(level, service, msg)
    }).toThrow
  })
  test('Type exception parameter msg not string', () => {
    const level = 1
    const service = 'foo'
    const msg = 999
    expect(() => {
      logging.format(level, service, msg)
    }).toThrow
  })
})