const httpStatus = require("http-status");

const validate = (schema)=>(req,res,next)=>{
    const { value , eror } = schema.validate(req.body);
    if(eror){
        const erorMessage = eror.details?.map((detail)=>detail.message).join(", ");
        res.status(httpStatus.BAD_REQUEST).json({eror : erorMessage});
        return;
    }

    Object.assign(req,value);
    return next();
}

module.exports = validate;