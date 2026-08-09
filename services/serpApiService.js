const axios = require("axios");

const searchProducts = async (keyword) => {
  try {
    const response = await axios.get(
      "https://serpapi.com/search.json",
      {
        params: {
          engine: "google_shopping",
          q: keyword,

          // 🇮🇳 India localization
          location: "India",
          google_domain: "google.co.in",
          gl: "in",
          hl: "en",

          api_key: process.env.SERP_API_KEY,
        },
      }
    );

    const products = response.data.shopping_results.map((item) => ({
      id: item.product_id,
      title: item.title,
      price: item.price,
      rating: item.rating,
      reviews: item.reviews,
      image: item.thumbnail,
      source: item.source,
      link: item.product_link,
    }));

    return products;
  } catch (error) {
    console.error(error.response?.data || error.message);
    throw new Error("Failed to fetch products from SerpAPI");
  }
};

module.exports = searchProducts;