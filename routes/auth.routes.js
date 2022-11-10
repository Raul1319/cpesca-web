const User = require("../models/User.model");
const bcrypt = require('bcryptjs');
const router = require("express").Router();


// Rutas de autenticación


//POST "/api/auth/signup" Ruta de registro
router.post("/signup", async (req, res, next) =>{
    const { username, email, password } = req.body

   // Validaciones de backend
     if(!email || !password || !username ) {
        res.status(400).json({errorMessage: "Debes rellenar todos los campos"})
        return;
    }
    

    // Fuerza de la contraseña

    const passwordValidation = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm
    if(passwordValidation.test(password)=== false){
        res.status(412).json({errorMessage: "La contarseña debe contener minimo 8 caracteres, una mayuscula y minusculas"})
        return;
    }

    // Validacion de email
    const emailValidation = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g
    if(emailValidation.test(email)=== false){
        res.status(412).json({errorMessage: "El formato de email no esta correcto"})
        return;
    }

    // Validacion que el usuario  e email único
    try {

        const foundUser = await User.findOne({username:username})
        if(foundUser !== null) {
            res.status(203).json({errorMessage: "Este nombre ya existe"})
            return;
        }

        const foundEmail = await User.findOne({email:email})
        if(foundEmail !== null) {
            res.status(203).json({errorMessage: "Este email ya esta en uso"})
            return;
        }

        // Cifrado contraseña
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)

    // Crear el usuario
        const newUser ={
            username: username,
            email: email,
            password: hashPassword
        }


        await User.create(newUser)

        // Enviar mensaje al FE

        res.status(201).json("Usuario registrado con exito")
        
    } catch (error) {
        next(error)
        
    }


})
//POST "/api/auth/login"
router.post("/login", async (req, res, next) =>{

    

})
//GET "/api/auth/verification"


module.exports = router;