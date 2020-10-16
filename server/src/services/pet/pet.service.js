// Initializes the `pet` service on path `/pet`
const { Pet } = require('./pet.class');
const createModel = require('../../models/pet.model');
const hooks = require('./pet.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/pet', new Pet(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('pet');

  service.hooks(hooks);
};
