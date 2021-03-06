// user-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const modelName = 'user';
  const mongooseClient = app.get('mongooseClient');
  const schema = new mongooseClient.Schema({
    email: { type: String, unique: true, lowercase: true },
    nome: { type: String, lowercase: true },
    password: { type: String },
    pets: [
      { type: mongooseClient.Schema.Types.ObjectId, ref: 'pet' }
    ]
  }, {
    timestamps: true
  });

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, schema);

};
