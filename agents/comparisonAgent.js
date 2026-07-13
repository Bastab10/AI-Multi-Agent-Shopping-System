const comparisonAgent = (products) => {

    return [...products].sort((a, b) => {

        const ratingA = Number(a.rating) || 0;
        const ratingB = Number(b.rating) || 0;

        if (ratingB !== ratingA) {
            return ratingB - ratingA;
        }

        const reviewsA = Number(a.reviews) || 0;
        const reviewsB = Number(b.reviews) || 0;

        return reviewsB - reviewsA;

    });

};

module.exports = comparisonAgent;