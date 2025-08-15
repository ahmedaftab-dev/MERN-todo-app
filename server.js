const express = require('express');
const morgan=require('morgan')
const cors=require('cors')
const dotenv=require('dotenv')

dotenv.config()


const app=express()


app.use(express.json())
app.use(morgan('dev'))
app.use(cors())


//routes
app.use("/api/test",require('./routes/TestRouter'))


app.get('/api/home',(req,res)=>{
    res.status(200).send(`<h1>Node.js startred on Homepage</h1>`)
})


const Port=process.env.PORT

app.listen(Port,()=>{
    console.log(`server is running at ${Port} `)
})