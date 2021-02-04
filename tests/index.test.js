const logging = require('../lib/index.js')
const fs = require('fs')

describe('Test getDateTime() function', () => {
  test('getDateTime must return a string', () => {
    expect(logging.getDateTime()).toBeDefined
  })
})

describe('Test writeLog(msg) function', () => {
  test('Write logfile', () => {
    const msg = 'foo'
    logging.writeLog(msg, (response) => {
      expect(response).toBe(true)
    })
  })
})

describe('Test formatLevel(level) function', () => {
  test('Returned value should be NOTE', () => {
    const level = 1
    expect(logging.formatLevel(level)).toBe('NOTE')
  })
})

describe('Test formatService(service) function', () => {
  expect(logging.formatService('server')).toBe('SERVER')
})

describe('Test validateParams(level, service, msg) function', () => {
  test('Returns true on valid parameters', () => {
    const level = 1
    const service = 'server'
    const msg = 'foo'
    expect(() => {
      logging.validateParams(level, service, msg)
    }).toBeThruthy
  })
  test('Type exception parameter level not number', () => {
    const level = 'foo'
    const service = 'bar'
    const msg = 'buz'
    expect(() => {
      logging.validateParams(level, service, msg)
    }).toThrow
  })
  test('Type exception parameter service not string', () => {
    const level = 1
    const service = 999
    const msg = 'foo'
    expect(() => {
      logging.validateParams(level, service, msg)
    }).toThrow
  })
  test('Type exception parameter msg not string', () => {
    const level = 1
    const service = 'foo'
    const msg = 999
    expect(() => {
      logging.validateParams(level, service, msg)
    }).toThrow
  })
  test('Index exception on parameter level (must be included in level property of the module)', () => {
    const level = 999
    const service = 'foo'
    const msg = 'bar'
    expect(() => {
      logging.validateParams(level, service, msg)
    }).toThrow
  })
  test('Index exception on parameter level (must be included in level property of the module)', () => {
    const level = 1
    const service = 'foo'
    const msg = 'bar'
    expect(() => {
      logging.validateParams(level, service, msg)
    }).toThrow
  })
})