const bodyParser = require("body-parser");
const express = require("express");
const connect = require("./config/db")
const path = require("path")
const app = express();
const router = require("./routers/userRoutes")
const postRoutes = require("./routers/postRoutes")
const profileRoutes = require("./routers/profileRoutes")

//const cors = require("cors");
require('dotenv').config()
 

connect();
app.use(bodyParser.json());
// app.use(cors());
// app.use(express.json());

//routes
app.use("/", router);
app.use("/", postRoutes);
app.use("/", profileRoutes);
const PORT = process.env.PORT || 6000;
if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '/client/build/')))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}
app.listen(PORT, () => {
    console.log("your app is running");
})