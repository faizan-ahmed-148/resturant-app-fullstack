const express = require("express");
const cookieParser = require('cookie-parser');
const dotenv = require("dotenv")
dotenv.config({ path: './config.env'})
const connectToMongo = require("./config/conn")
connectToMongo()
const product = require("./routes/ProductRoute")
const user = require("./routes/UserRoute")
const order = require("./routes/OrderRoute")
const payment = require("./routes/PaymentRoute")
const cloudinary = require("cloudinary")


const app = express()
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  })
  
  app.use(express.json({limit: "50mb"}));
  app.use(express.urlencoded({ limit: "50mb", extended: true}))
  app.use(cookieParser())
  
  const hostname = process.env.hostname || '127.0.0.1';

const PORT = process.env.PORT || 5000
app.use("/api/v1",product)
app.use("/api/v1",user)
app.use("/api/v1",order)
app.use("/api/v1",payment)


if ( process.env.NODE_ENV == "production"){

  app.use(express.static("client/build"));

  const path = require("path");

  app.get("*", (req, res) => {

      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));

  })


}

app.listen(PORT, ()=>{
    console.log(`Server running at http://${hostname}:${PORT}/`)
})