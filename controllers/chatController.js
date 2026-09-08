const shoppingAgent = require("../agents/shoppingAgent");

exports.chat = async (req, res) => {
  try {
    const { conversationHistory } = req.body;

    if (!conversationHistory || !Array.isArray(conversationHistory)) {
      return res.status(400).json({
        success: false,
        message: "Conversation history is required",
      });
    }

    const result = await shoppingAgent(conversationHistory);

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    console.error("Chat Controller Error:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Chat failed",
    });
  }
};