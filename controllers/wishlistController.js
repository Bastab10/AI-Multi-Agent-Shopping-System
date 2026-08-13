const Wishlist = require("../models/Wishlist");

exports.addToWishlist = async (req, res) => {
  try {
    const {
      productId,
      title,
      image,
      price,
      rating,
      reviews,
      link,
    } = req.body;

    
    const exists = await Wishlist.findOne({
      user: req.user._id,
      productId,
    });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Product already in wishlist",
      });
    }

    const wishlistItem = await Wishlist.create({
      user: req.user._id,
      productId,
      title,
      image,
      price,
      rating,
      reviews,
      link,
    });

    res.status(201).json({
      success: true,
      message: "Added to wishlist",
      data: wishlistItem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.find({
      user: req.user._id,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: wishlist.length,
      data: wishlist,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.removeWishlistItem = async (req, res) => {
  try {
    const item = await Wishlist.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Wishlist item not found",
      });
    }

    await Wishlist.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Wishlist item removed",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.clearWishlist = async (req, res) => {
  try {
    await Wishlist.deleteMany({
      user: req.user._id,
    });

    res.status(200).json({
      success: true,
      message: "Wishlist cleared",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};