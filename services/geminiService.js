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
      model: "gemini-3.5-flash-lite",
      contents: prompt,
    });

    return response.text.trim();
  } catch (error) {
    console.error("Gemini Search Keyword Error:", error);
    throw new Error("Gemini Error");
  }
};

const shoppingChat = async (conversationHistory = []) => {
  try {
    const systemInstruction = `
You are ShopIntel AI, a friendly and intelligent AI shopping assistant.

Your job is to have a natural conversation with the user.

IMPORTANT RULES:

1. The user can ask you anything.
2. Answer general questions normally and naturally.
3. If the user wants to buy a product, understand their requirements through conversation.
4. Do NOT ask unnecessary questions.
5. Use information that the user has already provided.
6. If important shopping information is missing, ask ONE useful question.
7. When enough information is available, mark searchRequired as true.
8. Never invent product names, prices, ratings, availability or links.
9. Actual products will be searched separately using SerpAPI.
10. If the user changes their requirement, update the requirements.
11. Keep replies short, friendly and conversational.

Possible shopping requirements:

- category
- budget
- useCase
- brand
- importantFeatures
- priority

Return ONLY valid JSON in this format:

{
  "reply": "Your natural response to the user",
  "intent": "general | shopping",
  "searchRequired": false,
  "requirements": {
    "category": null,
    "budget": null,
    "useCase": [],
    "brand": null,
    "importantFeatures": [],
    "priority": null
  }
}

When more information is required:

- searchRequired must be false
- Ask one relevant question in "reply"

When enough information is available for product search:

- searchRequired must be true
- Do not ask another question
- Fill the requirements with the information available
`;

    const conversationText = conversationHistory
      .map((message) => {
        const role = message.role === "assistant" ? "Assistant" : "User";

        return `${role}: ${message.content}`;
      })
      .join("\n");

    const prompt = `
${systemInstruction}

CONVERSATION:

${conversationText}

Now respond to the latest user message.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash-lite",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const result = JSON.parse(response.text);

    return result;
  } catch (error) {
    console.error("Gemini Shopping Chat Error:", error);

    throw new Error("Gemini Chat Error");
  }
};

module.exports = {
  generateSearchKeyword,
  shoppingChat,
};
