const Products = require("../models/Products.model");
const router = express.Router();
const isAuthenticated = require("../middlewares/auth-middlewares");

router.get("/products",  (req, res, next) => {
     ({ productType:["cañas", "anzuelos", "carretes", "vestuario"]})
     res.status(200).json("Lista de productos")
    });



router.post("/products", async (req,res,netx) =>{

    const { name, description, productType, comments } = req.body

    try {

        const newProduct={
            name: name,
            description:description,
            productType:productType
        }

        await Products.create(newProduct)

        res.status(201).json("Producto creado en la base de datos")
        return;
        
    } catch (error) {
        netx(error)
        
    }
})
  