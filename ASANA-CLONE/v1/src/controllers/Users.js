const { insert , list , loginUser , modify , remove} = require("../services/Users");
const projectService = require("../services/Projects")
const httpStatus = require("http-status");
const {passwordToHash, generateAccessToken, generateRefreshToken} = require("../scripts/utils/helper");
const uuid = require("uuid");

const path = require ("path");


const create = (req,res) =>{

    req.body.password=passwordToHash(req.body.password);

    insert(req.body)
    .then(response =>{
        res.status(httpStatus.CREATED).send(response);
    }).catch(e =>{
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
    })
    
};

const login =(req,res) =>{
    req.body.password = passwordToHash(req.body.password);
    loginUser(req.body)
    .then((user) => {
        if(!user) return res.status(httpStatus.NOT_FOUND).send({message : "böyle bir kullanıcııı yook..."});
        user = {
            ...user.toObject(),
            tokens :{
                access_token : generateAccessToken(user),
                refresh_token : generateRefreshToken(user)
            }
        };
            delete user.password;
        res.status(httpStatus.OK).send(user);
    })
    .catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e));
};

const index = (req,res)=>{
    list().then(response =>{
        res.status(httpStatus.OK).send(response)
    }).catch((e) =>
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e));
};

const projectList = (req,res)=>{
    projectService.list({user_id : req.user?._id}).then(projects =>{
        res.status(httpStatus.OK).send(projects)
    }).catch(()=>res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        eror : "Projeleri getirirken beklenmedik hata olulştu"
    }))
};

const resetPassword = (req,res) =>{


        // return false;
        const new_password = uuid.v4()?.split("-")[0] || `usr-${new Date().getTime()}`
        modify({ email : req.body.email}, {password : passwordToHash(new_password)}).then(updatedUser =>{
            if(!updatedUser) return res.status(httpStatus.NOT_FOUND).send({eror : "böyle bir kullanıcı yok aslanım"})
        }).catch(()=>res.status(httpStatus.INTERNAL_SERVER_ERROR).send({eror : "şifre sıfırlanırken bir problem oldu"}))
    // ////////////
    "use strict";
    const nodemailer = require("nodemailer");
    
    const transporter = nodemailer.createTransport({
        host: "smtp.forwardemail.net",
        port: 465,
        secure: true,
        auth: {
        user: 'REPLACE-WITH-YOUR-ALIAS@YOURDOMAIN.COM',
        pass: 'REPLACE-WITH-YOUR-GENERATED-PASSWORD'
        }
    });
    
    // async..await is not allowed in global scope, must use a wrapper
    async function main() {
      // send mail with defined transport object
        const info = await transporter.sendMail({
        from: '"ASANAAA👻" <foo@example.com>', // sender address
        to: "berkant.ontemel@ogr.sakarya.edu.tr", // list of receivers
        subject: "ŞİFRE SIFIRLAMA ✔", // Subject line
        html: `<b>YENİ ŞİFRE DEĞİŞTİRMEYİ DE UNUTMA ${new_password}</b>`, // html body
        });
    
        console.log("Message sent: %s", info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    }
    
    main();
    
}


const deleteUser = (req,res) =>{
    if(!req.params?.id){
        return res.status(httpStatus.BAD_REQUEST).send({
        message : "Kardeşim böyle bir kullanıcı yok.."
        });
    }

    remove(req.params?.id)
    .then(deletedItem =>{

        if(!deletedItem){
            return res.status(httpStatus.NOT_FOUND).send({
                message : "Kardeşim böyle bir kullanıcı yok yok.."
                });
        }

        res.status(httpStatus.OK).send({
            message : "kullanıcı silindi.."
        });
    })
    .catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({eror : "silme sırasında bir problrm var"}))
};

const updateProfileImage = (req,res) =>{
//!1-resim check
    if(!req?.files?.profile_image){
        return res.status(httpStatus.BAD_REQUEST).send({eror : "Bu işlemi yapman için yeterli veri yok.."})
    }
//!upload
    const extension = path.extname(req.files.profile_image.name)
    const fileName = `${req?.user._id}${extension}`
    const folderPath = path.join(__dirname,"../","uploads/users",fileName);
    req.files.profile_image.mv(folderPath, function(err){
    if(err){
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({eror : err})
    };
    modify({_id: req.user._id },{profile_image : fileName}).then((updatedUser) =>{
        res.status(httpStatus.OK).send(updatedUser)
    }).catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({eror : "upload başarılı fakat kayıt sırasında bir problem var."}))
})
//!db save
//!Response

}
module.exports = {
    create,
    index,
    login,
    projectList,
    resetPassword,
    deleteUser,
    updateProfileImage
};