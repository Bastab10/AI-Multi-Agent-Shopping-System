const comparisonAgent = require("../agents/comparisonAgent");

exports.compareProducts = async (req, res) => {
  try {
    const { products } = req.body;

    
    if (!products || !Array.isArray(products)) {
      return res.status(400).json({
        success: false,
        message: "Products array is required.",
      });
    }

    if (products.length < 2) {
      return res.status(400).json({
        success: false,
        message: "Please select at least 2 products to compare.",
      });
    }

    if (products.length > 3) {
      return res.status(400).json({
        success: false,
        message: "Maximum 3 products can be compared.",
      });
    }

    const comparison = await comparisonAgent(products);

    res.status(200).json({
      success: true,
      comparison,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to compare products.",
    });

  }
};