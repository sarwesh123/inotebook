const mongoose=require('mongoose');
const { Schema } = mongoose;
const NotesSchema = new Schema({
/*WE Want that 1st user cant see the notes of 2nd user notes and so on
So we have to associate the user from notes for that 
*/
user:{
   //THiss is like foregien Key
type: mongoose.Schema.Types.ObjectId,
// THis foregien keey will refer to user 
ref: 'user'
},
 title:{
    type:String,
    required:true 
 },
 description:{
   type:String,
   required:true 
},
 tag:{
    type:String,
    default:"General"
 },
 date:{
    type:Date,
    default : Date.now
 } 
});
module.exports=mongoose.model('notes',NotesSchema);
