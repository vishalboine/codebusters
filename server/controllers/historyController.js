const HistoryModel = require("../model/History");

const getAllHistory = async (req, res) => {
    const histories = await HistoryModel.find({}).exec();
    res.status(200).json(histories)
}

const getUserHistory = async (req, res) => { 
    const histories = await HistoryModel.find({
        user: req.body.user
    }).exec();
    res.status(200).json(histories)
 }

const createUserHistory = async (req, res) => {
    const { user, tableName, fileName } = req.body;

    try {
        
        await HistoryModel.create({
            user, tableName, fileName
        })

        const histories = await HistoryModel.find({}).exec();
        res.status(200).json(histories)

    } catch (error) {
        res.status(500).json({ 'message': 'Something went wrong' });
    }
}

module.exports = {
    getAllHistory,
    createUserHistory,
    getUserHistory
}