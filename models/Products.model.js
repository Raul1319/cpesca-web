const { Schema, model, mongoose } = require("mongoose");

const productsSchema = new Schema(
    {
      products:{
        name: String,
        description: String,
        category: {
          type: String,
          enum: ["cañas", "anzuelos", "carretes", "vestuario"],
        },
        comments:[String],
        price:Number,
        image:String

      }










    }
);

const Products = model("Products", productsSchema)

module.exports = Products;