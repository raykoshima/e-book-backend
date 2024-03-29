require('dotenv').config()
const express = require("express");
const app = express();
const cors = require("cors");

const errorHandler = require("./middlewares/error");
const notFoundHandler = require("./middlewares/notFound");

const authRoute = require("./routes/auth-route")
const productRoute = require("./routes/product-route")
const topupRoute = require("./routes/topup-route")
const adminRoute = require("./routes/admin-route")
const cartRoute = require("./routes/cart-route")
const userOrder = require("./routes/user-order-route")

app.use(cors())
app.use(express.json());

// app.use("/product",(req,res,next)=>{
//   res.json({message:"use product"})
// })
app.use("/auth",authRoute)
app.use("/product",productRoute)
app.use("/cart",cartRoute)
app.use("/topup",topupRoute)
app.use("/backend",adminRoute)
app.use("/user/order",userOrder)

app.use(errorHandler);
app.use("*", notFoundHandler);
const port = process.env.PORT
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

  