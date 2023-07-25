const Resource = require('../model/Resource')

const handleResources = async (req, res) => {
    const resource = await Resource.find().exec()
    res.json(resource)
}

module.exports = { handleResources };