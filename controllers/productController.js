const searchAgent = require("../agents/searchAgent");
const recommendationAgent = require("../agents/recommendationAgent");

exports.searchProducts = async (req, res) => {
  try {
    const result = await searchAgent(req.query.q);

    const recommendation = await recommendationAgent(result.products);

    res.status(200).json({
      success: true,
      keyword: result.keyword,
      total: result.products.length,
      recommendation,
      products: result.products,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};