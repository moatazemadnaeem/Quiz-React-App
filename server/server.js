const express=require('express')
require('dotenv').config()
const mongoose=require('mongoose')
const cookieParser=require('cookie-parser')
const typeDefs=require('./typedefs')
const resolvers=require('./resolvers')
const cors=require('cors')
const {ApolloServer}=require('apollo-server-express')
const port=process.env.PORT;
const {authuser}=require('./jsonValidation')
const app=express()

// const corsOptions = {
//     allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'X-Access-Token', 'Authorization'],
//     credentials: true,
//     methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
//     preflightContinue: false
// };

app.use(cors())
app.use(cookieParser())
mongoose.connect(process.env.DB_URL,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
}).then((res)=>{
    console.log('Connected to the database')
}).catch((err)=>{
    console.log(err)
})

app.get('/private',authuser,(req,res)=>{
res.send('user authorized...')
})
app.get('/logout',(req,res)=>{
    res.clearCookie('jwtAuth')
    res.send('cookie was deleted')
})

app.use(express.json())
//context is away to pass data to all to the resolvers
const server=new ApolloServer({typeDefs,resolvers,context:({req,res})=>({req,res})})

server.applyMiddleware({app})
app.get('/',(req,res)=>{
    res.send('Hello from server to check graphql go to /graphql')
})
app.listen(port?port:3000,()=>{
    console.log(`listening in port ${port}`)
})


