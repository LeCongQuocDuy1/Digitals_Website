const Brand = require("../models/brand");
const asyncHandler = require("express-async-handler");

const createBrand = asyncHandler(async (req, res) => {
    if (Object.keys(req.body).length === 0)
        throw new Error("Please fill in the brand information!");

    const response = await Brand.create(req.body);
    return res.status(200).json({
        success: response ? true : false,
        createdBrand: response ? response : "Can't create new Brand",
    });
});

const getBrand = asyncHandler(async (req, res) => {
    const { br } = req.params;
    const response = await Brand.findById(br);
    return res.status(200).json({
        success: response ? true : false,
        brand: response ? response : "Can't get Brand",
    });
});

const getBrands = asyncHandler(async (req, res) => {
    const response = await Brand.find().select("title _id");
    return res.status(200).json({
        success: response ? true : false,
        brands: response ? response : "Can't get all Brand",
    });
});

const updateBrand = asyncHandler(async (req, res) => {
    const { br } = req.params;
    const response = await Brand.findByIdAndUpdate(br, req.body, {
        new: true,
    });
    return res.status(200).json({
        success: response ? true : false,
        updatedBrand: response ? response : "Can't update this Brand",
    });
});

const deleteBrand = asyncHandler(async (req, res) => {
    const { br } = req.params;
    const response = await Brand.findByIdAndDelete(br);
    return res.status(200).json({
        success: response ? true : false,
        deletedBrand: response ? response : "Can't delete this Brand",
    });
});

module.exports = {
    createBrand,
    getBrand,
    getBrands,
    updateBrand,
    deleteBrand,
};
