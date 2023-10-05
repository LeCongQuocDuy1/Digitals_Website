const User = require("../models/user");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const asyncHandler = require("express-async-handler");
const sendMail = require("../ultils/sendMail");
const {
    generateAccessToken,
    generateRefreshToken,
} = require("../middlewares/jwt");
const uniqid = require("uniqid");

const register = asyncHandler(async (req, res, next) => {
    const { email, password, firstname, lastname, mobile } = req.body;
    if (!email || !password || !firstname || !lastname || !mobile)
        return res.status(400).json({
            success: false,
            message: "Missing inputs",
        });

    const user = await User.findOne({ email });
    if (user) {
        throw new Error("User is already existed!");
    } else {
        const token = uniqid();
        const emailedited = btoa(email) + "@" + token;
        const newUser = await User.create({
            email: emailedited,
            password,
            firstname,
            lastname,
            mobile,
        });

        // res.cookie(
        //     "dataregister",
        //     { ...req.body, token },
        //     {
        //         httpOnly: true,
        //         maxAge: 15 * 60 * 1000,
        //     }
        // );

        // const html = `Please click on the link below to complete the account registration process. This link will expire 15 minutes from now. <br> <a href=${process.env.URL_SERVER}/api/v1/user/finalregister/${token}>Click here</a>`;

        if (newUser) {
            const html = `<h2>Register code:</h2><br /><blockquote>${token}</blockquote>`;
            await sendMail({
                email,
                html,
                subject:
                    "Confirm Account Registration Process of Digitals Website",
            });
        }

        setTimeout(async () => {
            await User.deleteOne({ email: emailedited });
        }, 300000);

        return res.json({
            success: true,
            message: newUser
                ? "Please check your email to activate your account"
                : "Something went wrong, please try again",
        });
    }
});

const finalRegister = asyncHandler(async (req, res) => {
    // const cookie = req.cookies;
    const { token } = req.params;

    const notActivedEmail = await User.findOne({
        email: new RegExp(`${token}$`),
    });
    if (notActivedEmail) {
        notActivedEmail.email = atob(notActivedEmail?.email?.split("@")[0]);
        notActivedEmail.save();
    }
    return res.json({
        success: notActivedEmail ? true : false,
        message: notActivedEmail
            ? "Register is successfully. You can go login."
            : "Something went wrong, please try again",
    });

    // if (!cookie || cookie?.dataregister?.token !== token) {
    //     res.clearCookie("dataregister");
    //     return res.redirect(`${process.env.URL_CLIENT}/finalregister/failed`);
    // }

    // const newUser = await User.create({
    //     email: cookie?.dataregister?.email,
    //     password: cookie?.dataregister?.password,
    //     mobile: cookie?.dataregister?.mobile,
    //     firstname: cookie?.dataregister?.firstname,
    //     lastname: cookie?.dataregister?.lastname,
    // });
    // res.clearCookie("dataregister");
    // if (newUser)
    //     return res.redirect(
    //         `${process.env.URL_CLIENT}/finalregister/successed`
    //     );
    // else return res.redirect(`${process.env.URL_CLIENT}/finalregister/failed`);
});

// Access Token => Xác thực và phân quyền người dùng
// Refresh Token => Tạo mới access token

const login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password)
        return res.status(400).json({
            success: false,
            message: "Missing inputs",
        });

    const response = await User.findOne({ email });
    if (response && (await response.isCorrectPassword(password))) {
        // Tách password và role ra khỏi responsive
        const { password, role, refreshToken, ...userData } =
            response.toObject();

        // Tạo accessToken
        const accessToken = generateAccessToken(response._id, role);

        // Tạo refreshToken
        const newRefreshToke = generateRefreshToken(response._id);

        // Lưu refreshToken vào database
        await User.findByIdAndUpdate(
            response._id,
            { newRefreshToke },
            { new: true }
        );

        // Lưu refreshToken vào cookie
        res.cookie("refreshToken", newRefreshToke, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({
            success: true,
            message: response
                ? "Login is successfully! Welcome to website"
                : "Email and password are not correct! Please try again!",
            accessToken,
            userData,
        });
    } else {
        throw new Error(
            "Email and password are not correct! Please try again!"
        );
    }
});

const getUser = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const user = await User.findById(_id).select(
        "-refreshToken -password -passwordChangeAt"
    );
    return res.status(200).json({
        success: user ? true : false,
        response: user ? user : "User not found",
    });
});

const getUsers = asyncHandler(async (req, res) => {
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

    // Filtering
    if (queries?.firstname)
        formatedQueries.firstname = {
            $regex: queries.firstname,
            $options: "i",
        };

    // Search query
    if (req.query.q) {
        delete formatedQueries.q;
        formatedQueries["$or"] = [
            {
                firstname: {
                    $regex: req.query.q,
                    $options: "i",
                },
            },
            {
                lastname: {
                    $regex: req.query.q,
                    $options: "i",
                },
            },
            {
                email: {
                    $regex: req.query.q,
                    $options: "i",
                },
            },
        ];
    }

    let queryCommand = User.find(formatedQueries);

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
        const counts = await User.find(formatedQueries).countDocuments();
        return res.status(200).json({
            counts,
            success: response ? true : false,
            users: response ? response : "User not found!",
        });
    });
});

const deleteUser = asyncHandler(async (req, res, next) => {
    const { _id } = req.query;
    if (!_id) throw new Error("Can't find this user. Please try again");
    const response = await User.findByIdAndDelete(_id);
    return res.status(200).json({
        success: response ? true : false,
        deletedUser: response ? "User deleted successfully" : "User not found",
    });
});

