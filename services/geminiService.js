const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const generateSearchKeyword = async (userQuery) => {
  try {
    const prompt = `
You are a shopping assistant.

Convert the user's shopping request into a short search keyword.

Examples:

Input: Best phone under ₹30000
Output: phone under ₹30000

Input: Gaming laptop for coding
Output: gaming laptop

User:
${userQuery}

Only return the keyword.
`;

   const response = await ai.models.generateContent({
  model: "gemini-flash-latest",
  contents: prompt,
});

    return response.text.trim();
  } catch (error) {
    console.error(error);
    throw new Error("Gemini Error");
  }
};

module.exports = generateSearchKeyword;