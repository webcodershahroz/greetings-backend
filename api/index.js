const express = require("express");
const http = require('http')
const dotenv = require("dotenv");
const connectToMongodb = require("../config/mongodb");
const auth = require("../routes/userRoutes");
const simple = require("../routes/simple");
const cors = require("cors");
const app = express();
const server = http.createServer(app);



app.use(cors());
//to accept json value

app.use(express.json());


dotenv.config();
//connecting to mongodb atlas
connectToMongodb();
//app
//routes

app.use("/", simple);
app.use("/auth", auth);

//server listening on port 2000
server.listen(5500,()=>{
  console.log("Running on port 5500");
})

module.exports = app;