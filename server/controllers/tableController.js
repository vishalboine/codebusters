const Table = require('../model/Table');
const ValidationsModel = require('../model/Validation');

const addTable = async (req, res) => {
    try {
      const { tableName, columns } = req.body;

      const schemaDefinition = {};
      function createDynamicSchema(schemaDefinition, columns) {
        for (const column of columns) {
          schemaDefinition[column.trim()] = 'String';
        }
        return new ValidationsModel(schemaDefinition);
      }
  
      // Create a new record using the Table
      const newTable = new Table({
        [tableName]: columns,
      });
      // Save the new record to the database
      const newValidation = new ValidationsModel({
        [tableName]: createDynamicSchema(schemaDefinition,columns)
      })

      await newTable.save();
      await newValidation.save();
  
      const allTables = await Table.find({}).exec();
      allTables.filter((item) => {
        const {__v, _id, ...rest} = item
        return rest
      })
      res.status(200).json(allTables);
    } catch (error) {
      console.error('Error adding table:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

const updateColumnForGivenTable = async (req, res) => {
    try {
      const { tableName, updatedColumn } = req.body;
  
      // Find the existing record based on the tableName
      const updatedTable = await Table.findOneAndUpdate(
        { [tableName]: { $exists: true } },
        { $set: { [tableName]: updatedColumn } },
        { new: true } // Return the updated document after the update
      );
  
      if (!updatedTable) {
        return res.status(404).json({ error: 'Table not found' });
      }

      const allTables = await Table.find({}).exec();
    allTables.filter((item) => {
      const {__v, _id, ...rest} = item
      return rest
    })
  
      res.status(200).json(allTables);
  
    } catch (error) {
      console.error('Error updating column:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  const deleteTable = async (req, res) => {
    try {
      const { tableName } = req.body;
  
      // Find the existing record based on the tableName
      const existingTable = await Table.findOne({ [tableName]: { $exists: true } });
  
      if (!existingTable) {
        return res.status(404).json({ error: 'Table not found' });
      }
  
      // Remove the table from the database
      await Table.deleteOne({ [tableName]: { $exists: true } });
      const allTables = await Table.find({}).exec();
      allTables.filter((item) => {
        const {__v, _id, ...rest} = item
        return rest
      })
      res.status(200).json(allTables);
    } catch (error) {
      console.error('Error deleting table:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };


const getAllTables = async (req, res) => {
  try {
    // Retrieve all records from the database using TableModel
    const allTables = await Table.find({}).exec();
    allTables.filter((item) => {
      const {__v, _id, ...rest} = item
      return rest
    })
    res.status(200).json(allTables);
  } catch (error) {
    console.error('Error fetching tables:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

  module.exports = { addTable, deleteTable, updateColumnForGivenTable, getAllTables }