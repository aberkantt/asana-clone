
const { insert ,modify, list , remove} = require("../services/Sections");
const httpStatus = require("http-status");

const index = (req,res)=>{
    if(!req?.params?.projectId)return res.status(httpStatus.BAD_REQUEST).send({eror : "Proje bilgisi eksik"});

    
    list({project_id : req.params.projectId}).then((response) =>{
        res.status(httpStatus.OK).send(response)
    }).catch((e) =>
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e));
}

const create = (req,res) =>{
    req.body.user_id= req.user;
    insert(req.body)
    .then((response) =>{
        res.status(httpStatus.CREATED).send(response);
    }).catch((e) =>{
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
    })
};

const update = (req,res) =>{
    if(!req.params?.id){
        return res.status(httpStatus.BAD_REQUEST).send({
        message : "Kardeşim böyle bir section yok.."
    });
}else{
    modify(req.body, req.params?.id).then(updatedDoc =>{
        res.status(httpStatus.OK).send(updatedDoc);
    }).catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({eror : "kayıt sırasında bir problrm var"}))
}

};

const deleteSection = (req,res) =>{
    if(!req.params?.id){
        return res.status(httpStatus.BAD_REQUEST).send({
        message : "Kardeşim böyle bir section yok.."
        });
    }

    remove(req.params?.id)
    .then(deletedDoc =>{

        if(!deletedDoc){
            return res.status(httpStatus.NOT_FOUND).send({
                message : "Kardeşim böyle bir section yok yok.."
                });
        }

        res.status(httpStatus.OK).send({
            message : "section silindi.."
        });
    })
    .catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({eror : "silme sırasında bir problrm var"}))
};
module.exports = {
    index,
    create,
    update,
    deleteSection
}