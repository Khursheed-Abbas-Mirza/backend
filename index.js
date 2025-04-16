const express=require('express')
const app=express()
const bodyparser=require('body-parser')
const bookroute=require('./Routes/booking')
const cors=require('cors')
app.set("view engine","ejs")
app.use("/",express.static('public'));
app.use(cors())
app.use(bodyparser.json())
app.use('/api',bookroute)
app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/views"+"/index.html")
})
// app.listen(5000,()=>{console.log("Serever started")})
module.exports=app