const Product = require("../models/product");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");

const createProduct = asyncHandler(async (req, res) => {
    const { title, price, description, brand, category, color } = req.body;
    const thumb = req?.files?.thumb[0]?.path;
    const images = req.files?.images.map((el) => el.path);
    if (!(title && price && description && brand && category && color))
        throw new Error("Missing inputs!");
    if (req.body && req.body.title) req.body.slug = slugify(req.body.title);
    if (thumb) req.body.thumb = thumb;
    if (images) req.body.images = images;
    const product = await Product.create(req.body);
    return res.status(200).json({
        success: product ? true : false,
        createdProduct: product ? product : "Can't create new product",
        message: product
            ? "Create a new product successfully!"
            : "Create a new product failed! Please try again :<",
    });
});

const getProduct = asyncHandler(async (req, res) => {
    const { pid } = req.params;
    const product = await Product.findById(pid).populate({
        path: "ratings",
        populate: {
            path: "postedBy",
            select: "firstname lastname avatar",
        },
    });
    return res.status(200).json({
        success: product ? true : false,
        product: product ? product : "Can't find product",
    });
});

const getProducts = asyncHandler(async (req, res) => {
    const queries = { ...req.query };

    // Tách và xóa các trường đặc biệt ra khỏi queries
    const excludeFields = ["limit", "page", "sort", "fields"];
    excludeFields.forEach((field) => delete queries[field]);

    // Format lại các operators cho đúng cú pháp của mongodb
    let queryString = JSON.stringify(queries);
    queryString = queryString.replace(
        /\b(gte|gt|lte|lt)\b/g,
        (match) => `$${match}`
    );
    const formatedQueries = JSON.parse(queryString);
    let colorQueryObject = {};

    // Filtering
    if (queries?.title)
        formatedQueries.title = { $regex: queries.title, $options: "i" };
    if (queries?.category)
        formatedQueries.category = { $regex: queries.category, $options: "i" };
    if (queries?.color) {
        delete formatedQueries.color;
        const colorArr = queries.color.split(",");
        const colorQueries = colorArr.map((item) => ({
            color: {
                $regex: item,
                $options: "i",
            },
        }));

        colorQueryObject = { $or: colorQueries };
    }
    const q = { ...colorQueryObject, ...formatedQueries };
    let queryCommand = Product.find(q);

    // Sorting
    if (req.query.sort) {
        const sortBy = req.query.sort.split(",").join(" ");
        queryCommand = queryCommand.sort(sortBy);
    }

    // Fields Limiting
    if (req.query.fields) {
        const fields = req.query.fields.split(",").join(" ");
        queryCommand = queryCommand.select(fields);
    }

    // Pagination

    // limit: Số phần tử một lần lấy
    // skip: bỏ qua phần tử
    // page: số trang
    const page = +req.query.page || 1;
    const limit = +req.query.limit || process.env.LIMIT_PRODUCTS;
    const skip = (page - 1) * limit;
    queryCommand.skip(skip).limit(limit);

    queryCommand.exec(async (err, response) => {
        if (err) throw new Error(err.message);
        const counts = await Product.find(q).countDocuments();
        return res.status(200).json({
            counts,
            success: response ? true : false,
            products: response ? response : "Product not found!",
        });
    });
});

const updateProduct = asyncHandler(async (req, res) => {
    const { pid } = req.params;
    if (req.body && req.body.title) req.body.slug = slugify(req.body.title);
    const updatedProduct = await Product.findByIdAndUpdate(pid, req.body, {
        new: true,
    });
    return res.status(200).json({
        success: updatedProduct ? true : false,
        updatedProduct: updatedProduct
            ? updatedProduct
            : "Can't update this product",
    });
});

const deleteProduct = asyncHandler(async (req, res) => {
    const { pid } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(pid);
    return res.status(200).json({
        success: deletedProduct ? true : false,
        deletedProduct: deletedProduct
            ? deletedProduct
            : "Can't delete this product",
    });
});

const ratings = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { star, comment, pid, updatedAt } = req.body;

    if (!star || !pid) throw new Error("Please rating this product!");
    const ratingProduct = await Product.findById(pid);

    // Kiểm tra xem người dùng đã đánh giá trước đó hay chưa
    const alreadyRating = ratingProduct?.ratings?.find(
        (item) => item.postedBy.toString() === _id
    );

    // Đã đánh giá trước đó
    if (alreadyRating) {
        await Product.updateOne(
            {
                ratings: {
                    $elemMatch: alreadyRating,
                },
            },
            {
                $set: {
                    "ratings.$.star": star,
                    "ratings.$.comment": comment,
                    "ratings.$.updatedAt": updatedAt,
                },
            },
            { new: true }
        );
    } else {
        // Chưa từng đánh giá
        await Product.findByIdAndUpdate(
            pid,
            {
                $push: {
                    ratings: {
                        star,
                        comment,
                        postedBy: _id,
                        updatedAt,
                    },
                },
            },
            { new: true }
        );
    }

    // Tính trung bình tổng ratings
    const updatedProduct = await Product.findById(pid);
    const ratingCount = updatedProduct?.ratings?.length;
    const averageRating =
        updatedProduct?.ratings?.reduce((acc, rating) => acc + rating.star, 0) /
        ratingCount;
    updatedProduct.totalRatings = Math.round(averageRating);

    return res.status(200).json({
        status: true,
    });
});

const uploadImagesProduct = asyncHandler(async (req, res) => {
    const { pid } = req.params;
    if (!req.files) throw new Error("Missing inputs");

    const response = await Product.findByIdAndUpdate(
        pid,
        { $push: { images: { $each: req.files.map((item) => item?.path) } } },
        { new: true }
    );

    return res.status(200).json({
        status: response ? true : false,
        response: response ? response : "Can't upload image of product!",
    });
});

module.exports = {
    createProduct,
    getProduct,
    getProducts,
    updateProduct,
    deleteProduct,
    ratings,
    uploadImagesProduct,
};
