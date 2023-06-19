const Blog = require("../models/blog");
const asyncHandler = require("express-async-handler");

const createBlog = asyncHandler(async (req, res) => {
    const { title, description, category } = req.body;
    if (!title || !description || !category) throw new Error("Missing inputs");
    const response = await Blog.create(req.body);

    return res.status(200).json({
        success: response ? true : false,
        createdBlog: response ? response : "Can't create new blog",
    });
});

const getBlogs = asyncHandler(async (req, res) => {
    const response = await Blog.find();

    return res.status(200).json({
        success: response ? true : false,
        blogs: response ? response : "Can't get all blog",
    });
});

const getBlog = asyncHandler(async (req, res) => {
    const { bid } = req.params;
    const response = await Blog.findByIdAndUpdate(
        bid,
        { $inc: { numberViews: 1 } },
        { new: true }
    )
        .populate("likes", "firstname lastname")
        .populate("dislikes", "firstname lastname");

    return res.status(200).json({
        success: response ? true : false,
        blog: response ? response : "Can't get blog",
    });
});

const updateBlog = asyncHandler(async (req, res) => {
    const { bid } = req.params;
    if (Object.keys(req.body).length === 0) throw new Error("Missing inputs");
    const response = await Blog.findByIdAndUpdate(bid, req.body, { new: true });

    return res.status(200).json({
        success: response ? true : false,
        updatedBlog: response ? response : "Can't update this blog",
    });
});

const deleteBlog = asyncHandler(async (req, res) => {
    const { bid } = req.params;
    const response = await Blog.findByIdAndDelete(bid);
    return res.status(200).json({
        success: response ? true : false,
        deletedProduct: response ? response : "Can't delete this blog",
    });
});

// Khi người dùng like một bài blog thì:
// đã dislike => bỏ dislike
// đã like => bỏ like / thêm like
const likeBlog = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { bid } = req.params;

    if (!bid) throw new Error("Missing inputs");
    const blog = await Blog.findById(bid);
    const alreadyDisliked = blog?.dislikes?.find(
        (item) => item.toString() === _id
    );
    if (alreadyDisliked) {
        const response = await Blog.findByIdAndUpdate(
            bid,
            { $pull: { dislikes: _id } },
            { new: true }
        );
        return res.json({
            success: response ? true : false,
            rs: response,
        });
    }

    const isLiked = blog?.likes?.find((item) => item.toString() === _id);
    if (isLiked) {
        const response = await Blog.findByIdAndUpdate(
            bid,
            { $pull: { likes: _id } },
            { new: true }
        );
        return res.status(200).json({
            success: response ? true : false,
            res: response,
        });
    } else {
        const response = await Blog.findByIdAndUpdate(
            bid,
            { $push: { likes: _id } },
            { new: true }
        );
        return res.status(200).json({
            success: response ? true : false,
            res: response,
        });
    }
});

const dislikeBlog = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { bid } = req.params;

    if (!bid) throw new Error("Missing inputs");
    const blog = await Blog.findById(bid);
    const alreadyLiked = blog?.likes?.find((item) => item.toString() === _id);
    if (alreadyLiked) {
        const response = await Blog.findByIdAndUpdate(
            bid,
            { $pull: { likes: _id } },
            { new: true }
        );
        return res.json({
            success: response ? true : false,
            rs: response,
        });
    }

    const isDisLiked = blog?.dislikes?.find((item) => item.toString() === _id);
    if (isDisLiked) {
        const response = await Blog.findByIdAndUpdate(
            bid,
            { $pull: { dislikes: _id } },
            { new: true }
        );
        return res.status(200).json({
            success: response ? true : false,
            res: response,
        });
    } else {
        const response = await Blog.findByIdAndUpdate(
            bid,
            { $push: { dislikes: _id } },
            { new: true }
        );
        return res.status(200).json({
            success: response ? true : false,
            res: response,
        });
    }
});

const uploadImagesBlog = asyncHandler(async (req, res) => {
    const { bid } = req.params;
    if (!req.file) throw new Error("Missing inputs");

    const response = await Blog.findByIdAndUpdate(
        bid,
        { images: req.file.path },
        { new: true }
    );

    return res.status(200).json({
        status: response ? true : false,
        response: response ? response : "Can't upload image of blog!",
    });
});

module.exports = {
    createBlog,
    updateBlog,
    deleteBlog,
    getBlogs,
    getBlog,
    likeBlog,
    dislikeBlog,
    uploadImagesBlog,
};
