const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HistorySchema = Schema({
    user: {
        type: String,
        required: true
    },
    tableName: {
        type: String,
        required: true
    },
    fileName: {
        type: String,
        required: true
    }
})

const HistoryModel = mongoose.model('History', HistorySchema);
module.exports = HistoryModel