const mongoose=require('mongoose')


const schema=mongoose.Schema;

const user=new schema({

    name:{
        type:String,
        required:true,
        min:6,
        max:255
    },
    email:{
        type:String,
        required:true,
        min:6,
        max:255,
        unique:true
    },
    password:{
        type:String,
        required:true,
        min:6,
        max:1024     
    },
    date:{
        type:Date,
        default:Date.now
    }

})


module.exports=mongoose.model('users',user)