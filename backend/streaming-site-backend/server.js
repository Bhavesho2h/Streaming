const express = require('express');
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const port = process.env.PORT
const authRoutes = require("./routes/auth")
const app = express();
const connectDB = require('./config/db')
app.use(cors());
app.use((express.json()))
app.use(express.urlencoded({ extended: false }))

connectDB();

//defining a route in Express
app.get('/', (req, res) => {
    res.send('<h1>Hello Express js Server!!</h1>')
})

//Include route files

const userRoute = require('./routes/user');

//Use routes

app.use("/", authRoutes)
app.use('/user', userRoute);

// const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`port is running on ${port}`)
})

