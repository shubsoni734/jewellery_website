const express = require("express");
const dotenv = require("dotenv");
const dbconnect = require("./config/dbconnection");
const app = express();
const route = require("./routes/authRoute");
const cors = require("cors");
const categoryRoutes = require("./routes/categoryRoutes");

app.use(cors());
// this package is use for show the th api
const morgan = require("morgan");

// this ths accept json format input
app.use(express.json());

// ths model is use for indicate the api
app.use(morgan("dev"));

// this is config the env file
dotenv.config();

app.use("/api/v1/auth", route);

app.use("/api/v1/category", categoryRoutes);

// calling the databae collection
dbconnect();
// create server
app.get("/", (req, res) => {
  res.send("server is running");
});

// transfer port value from env file
const port = process.env.port || 8080;
// calling server
app.listen(port);
