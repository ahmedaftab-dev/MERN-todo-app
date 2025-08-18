const mongoose=require('mongoose')

const ConnectDB=async ()=>{
    try{
        const conn=await mongoose.connect(process.env.MONGO_URL)
        console.log(`DB conncted at ${mongoose.connection.host}`)
    }
    catch{
        console.log('DB connection failed')
    }
}
module.exports= ConnectDB;