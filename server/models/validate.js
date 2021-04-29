const joi=require('@hapi/joi')


 const register=(data)=>{

    const schema=joi.object({
        name:joi.string().min(6).max(255).required(),
        email:joi.string().min(6).max(255).email().required(),
        password:joi.string().min(6).max(1024).required()

    })

    return schema.validate(data)

}

 const login=(data)=>{

    const schema=joi.object({
        email:joi.string().min(6).max(255).email().required(),
        password:joi.string().min(6).max(1024).required()

    })

    return schema.validate(data)

}
module.exports={
    register,
    login
}