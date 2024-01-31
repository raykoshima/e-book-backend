require('dotenv').config()
const express = require("express");
const app = express();
const cors = require("cors");

const errorHandler = require("./middlewares/error");
const notFoundHandler = require("./middlewares/notFound");

const productRoute = require("./routes/product-route")

app.use(cors())
app.use(express.json());

// app.use("/product",(req,res,next)=>{
//   res.json({message:"use product"})
// })
app.use("/product",productRoute)


app.use(errorHandler);
app.use("*", notFoundHandler);
const port = process.env.PORT
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

  