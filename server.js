var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 
var mongoose = require('mongoose');
var path= require('path');
mongoose.connect('mongodb://localhost/products');
app.use(express.static(__dirname+"/angular-app/dist/angular-app"))
mongoose.Promise = global.Promise;
var ProductsSchema = new mongoose.Schema({
    name: {type:String, required:[true,"name required"]},
    price: {type:Number, required:[true,"price required"]},
    image:{type: String}
})
mongoose.model("Product", ProductsSchema);
var Product = mongoose.model('Product')
app.listen(8000, function() {
    console.log("listening on port 8000");
})
app.post("/createproduct", function(req,res){
    console.log("accessed server for createproduct route")
    var product = new Product({name:req.body.name,price:req.body.price,image:req.body.image})
    product.save(function(err){
        if(err){
            console.log("Problem creating new product",err)
            res.json({message:"error",error:err})
        }
        else{
            console.log("Successfully created a new product")
            res.json({message:"Success"})
        }
    })
})
app.get("/allproducts", function(req,res){
    console.log("allproducts")
    Product.find({}, function(err,products){
        if(err){
            console.log("Problem getting all products",err)
            res.json({message:"error",error:err})
        }
        else{
            console.log("Succesfully got all the products")
            res.json({message:"Success", allproducts:products})
        }
    })
})
app.get("/oneproduct/:id", function(req,res){
    console.log("One Product > id", req.params.id)
    Product.findOne({_id:req.params.id}, function(err,product){
        if(err){
            console.log(err)
            console.log("problem getting one product")
            res.json({message:"error",error:err})
        }
        else{
            console.log("succesfully got the one product")
            console.log(product)
            res.json({message:"success", product:product})
        }
    })
})

app.put("/editOneProduct", function(req,res){
    Product.findOneAndUpdate({_id:req.body._id}, {name:req.body.name, price:req.body.price, image:req.body.image}, function(err){
        if(err){
            console.log("Problem updating",err)
            res.json({message:"error",error:err})
        }
        else{
            console.log("Succesfully updated")
            res.json({message:"success"})
        }
    })
})
app.delete("/deleteProduct/:id", function(req,res){
    Product.findOneAndRemove({_id:req.params.id}, function(err){
        if(err){
            console.log("problem deleting", err)
            res.json({message:"error", error:err})
        }
        else{
            console.log("successfully deleted")
            res.json({message:'success',success:true})
        }
    })
})
app.all("*", (req,res,next) => {
    res.sendFile(path.resolve("./angular-app/dist/angular-app/index.html"))
});