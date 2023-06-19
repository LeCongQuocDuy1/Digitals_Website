const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var blogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        numberViews: {
            type: Number,
            default: 0,
        },
        likes: [
            {
                type: mongoose.Types.ObjectId,
                ref: "User",
            },
        ],
        dislikes: [
            {
                type: mongoose.Types.ObjectId,
                ref: "User",
            },
        ],
        images: {
            type: String,
            default:
                "https://img.freepik.com/premium-photo/modern-office-desk_71965-189.jpg?w=2000",
        },
        author: {
            type: String,
            default: "Admin",
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

//Export the model
module.exports = mongoose.model("Blog", blogSchema);
