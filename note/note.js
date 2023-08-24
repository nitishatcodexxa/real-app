const note_model = require('../registration/models/note')
const jwt  = require('jsonwebtoken')
const { v4: uuidv4 } = require('uuid');

const addNote = (req,res)=>{
    console.log(req.body)
    let token ;
    const {authorization} = req.headers
    if(authorization && authorization.startsWith('Bearer')){
    token = authorization.split(' ')[1]
    jwt.verify(token,process.env.SECKRET_KEY,(err,decode)=>{
    if(!err){ 

    const noteAdd = new note_model.noteModel({
    notes :req.body.notes,
   date:Date(),
     type:req.body.source,
    note_id:uuidv4(),
     user_id:decode.uuid
    })

    noteAdd.save().then((s)=>{
        console.log(s)
        res.send({"task successfull":"task added"})
    })

    }
})
    }
}




const retriveNote = (req,res)=>{

    let token ;
    const {authorization} = req.headers
    if(authorization && authorization.startsWith('Bearer')){
    token = authorization.split(' ')[1]
    jwt.verify(token,process.env.SECKRET_KEY,(err,decode)=>{
    if(!err){ 
    note_model.noteModel.find({"user_id":decode.uuid}).then((s)=>{
        console.log(s)
        res.send({"data":s})
    })

    }
})
}
}





const updateNote = (req,res)=>{

    let token ;
    const {authorization} = req.headers
    if(authorization && authorization.startsWith('Bearer')){
    token = authorization.split(' ')[1]
    jwt.verify(token,process.env.SECKRET_KEY,(err,decode)=>{
    if(!err){ 
    note_model.noteModel.updateMany({"user_id":decode.uuid,"note_id":req.body.note_id},{"notes":req.body.notes,"type":req.body.type}).then((s)=>{
        console.log(s)
        res.send({"data":s})
    })

    }
})
}
}


const deleteNote = (req,res)=>{

    let token ;
    const {authorization} = req.headers
    if(authorization && authorization.startsWith('Bearer')){
    token = authorization.split(' ')[1]
    jwt.verify(token,process.env.SECKRET_KEY,(err,decode)=>{
    if(!err){ 
    note_model.noteModel.deleteMany({"user_id":decode.uuid,"note_id":req.body.note_id}).then((s)=>{
        console.log(s)
        res.send({"data":s})
    })

    }
})
}
}


module.exports={
    addNote,
    retriveNote,
    updateNote,
    deleteNote
}