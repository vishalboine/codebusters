const mongoose = require('mongoose');

// Define the 'tableSchema'
const tableSchema = new mongoose.Schema(
  {},
  { strict: false }
);

const Table = mongoose.model('Table', tableSchema);

module.exports = Table;