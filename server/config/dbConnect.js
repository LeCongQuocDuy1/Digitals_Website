const { default: mongoose } = require("mongoose");

const dbConnect = async () => {
    try {
        mongoose.set("strictQuery", false);
        const conn = await mongoose.connect(process.env.MONGO_URI);
        if (conn.connection.readyState === 1) {
            console.log("DB connection is successfully");
        } else {
            console.log("DB is connecting");
        }
    } catch (error) {
        console.log("DB connection is failed!");
        console.log(error);
    }
};

module.exports = dbConnect;
