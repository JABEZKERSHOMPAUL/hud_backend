const express=require('express')
const cors=require('cors')
const mongoose=require('mongoose');
const router_user = require('./routes/user_routes');
const path=require('path')

const PORT = process.env.PORT || 8000;

const app= express()
app.use(express.json())
app.use(cors())

app.use("/",router_user)
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

const URI="mongodb+srv://Jabez:jabezkershom@cluster0.djujjbx.mongodb.net/"
mongoose.connect(URI).then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server is running ${PORT}`)
    })
}).catch((error)=>{console.log(error)})


