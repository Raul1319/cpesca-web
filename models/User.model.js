const { Schema, model, default: mongoose } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(


  {

    username: {
      name: String,
      lastname: String,
      type: String,
      trim: true,
      required: false,
      unique: true,



    },

    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Password is required.']
    },

    inCart:{
      type: Boolean,
      default: false,
    },
    
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
      comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
      }],

      products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
      }],

      comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Comments"
      }],

      cartname: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Cart"
      }],

    }

  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;
