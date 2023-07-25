const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resourceSchema = Schema({
    excelIcon: {
        type: String,
    },
})

module.exports = mongoose.model('Resource', resourceSchema);