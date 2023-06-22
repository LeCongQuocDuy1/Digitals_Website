const Product = require("../models/product");
const Category = require("../models/productCategory");
const asyncHandler = require("express-async-handler");
const data = require("../data/ecommerce.json");
const categoryData = require("../data/data");
const slugify = require("slugify");

const fn = async (product) => {
    await Product.create({
        title: product?.name,
        slug: slugify(product?.name) + Math.round(Math.random() * 300) + "",
        description: product?.description,
        brand: product?.brand,
        price: Math.round(Number(product?.price?.match(/\d/g).join("")) / 100),
        category: product?.category[1],
        quantity: Math.round(Math.random() * 1000),
        sold: Math.round(Math.random() * 100),
        thumb: product?.image,
        images: product?.thumbnails,
        color: product?.variants?.find((el) => el.label === "Color")
            ?.variants[0],
        totalRatings: Math.round(Math.random() * 5),
    });
};

const fn2 = async (category) => {
    await Category.create({
        title: category?.cate,
        brand: category?.brand,
        image: category?.image,
    });
};

const insertDataProduct = asyncHandler(async (req, res) => {
    const promises = [];
    for (let product of data) promises.push(fn(product));
    await Promise.all(promises);

    return res.json("Insert data all product successfully");
});

const insertDataCategory = asyncHandler(async (req, res) => {
    const promises = [];
    for (let category of categoryData) promises.push(fn2(category));
    await Promise.all(promises);

    return res.json("Insert data all category successfully");
});

module.exports = {
    insertDataProduct,
    insertDataCategory,
};
