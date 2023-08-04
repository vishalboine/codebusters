const User = require('../model/User');

const getAllUsers = async (req, res) => {
    const users = await User.find({}).exec();
    res.json(users);
}

const deleteUser = async (req, res) => {
    if (!req?.body?.id) return res.status(400).json({ "message": 'User ID required' });
    const user = await User.findOne({ _id: req.body.id }).exec();
    if (!user) {
        return res.status(204).json({ 'message': `User ID ${req.body.id} not found` });
    }
    await user.deleteOne({ _id: req.body.id });
    const users = await User.find({}).exec();
    res.json(users);
}

const updateUserRoleByUsername = async (req, res) => {
    const { username, role } = req.body;
  
    try {
      // Find the user by username and update the role
      const updatedUser = await User.findOneAndUpdate(
        { username },
        { role },
        { new: true }
      );
  
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const users = await User.find({}).exec();
        res.json(users);
    } catch (error) {
      return res.status(500).json({ message: 'Error updating user role' });
    }
  };


module.exports = {getAllUsers, deleteUser, updateUserRoleByUsername}