const multer=require("multer")
const path=require("path")
const fs=require("fs")

const FILE_TYPE={
    'image/png':'png',
    'image/jpg':'jpg',
    'image/jpeg':'jpeg'
}


const storage=multer.diskStorage({

     destination:function(req,file,callback){

        let isValid=FILE_TYPE[file.mimetype]

        let uploadError=new Error('Invalid image option')
        
        if(isValid){
            uploadError=null
        }

        callback(uploadError,"Upload/")
     },

     filename:function(req,file,callback){
        callback(null,`${Date.now()}-${file.originalname}`)
     }
})

const uploadOption=multer({storage:storage})

module.exports=uploadOption