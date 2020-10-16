const assert = require('assert');
const app = require('../../src/app');

describe('\'pet\' service', () => {
  it('registered the service', () => {
    const service = app.service('pet');

    assert.ok(service, 'Registered the service');
  });
});
