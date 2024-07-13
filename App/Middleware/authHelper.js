const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")



const hashPassword=async(password)=>{
    return await bcrypt.hash(password,10)
}


const verifyToken=async(req,res,next)=>{
    
    if(req.cookies){
    jwt.verify(req.cookies.userToken,process.env.JWT_SECRET,(err,data)=>{
        req.user=data,
        next()
    })
}

    else{
        next()
    }


}





module.exports={hashPassword,verifyToken}