const updateUser = asyncHandler(async (req, res, next) => {
    const { _id } = req.user;
    if (!_id || Object.keys(req.body).length === 0)
        throw new Error("Can't find this user. Please try again");
    const response = await User.findByIdAndUpdate(_id, req.body, {
        new: true,
    }).select("-refreshToken -password -role -passwordChangeAt");
    return res.status(200).json({
        success: response ? true : false,
        updatedUser: response ? response : "User not found",
    });
});

const updateUserByAdmin = asyncHandler(async (req, res, next) => {
    const { uid } = req.params;
    if (Object.keys(req.body).length === 0)
        throw new Error("Can't find this user. Please try again");
    const response = await User.findByIdAndUpdate(uid, req.body, {
        new: true,
    }).select("-refreshToken -password -role -passwordChangeAt");
    return res.status(200).json({
        success: response ? true : false,
        updatedUser: response ? response : "User not found",
    });
});

const refreshAccessToken = asyncHandler(async (req, res) => {
    // Lấy refresh token từ cookie
    const cookie = req.cookies;

    // check có token hay không
    if (!cookie && !cookie.refreshToken)
        throw new Error("No refresh token in cookies");

    // check token có hợp lệ không
    const rs = jwt.verify(cookie.refreshToken, process.env.JWT_SECRET);

    // check token có khớp với token trong db không
    const response = await User.findOne({
        _id: rs._id,
        refreshToken: cookie.refreshToken,
    });
    return res.status(200).json({
        success: response ? true : false,
        newAccessToken: response
            ? generateAccessToken(response._id, response.role)
            : "Refresh token not matching",
    });
});

const logout = asyncHandler(async (req, res) => {
    // Lấy refresh token từ cookie
    const cookie = req.cookies;

    // check có token hay không
    if (!cookie && !cookie.refreshToken)
        throw new Error("No refresh token in cookies");

    // Xóa refresh token ở db
    await User.findOneAndUpdate(
        { refreshToken: cookie.refreshToken },
        { refreshToken: "" },
        { new: true }
    );

    // xóa refresh token ở cookie trình duyệt
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
    });

    return res.status(200).json({
        success: true,
        message: "Logout is done",
    });
});

// Client gửi yêu cầu thay đổi mật khẩu
// Server check yêu cầu có hợp lệ hay không
// Server gửi mail + kèm theo link để thay đổi mật khẩu
// Client check mail, thay đổi mật khẩu và gửi api + token lên server
// Server dựa vào api đó, check token đó có trùng khớp với token đã gửi trong mail hay không
// Server thay đổi mật khẩu
const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;
    if (!email) throw new Error("Missing email!");
    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found!");
    const resetToken = user.createPasswordChangedToken();
    await user.save();

    const html = `Please click the link below to change your password. It link will expired after 15 minutes right now. <br> <a href=${process.env.URL_CLIENT}/reset-password/${resetToken}>Click here</a>`;

    const data = {
        email,
        html,
        subject: "Forgot Password",
    };

    const rs = await sendMail(data);
    return res.status(200).json({
        success: rs.response?.includes("OK") ? true : false,
        message: rs.response?.includes("OK")
            ? "Please check your email to reset password your account"
            : "Something went wrong! Try again later",
    });
});

const resetPassword = asyncHandler(async (req, res) => {
    const { password, token } = req.body;
    if (!password || !token) throw new Error("Missing inputs");
    const passwordResetToken = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");
    const user = await User.findOne({
        passwordResetToken,
        passwordResetExpires: { $gt: Date.now() },
    });
    if (!user) throw new Error("Invalid reset token");
    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordChangeAt = Date.now();
    user.passwordResetExpires = undefined;
    await user.save();
    return res.status(200).json({
        success: user ? true : false,
        message: user
            ? "Updated password successfully"
            : "Something went wrong",
    });
});

const updateAddressUser = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    if (!req.body.address) throw new Error("Missing address");
    const response = await User.findByIdAndUpdate(
        _id,
        { $push: { address: req.body.address } },
        { new: true }
    );
    return res.status(200).json({
        success: response ? true : false,
        message: response ? response : "Something went wrong",
    });
});

const updateCart = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { pid, quantity, color } = req.body;
    if (!pid || !quantity || !color) throw new Error("Missing inputs");

    const user = await User.findById(_id).select("cart");
    const alreadyProduct = user?.cart.find(
        (item) => item.product.toString() === pid
    );

    if (alreadyProduct) {
        if (alreadyProduct.color === color) {
            const response = await User.updateOne(
                { cart: { $elemMatch: alreadyProduct } },
                { $set: { "cart.$.quantity": quantity } },
                { new: true }
            );
            return res.status(200).json({
                success: response ? true : false,
                message: response ? response : "Something went wrong",
            });
        } else {
            const response = await User.findByIdAndUpdate(
                _id,
                { $push: { cart: { product: pid, quantity, color } } },
                { new: true }
            );
            return res.status(200).json({
                success: response ? true : false,
                message: response ? response : "Something went wrong",
            });
        }
    } else {
        const response = await User.findByIdAndUpdate(
            _id,
            { $push: { cart: { product: pid, quantity, color } } },
            { new: true }
        );
        return res.status(200).json({
            success: response ? true : false,
            message: response ? response : "Something went wrong",
        });
    }
});

module.exports = {
    register,
    login,
    getUser,
    refreshAccessToken,
    logout,
    forgotPassword,
    resetPassword,
    getUsers,
    deleteUser,
    updateUser,
    updateUserByAdmin,
    updateAddressUser,
    updateCart,
    finalRegister,
};
