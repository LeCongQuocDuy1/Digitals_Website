const ProductCategory = require("../models/productCategory");
const asyncHandler = require("express-async-handler");

const createProductCategory = asyncHandler(async (req, res) => {
    if (Object.keys(req.body).length === 0)
        throw new Error("Please fill in the productCategory information!");

    const response = await ProductCategory.create(req.body);
    return res.status(200).json({
        success: response ? true : false,
        createdProductCategory: response
            ? response
            : "Can't create new ProductCategory",
    });
});

const getProductCategory = asyncHandler(async (req, res) => {
    const { pcid } = req.params;
    const response = await ProductCategory.findById(pcid);
    return res.status(200).json({
        success: response ? true : false,
        productCategory: response ? response : "Can't get ProductCategory",
    });
});

const getProductCategories = asyncHandler(async (req, res) => {
    const response = await ProductCategory.find();
    return res.status(200).json({
        success: response ? true : false,
        productCategories: response
            ? response
            : "Can't get all ProductCategory",
    });
});

const updateProductCategory = asyncHandler(async (req, res) => {
    const { pcid } = req.params;
    const response = await ProductCategory.findByIdAndUpdate(pcid, req.body, {
        new: true,
    });
    return res.status(200).json({
        success: response ? true : false,
        updatedProductCategory: response
            ? response
            : "Can't update this ProductCategory",
    });
});

const deleteProductCategory = asyncHandler(async (req, res) => {
    const { pcid } = req.params;
    const response = await ProductCategory.findByIdAndDelete(pcid);
    return res.status(200).json({
        success: response ? true : false,
        deletedProductCategory: response
            ? response
            : "Can't delete this ProductCategory",
    });
});

module.exports = {
    createProductCategory,
    getProductCategory,
    getProductCategories,
    updateProductCategory,
    deleteProductCategory,
};
