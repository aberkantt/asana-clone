const Task = require("../models/Tasks")

const insert = (data) =>{
    const task = new Task(data);
    return task.save();
};

const list = (where)=>{
    return Task.find(where ||{}).populate({
        path : "user_id",
        select : "full_name email profile_image"
    });
};

const modify = (data,id)=>{
    return Task.findByIdAndUpdate(id,data,{new : true});
};

const remove =(id)=>{ 
    return Task.findByIdAndDelete(id,{new : true});
}

module.exports = {
    insert,
    list,
    modify,
    remove
}