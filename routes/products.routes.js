const Products = require("../models/Products.model");
const router = require("express").Router();
const Comments = require("../models/Comments.model");
const  isAuthenticated = require("../middlewares/auth-middlewares");





router.post("/:create/products", async (req,res,netx) =>{

    const { name, description, category,  comments, price, image } = req.body

    try {

        const newProduct={
            name: name,
            description:description,
            category: category,
            price:price,
            image:image,
            comments: comments
            
            
        }

        await Products.create(newProduct)

        res.status(201).json("Producto creado en la base de datos")
        return;
        
    } catch (error) {
        netx(error)
        
    }
})
   //lista de productos por categorias
router.get("/:productsId/list", async (req, res, next) =>{
    const { productsId } = req.params

   
     
    try {
     await Products.findById(productsId)
     res.status(200).json("aqui estan tus productos")
        
    } catch (error) {
        next(error)
        
    }
})

// Editar producto solo admin
router.patch("/:edit", async (req, res, next) =>{
    const { products } = req.params

    try {
        await Products.findByIdAndUpdate(products)
        res.status(200).json("Tu producto ha sido editado")
    } catch (error) {
        next(error)
        
    }
})

router.delete("/:deleteProductsId", async (req, res, next) =>{
    const { deleteProductsId } = req.params

    try {
        await Products.findByIdAndDelete(deleteProductsId)
        res.status(202).json("Tu producto ha sido eliminado")
    } catch (error) {
        next(error)
        
    }

})
  

module.exports = router;