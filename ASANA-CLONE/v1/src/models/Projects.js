const Mongoose = require ("mongoose");
const logger = require("../scripts/logger/Projects");

const ProjectSchema = new Mongoose.Schema({
    name : String,
    user_id:{
        type: Mongoose.Types.ObjectId,
        ref:"user"
    },
},{timestamps:true , versionKey:false});

// ProjectSchema.pre("save", (next , doc)=>{
//     console.log("Öncesi",doc);
//     next();
// });
ProjectSchema.post("save", (doc)=>{
    // console.log("Sonrası",object);
    logger.log({
        level : "info",
        message : doc,
    })
    //KAYIT EDİLDİ BİLGİSİ OLACAK
});

module.exports = Mongoose.model("project",ProjectSchema); 