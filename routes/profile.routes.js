const router = require("express").Router();
const User = require("../models/User.model");
const isAuthenticated = require("../middlewares/auth-middlewares");

router.get("/profile", isAuthenticated, async (req, res, next) =>{
    

    try {
        const response = await User.findById(req.payload._id);
        res.status(200).json(response)
        
      
        
    } catch (error) {
        next()
        
    }
})

router.patch("/:profileId/edit",  async(req, res, next)=>{
    const { profileId } = req.params // recibe el id del cliente a editar
    const { username, email, password } = req.body  //recibe lo que el cliente desea editar

    
    const userToEdit = {
        username,
        email,
        password
      }

    try {

        await  User.findByIdAndUpdate(profileId, userToEdit)
        res.status(201).json("Tu perfil ha sido actualizado")
        
    } catch (error) {
        next(error)
        
    }

})

router.delete("/:userId/delete", async (req, res, next) =>{

    const { userId } = req.params

    try {

        await User.findByIdAndDelete(userId)
        res.status(202).json("Tu perfil ha sido Eliminado")

        
    } catch (error) {
        next(error)
        
    }

})




module.exports = router;