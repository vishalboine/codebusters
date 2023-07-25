const Table = require('../model/Table');

const addTable = async (req, res) => {
    try {
      const { tableName, columns } = req.body;
  
      // Create a new record using the Table
      const newTable = new Table({
        [tableName]: columns,
      });
  
      // Save the new record to the database
      const savedTable = await newTable.save();
  
      res.status(201).json(savedTable);
    } catch (error) {
      console.error('Error adding table:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

const updateTable = async (req, res) => {
    try {
      const { tableName, newTableName } = req.body;
  
      // Find the existing record based on the tableName
      const existingTable = await Table.findOne({ [tableName]: { $exists: true } });
  
      if (!existingTable) {
        return res.status(404).json({ error: 'Table not found' });
      }
  
      // Create a new record with the updated table name and columns
      const updatedTable = new Table({
        [newTableName]: existingTable[tableName],
      });
  
      // Remove the old record
      await Table.deleteOne({ [tableName]: { $exists: true } });
  
      // Save the updated record to the database
      const savedTable = await updatedTable.save();
  
      res.status(200).json(savedTable);
    } catch (error) {
      console.error('Error updating table:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

const updateColumnForGivenTable = async (req, res) => {
    try {
      const { tableName, updatedColumn } = req.body;
  
      // Find the existing record based on the tableName
      const existingTable = await Table.findOne({ [tableName]: { $exists: true } });
  
      if (!existingTable) {
        return res.status(404).json({ error: 'Table not found' });
      }
  
      // Update the columns for the existing table
      existingTable[tableName] = updatedColumn;
  
      // Save the updated record to the database
      const savedTable = await existingTable.save();
  
      res.status(200).json(savedTable);
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
  
      res.status(200).json({ message: 'Table deleted successfully' });
    } catch (error) {
      console.error('Error deleting table:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };


const getAllTables = async (req, res) => {
  try {
    // Retrieve all records from the database using TableModel
    const allTables = await Table.find({}).exec();

    res.status(200).json(allTables);
  } catch (error) {
    console.error('Error fetching tables:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

  module.exports = { addTable, deleteTable, updateColumnForGivenTable, updateTable, getAllTables }