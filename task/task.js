const task_model = require('../registration/models/task')
const { v4: uuidv4 } = require('uuid');
const multer = require('multer')
const jwt = require('jsonwebtoken')
exports.taskAdd = async(req,res)=>{

    let token ;
    const {authorization} = req.headers
    if(authorization && authorization.startsWith('Bearer')){
    token = authorization.split(' ')[1]
    jwt.verify(token,process.env.SECKRET_KEY,(err,decode)=>{
    if(!err){ 
if(req.files.file && req.files.file.length){
    const fileArray = []
for (let i = 0; i < req.files.file.length; i++) {
    console.log(req.files.file[i].filename)
    fileArray.push({ 
        id:i,
        url :req.files.file[i].filename,
    }) 
}
    const task_id = uuidv4()
    const addTask = new task_model.taskModel({
        subject: req.body.subject,
        priority:req.body.priority,
        assigned_to:req.body.assigned_to,  /// for assigned data
        start_date:req.body.start_date,
        end_date:req.body.end_date,
        date:req.body.date,
        recursion_type:req.body.recursion_type,
        status:req.body.status,
        description:req.body.description,
        file:fileArray,
        task_id:task_id,
        recursion_is:req.body.recursion_is,
        user_id:decode.uuid,  
        created_by:req.body.created_by,
        index:0,
    })

    addTask.save().then(()=>{
        console.log("data inserted")
res.send({"res":"ok"})
    })


}else{
    const task_id = uuidv4()
    const addTask = new task_model.taskModel({
        subject: req.body.subject,
        priority:req.body.priority,
        assigned_to:req.body.assigned_to,  /// for assigned data
        start_date:req.body.start_date,
        end_date:req.body.start_date,
        date:req.body.start_date,
        recursion_type:req.body.recursion_type,
        status:req.body.status,
        description:req.body.description,
        file:[],
        task_id:task_id,
        user_id:decode.uuid,
        recursion_is:req.body.recursion_is,
        created_by:req.body.created_by,
        index:0,
    })

    addTask.save().then(()=>{
        console.log("data inserted")
res.send({"res":"ok"})
    })
}
}})
}}





exports.retriveTask = (req,res)=>{

let newData =null
let processingData = null
let in_feedback = null
let completed = null
let rejected = null
let alltask=null
let token ;
const {authorization} = req.headers
if(authorization && authorization.startsWith('Bearer')){
token = authorization.split(' ')[1]
jwt.verify(token,process.env.SECKRET_KEY,(err,decode)=>{
if(!err){ 

    task_model.taskModel.find({"user_id":decode.uuid,"status":"New"}).then((ss)=>{
        newData=ss
    }).then(()=>{
        task_model.taskModel.find({"user_id":decode.uuid,"status":"Processing"}).then((ss)=>{
       processingData = ss
    }).then(()=>{
        task_model.taskModel.find({"user_id":decode.uuid,"status":"In_Feedback"}).then((ss)=>{
            in_feedback = ss
    }).then(()=>{
        task_model.taskModel.find({"user_id":decode.uuid,"status":"Completed"}).then((ss)=>{
            completed=ss
    }).then(()=>{
        task_model.taskModel.find({"user_id":decode.uuid,"status":"Rejected"}).then((ss)=>{
            rejected=ss
    }).then(()=>{
        task_model.taskModel.find({"user_id":decode.uuid}).then((ss)=>{
            alltask=ss

        }).then(()=>{
            res.send({"alltask":alltask,"newData":newData,"newdata_length":newData.length,"processingData":processingData,"in_feedback":in_feedback,"completed":completed,"rejected":rejected})
    
        })
        
    })

})   
    })
    })
    })
}
})
}


}



exports.taskDelete = (req,res)=>{

    let token ;
    const {authorization} = req.headers
    if(authorization && authorization.startsWith('Bearer')){
    token = authorization.split(' ')[1]
    jwt.verify(token,process.env.SECKRET_KEY,(err,decode)=>{
    if(!err){
    task_model.taskModel.deleteMany({"user_id":decode.uuid,"task_id":req.body.data}).then((ss)=>{
        if(ss.acknowledged==true && ss.deletedCount > 0){
            res.send({"result":"deleted  successfull"})
        }else{
       console.log(ss)     
        }
    })


    }
})
    }
}


