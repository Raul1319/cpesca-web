const { Schema, model, mongoose } = require("mongoose");



const commentsSchema = new Schema(

    {

        comments:{
          type: String,

        },
        products: {
            type: Schema.Types.ObjectId,
            ref:"Products"
          },
          username: {
            type: Schema.Types.ObjectId,
            ref:"User"
          },
    }




)

const Comments = model("Comments", commentsSchema);

module.exports = Comments;




