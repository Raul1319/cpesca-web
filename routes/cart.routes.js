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

        await User.create(cartname)

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

//busca el producto en el carrito y actualizarlo

router.patch("/product-cart/:productId", async (req, res, next) =>{

    const { productId } = req.params;
    const { query } = req.query;
    const body = req.body;

    try {

        const productsSearch = await Cart.findById(productId);

        if(!query){
            res.status(404).json("Debes enviar algo");


            //si esta el producto en el carro y quiero agregar
        }else if (productsSearch && query === "add"){
            body.amount = body.amount +1;

            await Cart.findByIdAndUpdate(productId, body,{
                new: true
            }).then((product) =>{
                res.status(200).json(`El producto: ${product.name} fue actualiazado`)
            });

             // si el producto esta en el carrito y lo quiero sacar
        } else if(productsSearch && query === "del"){
            body.amount = body.amount -1;

            await Cart.findByIdAndUpdate(productId, body,{
                new:true,
            }).then((product) =>{
                res.status(200).json(`El producto ${product.name} fue actualizado`)
            }) 
        } 
        
    } catch (error) {
        next(error)
        
    }
})
//elimina producto del carrito
router.delete("/cartDelete/:productId", async (req, res, next) =>{
    const { productId } = req.params;
    
    try {
        
        const {name, image, price, _id} = await Products.findOne({
            name:newProductInCart.name,
        });
        
        // elimin producto por su id del cart
        await Products.findByIdAndDelete(productId);
        
        await Products.findByIdAndUpdate(
            _id,
            {inCart: false, name, img, price},
            {new: true}
            
        )
        res.status(400).json( "El producto ha sido eliminado del carrito")
        
    } catch (error) {
        next(error)
        
    }
    // busca producto en db por el nom que esta en el car
})

module.exports = router;