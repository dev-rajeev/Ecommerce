const  app = require('./app');

const dotenv= require('dotenv');
const connectDatabase=require('./config/database')


// Hamdling Uncaught Exception-----
process.on("uncaughtException",(err)=>{
    console.log(`Error : ${ err.message}`);
    console.log("shutting down the server due to unCaught Exception");
    process.exit(1)
})



// config
dotenv.config({path: 'backend/config/config.env'})

// connecting to database
connectDatabase()


// app.listen(process.env.PORT, ()=>{
//     console.log(`server is running in ${process.env.PORT}`);
// })



const server = app.listen(process.env.PORT, ()=>{
    console.log(`server is running in ${process.env.PORT}`);
})


// console.log(youtube);                              // check uncaught exception error 

// Unhandled Promise Rejection
process.on("unhandledRejection", err=>{
    console.log(`Error: ${err.message}`);
    console.log("shutting down the server due to unhandleed Promise Rejection");

    server.close(()=>{
        process.exit(1)
    })
})