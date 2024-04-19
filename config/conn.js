const mongoose = require("mongoose")
const mongoURI = process.env.DATABASE
mongoose.set('strictQuery', false);

const connectToMongo = async()=>{
    await mongoose.connect(mongoURI, ()=>{
        console.log("DataBase Connected Successfully")
    })
}

module.exports = connectToMongo