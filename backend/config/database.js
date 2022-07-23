const mongoose = require('mongoose');




const connectDatabase= ()=>{


    mongoose.connect(process.env.DB_URL,{
        useCreateIndex:true,
        useNewUrlParser:true,
        useUnifiedTopology:true,
        useFindAndModify:false
    }).then((data)=>{
        console.log(`Mongodb is Connected to server:${data.connection.host} !!!`);
    })

     //we dont use catch due to we create unhandle Promise rejection...

    // .catch((err)=>{
    //     console.log('Mongodb Connection failed')
    // })
}

module.exports=connectDatabase


