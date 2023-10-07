
const { insert ,modify, list , remove} = require("../services/Projects");
const httpStatus = require("http-status");

const index = (req,res)=>{
    console.log('req :>> ', req.user);
    list().then((response) =>{
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
        message : "Kardeşim böyle bir proje yok.."
    });
}else{
    modify(req.body, req.params?.id).then(updatedProject =>{
        res.status(httpStatus.OK).send(updatedProject);
    }).catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({eror : "kayıt sırasında bir problrm var"}))
}

};

const deleteProject = (req,res) =>{
    if(!req.params?.id){
        return res.status(httpStatus.BAD_REQUEST).send({
        message : "Kardeşim böyle bir proje yok.."
        });
    }

    remove(req.params?.id)
    .then(deletedProject =>{

        if(!deletedProject){
            return res.status(httpStatus.NOT_FOUND).send({
                message : "Kardeşim böyle bir proje yok yok.."
                });
        }

        res.status(httpStatus.OK).send({
            message : "proje silindi.."
        });
    })
    .catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({eror : "silme sırasında bir problrm var"}))
};
module.exports = {
    index,
    create,
    update,
    deleteProject
}