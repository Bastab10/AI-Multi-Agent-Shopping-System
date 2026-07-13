const generateSearchKeyword = require("../services/geminiService");
const searchProducts = require("../services/serpApiService");

const searchAgent = async (userQuery) => {

    let keyword;

    try {
        keyword = await generateSearchKeyword(userQuery);
    } catch (error) {
        console.log("Gemini unavailable, using user query...");
        keyword = userQuery;   // fallback
    }

    const products = await searchProducts(keyword);

    return {
        keyword,
        products
    };
};

module.exports = searchAgent;