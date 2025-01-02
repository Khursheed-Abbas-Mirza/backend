const express=require('express')
const app=express()
const bodyparser=require('body-parser')
const bookroute=require('./Routes/booking')
const cors=require('cors')
app.use(cors())
app.use(bodyparser.json())
app.use('/api',bookroute)
app.get('/',(req,res)=>{
    res.send("Hello world")
})
app.listen(5000,()=>{
    console.log("App listening on the port number 3000")
})