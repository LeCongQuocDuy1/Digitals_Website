const express = require("express");
require("dotenv").config();
const dbConnect = require("./config/dbConnect");
const cookieParser = require("cookie-parser");
const initRoutes = require("./routes/");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 7777;

app.use(
    cors({
        origin: process.env.URL_CLIENT,
        methods: ["GET", "POST", "PUT", "DELETE"],
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

dbConnect();
initRoutes(app);

app.listen(port, () => {
    console.log("Server running on the port " + port);
});
