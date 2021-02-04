const logging = require('../lib/index.js')

describe('Test getDateTime function', () => {
  test('getDateTime must return a string', () => {
    expect(logging.getDateTime()).toBeDefined
  })
})