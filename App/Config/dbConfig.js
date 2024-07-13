const mongoose=require("mongoose")


const connectDB=async()=>{
    try {
       const connection= await mongoose.connect(process.env.MONGO_URL)
       console.log("Connected to Database");
    } catch (error) {
        console.log(`Error happened while connecting to database ${error}`);
    }
}

module.exports=connectDB