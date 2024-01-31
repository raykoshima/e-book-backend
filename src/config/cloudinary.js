const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "daqhiutvb",
  api_key: "452143197421877",
  api_secret: process.env.CLOUDINARY_SECRET,
});

module.exports = cloudinary;
