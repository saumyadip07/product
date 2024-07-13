const express=require("express")
const dotenv=require("dotenv")
const connectDB=require("./App/Config/dbConfig")
const path=require("path")
const bodyParser=require("body-parser")
const ejs=require("ejs")
const cookieParser=require("cookie-parser")
const session=require('express-session')
const ProductViewRouter=require("./route/ProductViewRoute")
const UserRouter=require("./route/UserRouter")


dotenv.config()

const app=express();

connectDB()

app.set("view engine","ejs")
app.set("views","views")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname,"public")))
app.use('/Upload',express.static(path.join(__dirname,"Upload")))


app.use(ProductViewRouter)
app.use(UserRouter)










const port=8000;
app.listen(port,()=>{
    console.log(`Server is connected to ${port}`);
})