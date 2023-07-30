const mongoose = require('mongoose');

const ValidationsSchema = new mongoose.Schema(
  {},
  { strict: false }
);

const ValidationsModel = mongoose.model('Validations', ValidationsSchema);

module.exports = ValidationsModel;