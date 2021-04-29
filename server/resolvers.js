
const {Register,Login}=require('./controllers/controller')


const resolvers={
    Query:{
        hello:()=>'hello from graphql...'
    },
    Mutation:{
        Register,
        Login
    }
}

module.exports=resolvers;