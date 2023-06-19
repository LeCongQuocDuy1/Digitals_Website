const BlogCategory = require("../models/blogCategory");
const asyncHandler = require("express-async-handler");

const createBlogCategory = asyncHandler(async (req, res) => {
    if (Object.keys(req.body).length === 0)
        throw new Error("Please fill in the blogCategory information!");

    const response = await BlogCategory.create(req.body);
    return res.status(200).json({
        success: response ? true : false,
        createdBlogCategory: response
            ? response
            : "Can't create new BlogCategory",
    });
});

const getBlogCategory = asyncHandler(async (req, res) => {
    const { bcid } = req.params;
    const response = await BlogCategory.findById(bcid);
    return res.status(200).json({
        success: response ? true : false,
        blogCategory: response ? response : "Can't get BlogCategory",
    });
});

const getBlogCategories = asyncHandler(async (req, res) => {
    const response = await BlogCategory.find().select("title _id");
    return res.status(200).json({
        success: response ? true : false,
        blogCategories: response ? response : "Can't get all BlogCategory",
    });
});

const updateBlogCategory = asyncHandler(async (req, res) => {
    const { bcid } = req.params;
    const response = await BlogCategory.findByIdAndUpdate(bcid, req.body, {
        new: true,
    });
    return res.status(200).json({
        success: response ? true : false,
        updatedBlogCategory: response
            ? response
            : "Can't update this BlogCategory",
    });
});

const deleteBlogCategory = asyncHandler(async (req, res) => {
    const { bcid } = req.params;
    const response = await BlogCategory.findByIdAndDelete(bcid);
    return res.status(200).json({
        success: response ? true : false,
        deletedBlogCategory: response
            ? response
            : "Can't delete this BlogCategory",
    });
});

module.exports = {
    createBlogCategory,
    getBlogCategory,
    getBlogCategories,
    updateBlogCategory,
    deleteBlogCategory,
};
