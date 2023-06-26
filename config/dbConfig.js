const environment = process.env.ENVIRONMENT || "development";
const config = require("../knexfile.js")[environment];
module.exports = require("knex")(config);


//   // cloudinary configuration
//   cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUDNAME,
//     api_key: process.env.CLOUDINARY_KEY,
//     api_secret: process.env.CLOUDINARY_SECRET
//   });