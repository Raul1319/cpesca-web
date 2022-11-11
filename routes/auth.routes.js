const User = require("../models/User.model");
const bcrypt = require('bcryptjs');
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const isAuthenticated = require("../middlewares/auth-middlewares");


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
        return;
        
    } catch (error) {
        next(error)
        
    }


})
//POST "/api/auth/login"
router.post("/login", async (req, res, next) =>{

    const { username, email, password } = req.body

    // Validaciones de backend

    //Todos los campos requeridos llenos
    if(!email || !password || !username ) {
        res.status(400).json({errorMessage: "Debes rellenar todos los campos"})
        return;
    }

    try {

        // Usuario existe
        const foundUser = await User.findOne({email:email})
        console.log(foundUser)
        if(foundUser === null) {
            res.status(400).json({errorMessage: "Credenciales no validas"})
            return;

        }
        

    //Contraseña correcta

    const passwordValid = await bcrypt.compare(password, foundUser.password)
    if(passwordValid === false) {
        res.status(400).json({errorMessage: "Credenciales no validas"})
            return;

    }

    // Sesión
    const payload ={
      _id: foundUser._id,
      email: foundUser.email,
      username: foundUser.username,
      role: foundUser.role,
      
    }

    const authToken = jwt.sign(
        payload,
        process.env.TOKEN_SECRET,
        { algorithm: "HS256", expiresIn: "4h"}
    )
        

    res.status(200).json({authToken: authToken})
    
    } catch (error) {
        next(error)
        
    }

})

router.get("/verify", isAuthenticated, (req, res, next) =>{
//GET "/api/auth/verification"


res.status(200).json({ user: req.payload})
return;
})



module.exports = router;