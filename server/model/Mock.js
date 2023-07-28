const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const demo1Schema = new mongoose.Schema({
    id: { type: Number, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    gender: { type: String, required: true },
  });
  
  const demo2Schema = new mongoose.Schema({
    customer_id: { type: Number, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    birthdate: { type: String, required: true },
  });
  
  const mockDataSchema = new mongoose.Schema({
    Demo1: [demo1Schema], // Array of objects using the demo1Schema
    Demo2: [demo2Schema], // Array of objects using the demo2Schema
  });

module.exports = mongoose.model('Mock', mockDataSchema);