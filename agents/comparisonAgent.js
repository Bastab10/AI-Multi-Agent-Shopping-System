const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const comparisonAgent = async (products) => {
  try {
    const shortProducts = products.map((product) => ({
      title: product.title,
      price: product.price,
      rating: product.rating,
      reviews: product.reviews,
    }));

    const prompt = `
You are an AI Shopping Expert.

Compare the following products:

${JSON.stringify(shortProducts, null, 2)}

Analyze them based on:
- Price
- Rating
- Reviews

Return ONLY valid JSON in this format:

{
  "winner": "",
  "bestValue": "",
  "pros": [],
  "cons": [],
  "summary": ""
}
`;

    const response = await ai.models.generateContent({
      model: "gemini-flash-latest",
      contents: prompt,
    });

    const text =
      response.text ||
      response.candidates?.[0]?.content?.parts?.[0]?.text ||
      "";

    const cleanText = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleanText);

  } catch (error) {
    

    const sortedByRating = [...products].sort(
      (a, b) => (b.rating || 0) - (a.rating || 0)
    );

    const winner = sortedByRating[0];

    const getPrice = (price) => {
      return (
        parseFloat(
          String(price).replace(/[^0-9.]/g, "")
        ) || Number.MAX_VALUE
      );
    };

    const bestValue = [...products].sort(
      (a, b) => getPrice(a.price) - getPrice(b.price)
    )[0];

    return {
      winner: winner.title,

      bestValue: bestValue.title,

      pros: [
        `${winner.title} has the highest customer rating.`,
        `${bestValue.title} offers the best value for money.`,
      ],

      cons: [
        "AI comparison unavailable.",
      ],

      summary: `${winner.title} is the best overall product based on customer ratings, while ${bestValue.title} is the most budget-friendly option among the selected products.`,
    };
  }
};

module.exports = comparisonAgent;