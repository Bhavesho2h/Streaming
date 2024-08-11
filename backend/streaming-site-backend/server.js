const express = require('express');
const app = express();

//defining a route in Express
app.get('/',(req,res)=>{
    res.send('<h1>Hello Express js Server!!</h1>')
})

//Include route files

const userRoute = require('./routes/user');

//Use routes

app.use('/user',userRoute);

const port = process.env.PORT || 3001;

app.listen(port,()=>{
    console.log(`port is running on ${port}`)
})

