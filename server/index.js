const express = require("express");
const app = express();
//const connection = require("./configs/db.connection");
const userRoutes = require("./routes/users.route");
const authRoutes = require("./routes/auth.route");
require("dotenv").config()
const mongoDb = require("./configs/mongodb.connection")

app.use(express.json());

app.use("/users", userRoutes)
app.use("/auth", authRoutes)

app.listen(8000, (error)=>{
    if(error){
        throw err
    }

    mongoDb();
    // connection.connect((error) => {
    //     if(error) {
    //         throw error;
    //     }
    //     console.log("connected to db");
    // })
    console.log("server is running on port: ", 8000)
})