import React,{useState, useContext} from 'react'
import {QuizContext} from '../Helpers/Context'
//import {gql,useMutation} from '@apollo/client'
import axios from 'axios'
import '../styles/Register.css'
import Cookies from 'universal-cookie';
function Register() {
   
 const {gamestate,Setgamestate,Setuseremail}=useContext(QuizContext)
    const [username,setname]=useState('')
    const [email,setemail]=useState('')
    const [password,setpassword]=useState('')
    const [dataresult,setdata]=useState(null)
    async function postData(){
       
        const data = await axios.post('http://localhost:3000/graphql',{
            query:`mutation($name:String! $email:String! $password:String!){
                Register(name:$name,email:$email,password:$password) {
               msg
               data{
                   name
                   email
               }
                token
              }
            
            }`,
            variables: {
                name:username,
                email,
                password
            }
          },
          {
              headers:{
                'Content-Type': 'application/json'
              }
          },
          { withCredentials: true }
          )
         const cookies = new Cookies();
         
        cookies.set('jwtAuth', data.data.data.Register.token,{maxAge:60*60*24*3});
          
        
         setdata(data.data.data.Register)
         if(data.data.data.Register.data){
            Setuseremail(data.data.data.Register.data.email)
        }
    }
   
   console.log(dataresult)
   if(dataresult){
    if(dataresult.msg==='User added'){
        Setgamestate('menu')
    }
   }
  
    return (
        <div className='register'>
            <h3>{dataresult?dataresult.msg:''}</h3>
            <form onSubmit={(e)=>{
                e.preventDefault()
                postData()}} className='form'>
                <span>Name :</span>
                <input onChange={(e)=>{setname(e.target.value)}} placeholder='enter your name'></input>
                <span>Email :</span>
                <input onChange={(e)=>{setemail(e.target.value)}} placeholder='enter your email'></input>
                <span>Password :</span>
                <input onChange={(e)=>{setpassword(e.target.value)}} type='password' placeholder='enter your password'></input>
                <button>Click to submit</button>
            </form>

            <button onClick={(e)=>{
                e.preventDefault()
                Setgamestate('login')
                }}>Or click to login</button>
        </div>
    )
}

export default Register





 // const [usercreated]=useMutation(CREATE_USER,{
    //     variables:{
    //       name:username,
    //       email,
    //       password
    //     }
    // })



    // const CREATE_USER=gql`
// # mutation($name:String! $email:String! $password:String!){
// #     Register(name:$name,email:$email,password:$password) {
// #    msg
// #    data{
// #        name
// #        email
// #    }
    
// #   }

// # }
// # `;
