const ValidationsModel = require('../model/Validation');

const getValidations = async (req, res) => {
    const allTables = await ValidationsModel.find({}).exec();
    allTables.filter((item) => {
        const { __v, _id, ...rest } = item
        return rest
    })
    res.status(200).json(allTables);
}

const updateValidations = async (req, res) => {
    try {
        const { tableName, values } = req.body;
        const Validation = await ValidationsModel.findOneAndUpdate(
            { [tableName]: { $exists: true } },
            { $set: { [tableName]: values } },
            { new: true }
        )

        if (!Validation) {
            return res.status(404).json({ error: 'Table not found' });
        }

        const allValidations = await Table.find({}).exec();
        res.status(200).json(allValidations);
    } catch (error) {
        console.error('Error updating validation:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = { getValidations, updateValidations }