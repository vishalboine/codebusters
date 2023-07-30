const Mock = require('../model/Mock')

const handleMock = async (req, res) => {
  try {
    const pageNumber = parseInt(req.query.pageNumber) || 1;
    const perPage = 10;
    const skipItems = (pageNumber - 1) * perPage;

    const data = await Mock.findOne(); // Assuming you have only one document in the MockData collection
    const demo1Data = data.Demo1.slice(skipItems, skipItems + perPage);
    const demo2Data = data.Demo2.slice(skipItems, skipItems + perPage);
    res.json({ Demo1: demo1Data, Demo2: demo2Data });
  } catch (error) {
    console.error('Error retrieving data:', error);
    res.status(500).json({ error: 'Server Error' });
  }
}

module.exports = { handleMock };