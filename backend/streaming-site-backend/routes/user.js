const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    res.send(`<h1>this is for the first user</h1>`)
})

router.get('/101',(req,res)=>{
    res.send(`<h2>this is for user 101</h2>`)
})

router.get('/102',(req,res)=>{
    res.send(`<h3>this is for user 102</h3>`)
})

//exporting the router module so that server.js file can use it
module.exports = router;