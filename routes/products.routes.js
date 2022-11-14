const Products = require("../models/Products.model");
const router = require("express").Router();

router.get("/products",  (req, res, next) => {
     ({ category:["cañas", "anzuelos", "carretes", "vestuario"]})
     res.status(200).json("Lista de productos")
    });



router.post("/products", async (req,res,netx) =>{

    const { name, description, category,  comments, price, image } = req.body

    try {

        const newProduct={
            name: name,
            description:description,
            category: category,
            price:price,
            image:image
        }

        await Products.create(newProduct)

        res.status(201).json("Producto creado en la base de datos")
        return;
        
    } catch (error) {
        netx(error)
        
    }
})
   //lista de productos por categorias
router.get("/:list", async (req, res, next) =>{
    const { category } = req.params

   
     
    try {
     await Products.findOne(category)
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