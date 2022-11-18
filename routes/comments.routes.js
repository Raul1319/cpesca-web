const router = require("express").Router();
const User = require("../models/User.model");
const Products = require("../models/Products.model");
const isAuthenticated = require("../middlewares/auth-middlewares");
const Comments = require("../models/Comments.model");
const { request } = require("express");
const { response } = require("../app");



router.get("/productIdComments", isAuthenticated, async (req, res, next) => {
    const { productIdComments } = req.params;

    try {

      const response =  await Products.findById(productIdComments)
      console.log(response)
        res.status(200).json("Puedes ver los comentarios")


        
    } catch (error) {
        next()
        
    }

    
    
})

router.post("/createComments/:id", isAuthenticated, async (req, res, next) =>{
             
    const { products } = req.params.id
    const { comments } = req.body.comments
    const { username } = req.payload._id
   
  const newComments ={
      products : products,
      usename: username,
      comments: comments


  }

  try {

      await Comments.create(newComments)
      res.status(200).json("Comentario añadido")
      
  } catch (error) {
      next(error)
      
  }

  
})

router.patch("/:productId/comments",  async (req, res, next) =>{

    const { productId } = req.params;

    const { comments } = req.body.comments

    try {

        const response = await Products.findByIdAndUpdate(productId, {$push:{comments:productId}} )
        Products.findByIdAndUpdate(productId, response)
        res.status(201).json("Tu comentario ha sido creado y actualizado")
        
    } catch (error) {
        next(error)
    }


})

router.delete("/:deleteCommentId/", isAuthenticated, async (req, res, next) =>{
          
           const { deleteCommentId } = req.params


    try {

        const response = await Comments.findByIdAndDelete( deleteCommentId, response)
        
    } catch (error) {
        next(error)
        
    }
})




















module.exports = router;