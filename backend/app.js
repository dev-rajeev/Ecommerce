const express = require('express');
const app=express();
const cookieParser = require('cookie-parser')


const ErrorMiddleware = require('./middleware/error')

app.use(express.json())
app.use(cookieParser());

// Import Router
const product =require('./routes/productRout')
const user = require('./routes/userRout')

app.use('/api/v1',product)
app.use('/api/v1',user)


// Middleware for error
app.use(ErrorMiddleware)



module.exports=app;