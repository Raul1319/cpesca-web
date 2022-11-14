const router = require("express").Router();
const User = require("../models/User.model");
const Products = require("../models/Products.model");
const isAuthenticated = require("../middlewares/auth-middlewares");



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

router.patch("/:productId/comments",  async (req, res, next) =>{

    const { productId } = req.params

    const { comments } = req.body

    try {

        const response = await Products.findById(productId)
        response.comments.push(comments);
        Products.findByIdAndUpdate(productId, response)
        res.status(201).json("Tu comentario ha sido creado y actulizado")
        
    } catch (error) {
        next(error)
    }


})




















module.exports = router;