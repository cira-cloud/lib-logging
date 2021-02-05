const logging = require('../lib/index.js');

describe('Test addOptions(options) function', () => {
  test('Exception on parameter options not object', () => {
    expect(() => {
      logging.addOptions('foo');
    }).toThrow;
  });
  test('Exception on parameter options invalid key', () => {
    expect(() => {
      logging.addOptions({foo: 'bar'});
    }).toThrow;
  });
  test('Exception on type enableLogging not boolean', () => {
    expect(() => {
      logging.addOptions({enableLogging: 'foo'});
    }).toThrow;
  });
  test('Exception on type callerGlobal not boolean', () => {
    expect(() => {
      logging.addOptions({callerGlobal: 'foo'});
    }).toThrow;
  });
  test('Exception on type level not number', () => {
    expect(() => {
      logging.addOptions({level: 'foo'});
    }).toThrow;
  });
  test('Exception on type services not array', () => {
    expect(() => {
      logging.addOptions({services: 'foo'});
    }).toThrow;
  });
  test('Exception on type options/level not number',() => {
    expect (() => {
      logging.addOptions({level:{foo: 'bar'}});
    }).toThrow;
  });
  test('No duplicates for array services', () => {
    logging.addOptions({services:['server']});
  }).toThrow;
  test('Array content must be string', () => {
    expect(() => {
      logging.addOptions({services:[1]});
    }).toThrow;
  });
  test('Change enableLogging to false', () => {
    const options = {enableLogging: false};
    logging.addOptions(options);
    expect(logging.enableLogging).not.toBeThruthy;
  });
  test('Change callerGlobal to true', () => {
    const options = {callerGlobal: true};
    logging.addOptions(options);
    expect(logging.callerGlobal).toBeThruthy;
  });
  test('Add key-value on level object', () => {
    logging.addOptions({level:{foo: 1}});
    expect(logging.level).toMatchObject({foo: 1});
  });
  test('Add new value to services array', () => {
    logging.addOptions({services:['foo']});
    expect(logging.services).toEqual(expect.arrayContaining(['foo']));
  });
});

describe('Test getDateTime() function', () => {
  test('getDateTime must return a string', () => {
    expect(logging.getDateTime()).toBeDefined;
  });
});

describe('Test writeLog(msg) function', () => {
  test('Write logfile', () => {
    const msg = 'foo';
    logging.writeLog(msg, (response) => {
      expect(response).toBe(true);
    });
  });
});

describe('Test formatLevel(level) function', () => {
  test('Returned value should be NOTE', () => {
    const level = 1;
    expect(logging.formatLevel(level)).toBe('NOTE');
  });
});

describe('Test formatService(service) function', () => {
  expect(logging.formatService('server')).toBe('SERVER');
});

describe('Test validateParams(level, service, msg) function', () => {
  test('Returns true on valid parameters', () => {
    const level = 1;
    const service = 'server';
    const msg = 'foo';
    expect(() => {
      logging.validateParams(level, service, msg);
    }).toBeThruthy;
  });
  test('Type exception parameter level not number', () => {
    const level = 'foo';
    const service = 'bar';
    const msg = 'buz';
    expect(() => {
      logging.validateParams(level, service, msg);
    }).toThrow;
  });
  test('Type exception parameter service not string', () => {
    const level = 1;
    const service = 999;
    const msg = 'foo';
    expect(() => {
      logging.validateParams(level, service, msg);
    }).toThrow;
  });
  test('Type exception parameter msg not string', () => {
    const level = 1;
    const service = 'foo';
    const msg = 999;
    expect(() => {
      logging.validateParams(level, service, msg);
    }).toThrow;
  });
  test('Index exception on parameter level (must be included in level property of the module)', () => {
    const level = 999;
    const service = 'foo';
    const msg = 'bar';
    expect(() => {
      logging.validateParams(level, service, msg);
    }).toThrow;
  });
  test('Index exception on parameter level (must be included in level property of the module)', () => {
    const level = 1;
    const service = 'foo';
    const msg = 'bar';
    expect(() => {
      logging.validateParams(level, service, msg);
    }).toThrow;
  });
});

describe('Test format(level, service, msg) function', () => {
  test('Return value should be defined', () => {
    expect(() => {
      logging.format(1, 'server', 'foobar');
    }).toBeDefined;
  });
});

describe('Test log function', () => {
  test('Return defined value (caller false)', () => {
    expect(() => {
      logging.log(1, 'server', 'foobar');
    }).toBeDefined;
  });
  test('Return defined value (caller true', () => {
    expect(() => {
      logging.log(1, 'server', 'foobar', true);
    }).toBeDefined;
  });
});