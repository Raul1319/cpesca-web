const { expressjwt: jwt } = require("express-jwt");

const isAuthenticated = jwt({
   secret: process.env.TOKEN_SECRET,
   algorithms: ["HS256"],
   requestProperty: "payload",
   getToken: (req) =>{
    console.log (req.headers.authorization)
  //cuando no hay token
    if(req.headers === undefined || req.headers.authorization === undefined){
        return null;
    }
     

    const tokenArray = req.headers.authorization.split(" ")
    const tokenType = tokenArray[0]
    const token = tokenArray[1]

    if(tokenType !== "Bearer") {
        return  null;

    }
     return token
   }
})



module.exports = isAuthenticated