exports.taskUpdate=(req,res)=>{
console.log(req.body)

    let token ;
    const {authorization} = req.headers
    if(authorization && authorization.startsWith('Bearer')){
    token = authorization.split(' ')[1]
    jwt.verify(token,process.env.SECKRET_KEY,(err,decode)=>{
    if(!err){
    task_model.taskModel.updateMany({"user_id":decode.uuid,"task_id":req.body.task_id},{
        subject:req.body.subject,
    priority:req.body.priority,
    assigned_to:req.body.assigned,
    start_date:req.body.date,
    end_date:req.body.date,
    date:req.body.date,
    recursion_type:req.body.recursion,
    status:req.body.taskstatus,
    description:req.body.description,
    task_id:req.body.task_id,
    recursion_is:req.body.recursion_is,
    user_id:decode.uuid,
    }).then(async(s)=>{
        if(req.files.file && req.files.file.length){

        for (let i = 0; i < req.files.file.length; i++) {
            task_model.taskModel.updateOne({"user_id":decode.uuid,"task_id":req.body.task_id}, {'$push': {'file': { id: Math.random() * 100030070000 , url:req.files.file[i].filename}}}).then((e)=>{
                
            })
        }
        setTimeout(()=>{
 res.send({"modified account" : "modified"})
        },500)
       

    }else{
         res.send({"modified account" : "modified"})
    }      
})
}
})
}
}

exports.taskDeleteFiles = async(req,res)=>{

    let token ;
    const {authorization} = req.headers
    if(authorization && authorization.startsWith('Bearer')){
    token = authorization.split(' ')[1]
    jwt.verify(token,process.env.SECKRET_KEY,(err,decode)=>{
    if(!err){

    task_model.taskModel.updateMany({"user_id":decode.uuid,'task_id':req.body.task_id}, {'$pull': {'file': { id:req.body.fileid}}}).then((e)=>{
res.send({"ok":"kdjk"})

    }) }
})
    }
}


exports.instantFileDelteUpdate=(req,res)=>{
    let token ;
    const {authorization} = req.headers
    if(authorization && authorization.startsWith('Bearer')){
    token = authorization.split(' ')[1]
    jwt.verify(token,process.env.SECKRET_KEY,(err,decode)=>{
    if(!err){
    task_model.taskModel.findOne({"user_id":decode.uuid,'task_id':req.body.task_id}).then((ss)=>{
res.send({"data":ss})
})

}}) }
}





exports.taskStatus=(req,res)=>{
    let token ;
    const {authorization} = req.headers
    if(authorization && authorization.startsWith('Bearer')){
    token = authorization.split(' ')[1]
    jwt.verify(token,process.env.SECKRET_KEY,(err,decode)=>{
    if(!err){
    task_model.taskModel.updateMany({"user_id":decode.uuid,'task_id':req.body.id},{"status":req.body.status}).then((ss)=>{
res.send({"data":ss})
})

}}) }

}


exports.taskPriority=(req,res)=>{
    let token ;
    const {authorization} = req.headers
    if(authorization && authorization.startsWith('Bearer')){
    token = authorization.split(' ')[1]
    jwt.verify(token,process.env.SECKRET_KEY,(err,decode)=>{
    if(!err){
    task_model.taskModel.updateMany({"user_id":decode.uuid,'task_id':req.body.id},{"priority":req.body.status}).then((ss)=>{
res.send({"data":ss})
console.log(ss)
})

}}) }
}


exports.taskStaff=(req,res)=>{
    let token ;
    const {authorization} = req.headers
    if(authorization && authorization.startsWith('Bearer')){
    token = authorization.split(' ')[1]
    jwt.verify(token,process.env.SECKRET_KEY,(err,decode)=>{
    if(!err){
    task_model.taskModel.updateMany({"user_id":decode.uuid,'task_id':req.body.id},{"assigned_to":req.body.status}).then((ss)=>{
res.send({"data":ss})
})

}}) }


}



exports.taskStaffselelctedDelete=(req,res)=>{
    let token ;
    const {authorization} = req.headers
    if(authorization && authorization.startsWith('Bearer')){
    token = authorization.split(' ')[1]
    jwt.verify(token,process.env.SECKRET_KEY,(err,decode)=>{
    if(!err){
for (let i = 0; i < req.body.data.length; i++) {
    task_model.taskModel.deleteMany({"user_id":decode.uuid,'task_id':req.body.data[i]}).then((ss)=>{

})
}
res.send({"de":"dk"})
}}) }


}




exports.taskAssignedchange=(req,res)=>{
    let token ;
    const {authorization} = req.headers
    if(authorization && authorization.startsWith('Bearer')){
    token = authorization.split(' ')[1]
    jwt.verify(token,process.env.SECKRET_KEY,(err,decode)=>{
    if(!err){
    task_model.taskModel.updateMany({"user_id":decode.uuid,'task_id':req.body.id},{"assigned_to":req.body.name}).then((ss)=>{
res.send({"data":ss})
})

}}) }

}




exports.taskUpdateByIndex=(req,res)=>{
    let token ;
    const {authorization} = req.headers
    if(authorization && authorization.startsWith('Bearer')){
    token = authorization.split(' ')[1]
    jwt.verify(token,process.env.SECKRET_KEY,(err,decode)=>{
    if(!err){
  
  for (let i = 0; i < req.body.data.length; i++) {
    task_model.taskModel.updateOne({"user_id":decode.uuid,"task_id":req.body.data[i].task_id},{status:req.body.destination.droppableId,index:i}).then((s)=>{
     
        })
  } 
    res.send({"ok":"value"})
  
    }
  })
    }



}


