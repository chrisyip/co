
var assert = require('assert');

var co = require('..');

describe('yield <invalid>', function () {
  it('should throw an error', function () {
    return co(function* () {
      try {
        yield null;
        throw new Error('lol');
      } catch (err) {
        assert(err instanceof TypeError);
        assert(~err.message.indexOf('You may only yield'));
      }
    })
  });

  it('should attach context if CO_DEBUG is on', function () {
    process.env.CO_DBEUG = true;
    return co(function* () {
      try {
        yield null;
      } catch (err) {
        assert(err instanceof TypeError);
        assert(~err.message.indexOf('You may only yield'));
        assert(~err.message.indexOf('function* () {\n      try {\n        yield null;\n      } catch (err) {\n        assert(err instanceof TypeError);\n        assert(~err.message.indexOf(\'You may only yield\'));'));
      }
    })
  });
})
