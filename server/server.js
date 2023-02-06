const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./db/connectDB");
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});