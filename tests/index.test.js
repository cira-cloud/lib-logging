const logging = require('../lib/index.js')

describe('Test getDateTime function', () => {
  test('getDateTime must return a string', () => {
    expect(logging.getDateTime()).toBeDefined
  })
  test('getDateTime returns the current datetime string', () => {
    const expected = new Date(Date.now)
    expect(logging.getDateTime()).toBe(expected)
  })
})