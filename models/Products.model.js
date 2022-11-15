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
        comments: [{
          type: mongoose.Schema.Types.ObjectId,
          ref:"Products"
        }],
        price:Number,
        image:String,
        inCart:{
          type: Boolean,
          default: false,
        },
        username: [{
          type: mongoose.Schema.Types.ObjectId,
          ref:"User"
        }],

        cartname: [{
          type: mongoose.Schema.Types.ObjectId,
          ref:"Cart"
        }],

      }










    }
);

const Products = model("Products", productsSchema)

module.exports = Products;