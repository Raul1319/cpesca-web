const { Schema, model, mongoose, trusted } = require("mongoose");

const cartSchema = new Schema (

    {
      name:{
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
       require: true

      }





    }
);

const Cart = model("Cart", cartSchema);

module.exports = Cart;