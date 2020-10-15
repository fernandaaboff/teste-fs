const { AuthenticationService, JWTStrategy } = require('@feathersjs/authentication');
const { LocalStrategy } = require('@feathersjs/authentication-local');
const { expressOauth } = require('@feathersjs/authentication-oauth');

module.exports = app => {
  const authentication = new AuthenticationService(app);

  authentication.register('jwt', new JWTStrategy());
  authentication.register('local', new LocalStrategy());

  app.use('/login', authentication);
  app.use('/me', (req, res) => {
    const token = (req.feathers.authentication ? req.feathers.authentication.accessToken : '') || req.body.token;
    if (token) {
      authentication.verifyAccessToken(token)
        .then(data => {
          return app.service('user').get(data.sub);
        })
        .then(data => {
          res.json(data);
        })
        .catch(erro => {
          throw erro;
        });
    } else {
      throw new Error("Nenhum token encontrado");
    }
  });

  app.configure(expressOauth());
};
