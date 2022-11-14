const router = require("express").Router();
const User = require("../models/User.model");
const isAuthenticated = require("../middlewares/auth-middlewares");



router.get("/:productId/comments", (req, res, next) => {
    const { productId } = req.params;

    try {
        res.status().json(productId)


        
    } catch (error) {
        next(error)
        
    }
    
})




















module.exports = router;