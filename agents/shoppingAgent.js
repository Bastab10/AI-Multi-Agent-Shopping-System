const { shoppingChat } = require("../services/geminiService");
const searchProducts = require("../services/serpApiService");
const recommendationAgent = require("./recommendationAgent");

const shoppingAgent = async (conversationHistory = []) => {
  try {
    const aiResult = await shoppingChat(conversationHistory);

    const requirements = aiResult?.requirements || {};

    const hasCategory =
      typeof requirements.category === "string" &&
      requirements.category.trim().length > 0;

    const hasBudget =
      requirements.budget !== null &&
      requirements.budget !== undefined &&
      requirements.budget !== "";

    const hasUseCase =
      Array.isArray(requirements.useCase) &&
      requirements.useCase.length > 0;

    const hasBrand =
      typeof requirements.brand === "string" &&
      requirements.brand.trim().length > 0;

    const hasFeatures =
      Array.isArray(requirements.importantFeatures) &&
      requirements.importantFeatures.length > 0;

    const hasPriority =
      typeof requirements.priority === "string" &&
      requirements.priority.trim().length > 0;

    const enoughInformation =
      hasCategory &&
      (
        hasBudget ||
        hasUseCase ||
        hasBrand ||
        hasFeatures ||
        hasPriority
      );

    if (!aiResult.searchRequired || !enoughInformation) {
      return {
        reply:
          aiResult.reply ||
          "Sure! Tell me a little more about what you're looking for.",

        intent: aiResult.intent || "shopping",

        searchRequired: false,

        requirements,

        keyword: null,

        products: [],

        recommendation: null,

        comparison: null,
      };
    }

    const searchParts = [];

    if (hasCategory) {
      searchParts.push(requirements.category.trim());
    }

    if (hasBrand) {
      searchParts.push(requirements.brand.trim());
    }

    if (hasUseCase) {
      searchParts.push(requirements.useCase.join(" "));
    }

    if (hasFeatures) {
      searchParts.push(
        requirements.importantFeatures.join(" ")
      );
    }

    if (hasPriority) {
      searchParts.push(requirements.priority.trim());
    }

    if (hasBudget) {
      searchParts.push(`under ₹${requirements.budget}`);
    }

    const keyword = searchParts
      .filter(Boolean)
      .join(" ")
      .trim();

    if (!keyword) {
      return {
        reply:
          "I need a little more information before I search for products.",

        intent: "shopping",

        searchRequired: false,

        requirements,

        keyword: null,

        products: [],

        recommendation: null,

        comparison: null,
      };
    }

    console.log("Shopping Search Keyword:", keyword);

    const products = await searchProducts(keyword);

    let recommendation = null;

    if (products && products.length > 0) {
      recommendation = await recommendationAgent(products);
    }

    return {
      reply:
        aiResult.reply ||
        "I found some products that match your requirements.",

      intent: aiResult.intent || "shopping",

      searchRequired: true,

      requirements,

      keyword,

      products: products || [],

      recommendation,

      comparison: null,
    };
  } catch (error) {
    console.error("Shopping Agent Error:", error);

    throw new Error("Shopping Agent Error");
  }
};

module.exports = shoppingAgent;