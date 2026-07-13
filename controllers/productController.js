const searchAgent = require("../agents/searchAgent");
const comparisonAgent = require("../agents/comparisonAgent");
const recommendationAgent = require("../agents/recommendationAgent");

exports.searchProducts = async (req, res) => {

    try{

        const result = await searchAgent(req.query.q);

        const compared = comparisonAgent(result.products);

        const recommendation = await recommendationAgent(compared);

        res.json({

            success:true,

            keyword:result.keyword,

            total:compared.length,

            recommendation,

            products:compared

        });

    }catch(error){

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};