const { Schema, model, mongoose, } = require("mongoose");

const cartSchema = new Schema (

    {
      cartname:{
       type: String,
       require: true,
       unique: true
       },
       
        img:{
       type: String,
       require: true
      },

      amount:{
       type: Number,
       require: true
      },
      
      price:{
       type: Number,
       require: true,

      },

      username: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
      }],

      products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Products"
      }],
      
      






    }
);

const Cart = model("Cart", cartSchema);

module.exports = Cart;