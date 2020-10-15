// Initializes the `user` service on path `/user`
const { User } = require('./user.class');
const createModel = require('../../models/user.model');
const hooks = require('./user.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  const user =  new User(options, app);
  // Initialize our service with any options it requires
  app.use('/user', user);
  app.use('/users', (req, res) => {
    user.find({ query: req.query }).then(data => {
      res.json(data);
    });
  });

  // Get our initialized service so that we can register hooks
  const service = app.service('user');

  service.hooks(hooks);
};
