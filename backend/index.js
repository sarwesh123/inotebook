const express = require("express")
const connectToMongo=require('./db');
connectToMongo();
const app = express();
const port=5000;
var cors = require('cors')
app.use(cors())
//Middleware if client send some req to server
app.use(express.json())
const dotenv=require('dotenv');

//Available Routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes.js'))

const path = require('path')
dotenv.config();
// const PORT= process.env.PORT;
// console.log(PORT);

const __dirname1=path.resolve();
const ab=path.join(__dirname1,"/../build")

if(process.env.NODE_ENV==="production"){
app.use(express.static(ab));

app.get('*',(req,res)=>{
    res.sendFile(path.resolve(ab,"index.html"));
});
}
else{
    app.get("/",(req,res)=>{
        res.send("api working");
});
}

// app.get("/",(req,res)=>{
//     res.send("Hello World");
// })

app.listen(port,()=>{
 console.log('Example app listening at http://localhost:' + port)
 console.log(ab)
})