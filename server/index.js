const express = require("express");
const app = express();
//const connection = require("./configs/db.connection");
const userRoutes = require("./routes/users.route");
const authRoutes = require("./routes/auth.route");
require("dotenv").config()
const cors = require("cors");
const mongoDb = require("./configs/mongodb.connection")

app.use(express.json());
app.use(cors());

// Define your CORS options
const corsOptions = {
  origin: "http://localhost:3000", // Replace with your frontend's origin
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};

// Apply CORS middleware with the defined options
app.use(cors(corsOptions));

// Other middleware and route definitions go here

// Start your server
// const port = process.env.PORT || 8000;
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });


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