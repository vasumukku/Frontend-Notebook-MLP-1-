const Notebook = require("../model/notes") 



const createNotebook = async (req,res) => {
  try {
    const{heading,content}=req.body;
    const data=await Notebook.create({heading,content}) 

    res.json({
      message:"Notebook created successfully",
      data
    }) 

  } catch (error) {
    res.send(error.message);
  }
}

const getNotes=async (req,res) => {
  try {
    const allnotebooks=await Notebook.find();
  res.json({
    allnotebooks
  }) 
  } catch (error) {
    res.send(error.message);
  }
  
}

const updateNotebook=async (req,res) => {
 try {

   const id=req.params.id
  const{content,heading}=req.body;
  const updateNotes=await Notebook.findByIdAndUpdate(
    id,{content,heading},{new:true}
  )
  if(!updateNotebook){
    return res.send("notes is not found")
  }

  res.json({
    message:"Notes updated successfully",
    updateNotes
  })

 } catch (error) {
    res.send(error.message);
 }
}

const deleteNotebook=async (req,res) => {
  try {
  const id=req.params.id;
  console.log(id);
  const notebook=await Notebook.findByIdAndDelete(id);
  if(!notebook){
    return res.send("Notebook not found");
  }

  res.send("Notes is deleted");

  } catch (error) {
    res.send(error.message);
  } 
}


module.exports={createNotebook,getNotes,updateNotebook,deleteNotebook};