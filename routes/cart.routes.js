const router = require("express").Router();
const Products = require("../models/Products.model");
const User = require("../models/User.model");
const Cart = require("../models/Cart.model");
const isAuthenticated = require("../middlewares/auth-middlewares");



router.get("/cartProducts", isAuthenticated, async (req, res, next) =>{

    
    try {
        
      const cartProducts =  await Cart.find()
      
        if(cartProducts !== undefined){
            res.status(404).json("No hay productos en el carrito")
        }else{
            res.status(200).json({cartProducts})
        }
        
    } catch (error) {
        next(error)
        
    }
})

router.post("/:addProductsCart", async (req, res, netx) =>{

    const { cartname, img, price } = req.body;
    

    


    try {

        // Verifica si tenemos productos

        const thereProducts = await Products.findOne({name})

        //verificar que todos los compos vienen de forma correcta

        const notEmpty = cartname !== "" && img !== "" && price !== "";

        //Veririfica que los productos estan en el carrito
      
        const isInCart = await Cart.findOne({cartname})

        // Verifica si no tenemos el producto
        if(thereProducts === null){
            res.status(400).json("Este producto no e encuentar en la base de datos")

            // Verificamos y agragamos el nuevo producto al carrito
        }else if (notEmpty !== isInCart){
            const newProductInCart = new Cart({ cartname, img, price, amount: 1});


            // Actualiza la propiedad Cart a true en nuestros products

            await Products.findByIdAndUpdate(
                isInCart?._id,
                { isInCart: true, name, img, price},
                { new: true }
            )

            newProductInCart.save();
            res.status(200).json("El producto ha sido añadido al carrito")

        }

        
    } catch (error) {
        next(error)
        
    }

})

//busca el producto en el car


module.exports = router;