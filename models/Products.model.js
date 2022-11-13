const { Schema, model, mongoose } = require("mongoose");
const router = express.Router();

const productsSchema = new Schema(
    {
      products:{
        name: String,
        description: String,
        productType: String,
        comments:[String]

      }










    }
);

const Products = model("Products", productsSchema)

module.exports = Products;