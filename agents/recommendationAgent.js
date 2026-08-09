const getPrice = (price) => {
  if (!price) return Number.MAX_VALUE;

  return parseFloat(String(price).replace(/[^0-9.]/g, "")) || Number.MAX_VALUE;
};

const recommendationAgent = async (products) => {
  if (!products || products.length === 0) {
    return {
      best_overall: {
        title: "No Products Found",
        price: "-",
        explanation: "No products available.",
      },
      best_budget: {
        title: "No Products Found",
        price: "-",
        explanation: "No products available.",
      },
      premium_choice: {
        title: "No Products Found",
        price: "-",
        explanation: "No products available.",
      },
    };
  }

  // Highest Rated Product
  // Highest Rated Product
  const bestOverall = [...products].sort(
    (a, b) => (b.rating || 0) - (a.rating || 0),
  )[0];

  // Lowest Price Product
  const bestBudget = [...products].sort(
    (a, b) => getPrice(a.price) - getPrice(b.price),
  )[0];

  // Highest Price Product
  const premiumChoice = [...products].sort(
    (a, b) => getPrice(b.price) - getPrice(a.price),
  )[0];

  return {
    best_overall: {
      title: bestOverall.title,
      price: bestOverall.price,
      link: bestOverall.link,
      explanation: "Highest rated product with strong customer reviews.",
    },

    best_budget: {
      title: bestBudget.title,
      price: bestBudget.price,
      link: bestBudget.link,
      explanation: "Lowest priced product among the available results.",
    },

    premium_choice: {
      title: premiumChoice.title,
      price: premiumChoice.price,
      link: premiumChoice.link,
      explanation: "Most premium and highest priced product in the results.",
    },
  };
};

module.exports = recommendationAgent;
