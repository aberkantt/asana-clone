const httpStatus = require("http-status");
const JWT = require("jsonwebtoken");

const authenticateToken = (req,res,next)=>{
    const autHeader = req.headers["authorization"];
    const token =autHeader && autHeader.split(" ")[1]
    if(token ==null) {
    return res.status(httpStatus.UNAUTHORIZED).send({eror:"BU İŞLEMİ YAPMAK İÇİN ÖNCE GİRİŞ YAP"});
    }
    JWT.verify(token, process.env.ACCES_TOKEN_SECRET_KEY,(err,user)=>{
        if(err) return res.status(httpStatus.FORBIDDEN).send({error: "TOKEN SÜRESİ GEÇMİŞ"})
        req.user = user?._doc;
        next();
    })

};


module.exports = authenticateToken;