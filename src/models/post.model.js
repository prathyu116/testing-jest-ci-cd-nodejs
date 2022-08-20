const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
    {
      title: { type: String, required: true },
      body: { type: String, required: true },
   
    },
    {
      versionKey: false,
      timestamps: true, // createdAt, updatedAt
    }
  );
  
  // Step 2 :- creating the model
  const Post = mongoose.model("post", postSchema);
  module.exports=Post