const User=require("../Model/userModel")
const {hashPassword}=require("../Middleware/authHelper")
const bcrypt=require("bcryptjs")
const jwt=require('jsonwebtoken')



class UserController{
    home=async(req,res)=>{
        try {
            const user=await User.find()
            res.render("user/home.ejs",{user:req.user})
        } catch (error) {
            console.log(error);
        }
    }

    createuserForm=async(req,res)=>{
        try {
            const user=await User.find()
            res.render('user/createuser.ejs',{user:req.user})
        } catch (error) {
            console.log(error);
        }
    }

    createuser=async(req,res)=>{
        try {
            const {username,email,password,confirmPassword}=req.body

            if(password!==confirmPassword){
                console.log('password must be same');
            }

            const hashedPassword=await hashPassword(password)

           const newUser= new User({
                username:username,
                email:email,
                password:hashedPassword
            })

            await newUser.save()

            res.redirect('/loginForm')

        } catch (error) {
            console.log(error);
        }
    }

    loginForm=async(req,res)=>{
        try {
            const user=await User.find()
           
            res.render("user/loginForm.ejs",{user:req.user})
        } catch (error) {
            console.log(error);
        }
    }

    userlogin=async(req,res)=>{
        try {
            const {email,password}=req.body


            const user=await User.findOne({email})

            if(!user){
                console.log(`email does not exist`);
                return res.redirect('/loginForm')
            }

            if(user && await bcrypt.compare(password,user.password)){

                const token=jwt.sign({
                    id:user._id,
                    username:user.username,
                    email:user.email
                },process.env.JWT_SECRET,{expiresIn:'12h'})

                if(token){
                    res.cookie("userToken",token)
                    return res.redirect("/allProduct")
                }

            }

            console.log(`Either email or password is Wrong`);
            return res.redirect('/loginForm')

            

        } catch (error) {
            console.log(error);
        }
    }

    logout=async(req,res)=>{
        res.clearCookie("userToken")
        return res.redirect("/loginForm")
    }
}


module.exports=new UserController()