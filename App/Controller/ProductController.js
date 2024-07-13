const Product=require("../Model/productModel")
const User=require("../Model/userModel")
const PdfTable=require("pdfkit-table")
const fs=require("fs")
const path=require('path')


class ProductController{

    Authcheck=(req,res,next)=>{
         if(req.user){
            console.log("User login successfully");
            next()
         } else{
            console.log("Authentication failed");
            res.redirect("/loginForm")
         } 
    }

    createForm=async(req,res)=>{
        try {
            const user=await User.find()
        
            res.render("createForm.ejs",{
                title:"Create Product",
                user:req.user
            })
        } catch (error) {
            console.log(error);
        }
    }

    createProduct=async(req,res)=>{
        try {
            const {name,price,size,category}=req.body

          const newProduct=  new Product({

                name:name,
                price:price,
                size:size,
                category:category
            })

            let basepath=`${req.protocol}://${req.get('host')}/Upload/`;


            if(req.file){

                 newProduct.image=`${basepath}${req.file.filename}`
            }

            await newProduct.save()
            
            res.redirect('/allProduct')
        } catch (error) {
            console.log(error);
        }
    }

    allProduct=async(req,res)=>{
        try {
            const user=await User.find()
            
            const allProduct=await Product.find()
            res.render("allProduct.ejs",{
                title:"All Product",
                data:allProduct,
                user:req.user
            })
        } catch (error) {
            console.log(error);
        }
    }

    generatePdf = async (req, res) => {
        try {
            const allData = await Product.find();
            const pdf = new PdfTable({margins: {top: 30, left: 10, right: 10, bottom: 10}, size: "A4"});
            pdf.pipe(fs.createWriteStream("public/All Product List.pdf"));
            const headers = [{label:"Name", property:"name"}, {label:"Price", property:"price"}, {label:"Size", property:"size"}, {label:"Category", property:"category"}];
            const title = "All Product List";
            pdf.fontSize(18).text (title, {align: "center", underline: true, bold: true});
            pdf.moveDown(0.4)
            const table ={
                headers: headers,
                datas: allData.map(data=>{return {name: data.name, price:data.price, size:data.size.toString(), category:data.category }})
            }
            await pdf.table(table);


            // let yPos = pdf.y;

            // allData.forEach((data, index) => {
            //     let imageUrl=data.image
            //     imageUrl=imageUrl.split("/")

            //     let filename=[imageUrl[imageUrl.length-1]]
            //     let filepath=path.join(__dirname,`../../upload/${filename}`)

            //     const xPos = pdf.page.margins.left + (pdf.page.width - pdf.page.margins.left - pdf.page.margins.right) * 4 / 5;
            //     pdf.image(filepath, xPos, yPos + index * 30, {
            //         fit: [50, 50],
            //         align: 'center',
            //         valign: 'center'
            //     }); // Adjust the spacing as needed
            // });

           

            pdf.end();
            
        res.redirect(`${req.protocol}://${req.get("host")}/${"All Product List".replace(/ /g, "%20")}.pdf`,)
        } catch (err) {
          console.log(err)
        }
      };
}


module.exports=new ProductController()