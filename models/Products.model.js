const { Schema, model, mongoose } = require("mongoose");

const productsSchema = new Schema(
    {
      products:{
        name: String,
        description: String,
        productType: String,

      }










    }
);

const Products = model("Prodcuts", productsSchema)

module.exports = Products;