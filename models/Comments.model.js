const { Schema, model, mongoose } = require("mongoose");



const commentsSchema = new Schema(

    {

        comments: [String],
        products: [{
            type: mongoose.Schema.Types.ObjectId,
            ref:"Products"
          }],
          username: [{
            type: mongoose.Schema.Types.ObjectId,
            ref:"User"
          }],
    }




)

const Comments = model("Comments", commentsSchema);

module.exports = Comments;




