const Order = require("../models/order");
const User = require("../models/user");
const Coupon = require("../models/coupon");
const asyncHandler = require("express-async-handler");

const createOrder = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { coupon } = req.body;
    const userCart = await User.findById(_id)
        .select("cart")
        .populate("cart.product", "title price");

    const products = userCart?.cart?.map((item) => ({
        product: item.product._id,
        count: item.quantity,
        color: item.color,
    }));

    // Tính tổng tiền của đơn hàng
    let total = userCart?.cart?.reduce(
        (sum, item) => item.product.price * item.quantity + sum,
        0
    );

    const createData = { products, total, orderBy: _id };

    if (coupon) {
        const selectedCoupon = await Coupon.findById(coupon);
        total =
            Math.round((total * (1 - +selectedCoupon?.discount / 100)) / 1000) *
                1000 || total;
        createData.total = total;
        createData.coupon = coupon;
    }

    const result = await Order.create(createData);
    return res.status(200).json({
        success: result ? true : false,
        result: result ? result : "Can't create new Order",
    });
});

const updateStatusOrder = asyncHandler(async (req, res) => {
    const { oid } = req.params;
    const { status } = req.body;
    if (!status) throw new Error("Missing status");
    const response = await Order.findByIdAndUpdate(
        oid,
        { status },
        { new: true }
    );
    return res.status(200).json({
        success: response ? true : false,
        response: response ? response : "Can't update status Order",
    });
});

const getOrdersByAdmin = asyncHandler(async (req, res) => {
    const response = await Order.find();
    return res.status(200).json({
        success: response ? true : false,
        response: response ? response : "Can't get all Order",
    });
});

const getOrderByUser = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const response = await Order.find({ orderBy: _id });
    return res.status(200).json({
        success: response ? true : false,
        response: response ? response : "Can't get Order",
    });
});

module.exports = {
    createOrder,
    updateStatusOrder,
    getOrdersByAdmin,
    getOrderByUser,
};
