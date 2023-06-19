const Coupon = require("../models/coupon");
const asyncHandler = require("express-async-handler");

const createCoupon = asyncHandler(async (req, res) => {
    const { name, discount, expiry } = req.body;
    if (!name || !discount || !expiry)
        throw new Error("Please fill in the coupon information!");

    const response = await Coupon.create({
        ...req.body,
        expiry: Date.now() + +expiry * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({
        success: response ? true : false,
        createdCoupon: response ? response : "Can't create new Coupon",
    });
});

const getCoupon = asyncHandler(async (req, res) => {
    const { cp } = req.params;
    const response = await Coupon.findById(cp);
    return res.status(200).json({
        success: response ? true : false,
        coupon: response ? response : "Can't get Coupon",
    });
});

const getCoupons = asyncHandler(async (req, res) => {
    const response = await Coupon.find();
    return res.status(200).json({
        success: response ? true : false,
        coupons: response ? response : "Can't get all Coupon",
    });
});

const updateCoupon = asyncHandler(async (req, res) => {
    const { cp } = req.params;
    if (req.body.expiry)
        req.body.expiry = Date.now() + +req.body.expiry * 24 * 60 * 60 * 1000;
    const response = await Coupon.findByIdAndUpdate(cp, req.body, {
        new: true,
    });
    return res.status(200).json({
        success: response ? true : false,
        updatedCoupon: response ? response : "Can't update this Coupon",
    });
});

const deleteCoupon = asyncHandler(async (req, res) => {
    const { cp } = req.params;
    const response = await Coupon.findByIdAndDelete(cp);
    return res.status(200).json({
        success: response ? true : false,
        deletedCoupon: response ? response : "Can't delete this Coupon",
    });
});

module.exports = {
    createCoupon,
    getCoupon,
    getCoupons,
    updateCoupon,
    deleteCoupon,
};
