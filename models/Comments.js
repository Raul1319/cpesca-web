const { Schema, model, mongoose } = require("mongoose");



const commentsSchema = new Schema(

    {
        comments: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Products"
        }
    }



)

const Comments = model("Comments", commentsSchema);

module.exports = Comments;




