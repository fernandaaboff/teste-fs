const user = require('./user/user.service.js');
const pet = require('./pet/pet.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(pet);
  app.configure(user);
};
