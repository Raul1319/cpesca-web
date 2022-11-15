const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});




const authRoutes = require("./auth.routes");
router.use("/auth", authRoutes);

const productsRoutes = require("./products.routes");
router.use("/products", productsRoutes); //productos  para pesca

const profileRoutes = require("./profile.routes");
router.use("/profile", profileRoutes);

const commentsRoutes = require("./comments.routes");
router.use("/comments", commentsRoutes);

const cartRoutes = require("./cart.routes");
router.use("/cart", cartRoutes)




module.exports = router;
