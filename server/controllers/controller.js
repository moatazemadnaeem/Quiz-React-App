
const User=require('../models/schema')
const bcrypt=require('bcrypt')
const {register,login}=require('../models/validate')
const jwt =require('jsonwebtoken')
module.exports={

    Register:async(_,{name,email,password},{res})=>{
      
        try{
            const userdata=await User.findOne({email:email})
            if(userdata){
               return {msg:'The email is already taken'}
            }
        }catch(err){
          console.log(err)
        }
        const {error} =register({name,email,password})
       
        if(error){
            return {msg:error.details[0].message}
        }else{
            const salt=await bcrypt.genSalt()
            password=await bcrypt.hash(password,salt)
            const data=await User.create({name,email,password})

            const token=jwt.sign({id:data._id},process.env.TOKEN_SECRET,{expiresIn:60*60*24*3})
            res.cookie('jwtAuth',token,{maxAge:1000*60*60*24*3})
           
            return {msg:'User added',data,token};
        }
       
    },
    Login:async(_,{email,password},{res})=>{
        //find user with those credentials
      
        const {error}=login({email,password})
        
        if(error){
            
            return {msg:error.details[0].message}
        }else{
           
            let info='failed to fetch'
            const data= await User.findOne({email:email})
                   if(!data){
                      info='user not loged in please enter the right email...'
                   }
                   else{
                       //data.password in the db || password is what we provide
                       const validate=await bcrypt.compare(password,data.password)
                          if(validate){
                             info='user loged in congratulations...'
                         }else{
                          info='user not loged in please enter the right password...'
                      }
                  }
                  if(info==='user loged in congratulations...'){
                      //jwt go here
                      //expires in 3 days
                      console.log('secret is : '+process.env.TOKEN_SECRET)
                     const token=jwt.sign({id:data._id},process.env.TOKEN_SECRET,{expiresIn:60*60*24*3})
                     res.cookie('jwtAuth',token,{maxAge:1000*60*60*24*3})
                    
                    return  {msg:info,data,token}
                  }
                  else{
                    return  {msg:info}
                  }
            

        }
      
    },
    ForgetPassword:async()=>{

    },
    ResetPassword:async()=>{

    }

}