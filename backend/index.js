const express = require("express")
const connectToMongo=require('./db');
connectToMongo();
const app = express();
const port=5000;
var cors = require('cors')
app.use(cors())
//Middleware if client send some req to server
app.use(express.json())

//Available Routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes.js'))

app.get("/",(req,res)=>{
    res.send("Hello World");
})

app.listen(port,()=>{
 console.log('Example app listening at http://localhost:' + port)
})