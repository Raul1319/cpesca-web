const router = require("express").Router();
const User = require("../models/User.model");
const Products = require("../models/Products.model");
const isAuthenticated = require("../middlewares/auth-middlewares");
const Comments = require("../models/Comments.model")



router.get("/:productIdComments", isAuthenticated, async (req, res, next) => {
    const { productIdComments } = req.params;

    try {

      const response =  await Products.findById(productIdComments)
      console.log(response)
        res.status(200).json("Puedes ver los comentarios")


        
    } catch (error) {
        next()
        
    }
    
})

router.post("/:productId/comments",  async (req, res, next) =>{

    const { productId } = req.params

    const { comments } = req.body

    try {

        const response = await Products.findByIdAndUpdate(productId, {$push:{comments:productId}} )
        Products.findByIdAndUpdate(productId, response)
        res.status(201).json("Tu comentario ha sido creado y actulizado")
        
    } catch (error) {
        next(error)
    }


})




















module.exports = router;