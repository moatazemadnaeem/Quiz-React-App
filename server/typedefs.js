const {gql}=require('apollo-server-express')

const typedefs=gql`

type Query{
    hello:String!
}
type User{
    name:String!
    email:String!
    password:String!
}
type Error{
    msg:String!
    data:User
    token:String
}
type Mutation{
    Register(name:String!, email:String!, password:String!):Error!
    Login(email:String!, password:String!):Error!
}
`

module.exports=typedefs;