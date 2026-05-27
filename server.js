const express = require("express");
const app=express();
require("dotenv").config()
const port = process.env.port
const cors = require("cors"); //imp
app.use(cors());
const mongoose=require("mongoose");
const Notebook = require("./model/notes") 
const {createAccount,login}=require("./controller/user")
const{createNotebook,getNotes,updateNotebook,deleteNotebook}=require("./controller/notes")
const auth=require("./middleware/auth") 
app.use(express.json());

app.post("/signin",createAccount);
app.post("/login",login)

app.post("/CreateNotebook",createNotebook);
app.get("/allNotes",getNotes)
app.put("/update/:id",updateNotebook)

app.delete("/api/delete-note/:id",deleteNotebook);


// app.delete('/delete-note/:id', async (req, res) => {
//     const noteId = req.params.id;
//     // Add your database deletion logic here
//      console.log(noteId);
//       const notebook=await Notebook.findByIdAndDelete(noteId);
//       if(!notebook){
//         return res.send("Notebook not found");
//       }
    
//       res.send("Notes is deleted");
// });

mongoose.connect(process.env.mongo_url)
.then(()=>{
  console.log("Database is connected")

  app.listen(port,()=>{ 
  console.log(`server is runninng port number ${port}`);
})

})
.catch((e)=>{
  console.log("something went wrong",e);
}) 