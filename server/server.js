const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./db/connectDB");
const app = express();
const PORT = process.env.PORT;

//import routes
const userRoutes = require("./routes/user");

app.use(express.json());
app.use(cors());

//define routes
app.use("/api/user", userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});