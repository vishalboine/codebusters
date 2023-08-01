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
        const { tablename, columnname, val } = req.body;
    
        const updatedDocument = await ValidationsModel.findOneAndUpdate(
            { [tablename]: { $exists: true } },
            { $set: { [`${tablename}.${columnname}`]: val } },
            { new: true }
          );
      
          if (!updatedDocument) {
            return res.status(404).json({ error: 'Table not found.' });
          }
    
        const allTables = await ValidationsModel.find({}).exec();
        allTables.filter((item) => {
            const { __v, _id, ...rest } = item
            return rest
        })
        res.status(200).json(allTables);
      } catch (err) {
        return res.status(500).json({ error: 'Internal server error.' });
      }
}

module.exports = { getValidations, updateValidations }