const { truncate } = require('fs');
const mongoose= require('mongoose');

const ProduvtSchema = new mongoose.Schema({
    name:{
        type: String,
        required:[ true,'Please Enter Product Name'],
        trim:true
    },
    description:{
        type: String,
        required:[true,'Please enter product description']
    },
    price:{
        type:Number,
        required:[true,'please enter product price'],
        maxLength:[8,'price cannot exceed  8 charactor']
    },
    rating:{
        type:Number,
        // required:true
    },
    image:[
        {
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
        }
    ],
    category:{
        type:String,
        required:[true,'please enter product category']

    },
    stock:{
        type:Number,
        required:[true,'please enter product stock'],
        maxLength:[4,'stock cannot exceed 4 characters'],
        default:1
    },
    numOfReviews:{
        type:String,
        default:0
    },
    reviews:[
        {
            name:{
                type:String,
                required:true
            },
            ratings:{
                type:Number,
                required:true
            },
            comment:{
                type:String,
                required:true
            }
        }
    ],    
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})



module.exports=mongoose.model('Product',ProduvtSchema);