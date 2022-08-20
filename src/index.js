const express = require("express");



//controller
const usersController = require("./controler/user.controler")
const postsController=require("./controler/post.controler")
 


const app = express();
app.use(express.json());


app.use("/users",usersController)
app.use("/posts",postsController)



 module.exports=app
