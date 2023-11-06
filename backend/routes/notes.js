const express = require("express");
const Note = require("../models/Notes");
const router = express.Router();
var fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");

//Route 1: Get all notes at one point of time of a user who is currently loggedIn i,e Login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes); // or res.send([])
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error");
  }
});
// ROute 2: TO adding new Notes using POST "/api/notes/addnote". Login required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 character").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      //Using the concept of destucture  will be accessing
      const { title, description, tag } = req.body;

      // If there are errors, return bad request and the errors\
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal server error");
    }
  }
)

//ROute 3: Update a existing note using Put request. Login required
/*
 We can use POST method also but for Updation we generally use PUT method
*/


router.put("/updatenote/:id",fetchuser,async(req,res)=>{
//Destructuring 
const {title,description,tag}=req.body;
try{
/*
Creating a newNoteobject on the basis of the information 
given by user.
*/
const newNote={};
//If title is provided by user
if(title){newNote.title=title};
if(description){newNote.description=description};
if(tag){newNote.tag=tag};

//Find the note to be updated and update it
let note=await  Note.findById(req.params.id);
if(!note){return res.status(404).send("Not found")}

//Is he the same person who is trying to update the note
if(note.user.toString()!==req.user.id){
return res.status(401).send("Not Allowed");
}

//TO update the note
note =await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
res.json({note});
}catch(error){
  console.log(error.message);
  res.status(500).send("Internal server error");
}
})




//ROute 4: Delete an existing note using delete request "api/notes/deletenote". Login required


router.delete("/deletenote/:id",fetchuser,async(req,res)=>{
  //Destructuring 
  const {title,description,tag}=req.body;
 
  try{
  //Find the note to be deleted and delete it
  let note=await  Note.findById(req.params.id);
  if(!note){return res.status(404).send("Not found")}
  
  //Allow deletion only if uer owns this note
  if(note.user.toString()!==req.user.id){
  return res.status(401).send("Not Allowed");
  }
  
  //Delete the note
  note =await Note.findByIdAndDelete(req.params.id)
  res.json({"Success":"Note has been deleted"});
}catch(error){
  console.log(error.message);
  res.status(500).send("Internal server error");
}
  })
  
module.exports = router;
