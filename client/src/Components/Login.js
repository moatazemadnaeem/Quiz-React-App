import React,{useState, useContext} from 'react'
import {QuizContext} from '../Helpers/Context'
//import {gql,useMutation} from '@apollo/client'
import axios from 'axios'
import '../styles/Login.css'
import Cookies from 'universal-cookie';
function Login() {
   
 const {gamestate,Setgamestate,Setuseremail}=useContext(QuizContext)
    const [email,setemail]=useState('')
    const [password,setpassword]=useState('')
    const [dataresult,setdata]=useState(null)
    async function postData(){
       
        const data = await axios.post('http://localhost:3000/graphql',{
            query:`mutation($email:String! $password:String!){
                Login(email:$email,password:$password) {
               msg
               data{
                   name
                   email
               }
                token
              }
            
            }`,
            variables: {
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
         
         cookies.set('jwtAuth', data.data.data.Login.token,{maxAge:60*60*24*3});
          //msg token data->name,email
            setdata(data.data.data.Login)
            if(data.data.data.Login.data){
                Setuseremail(data.data.data.Login.data.email)
            }
          
    
        // console.log(data.data.data.Login)
    }
   
   console.log(`dataresult is ${dataresult}`)
   if(dataresult){
    if(dataresult.msg==='user loged in congratulations...'){
        Setgamestate('menu')
    }
   }
  console.log(dataresult)
    return (
        <div className='login'>
            <h3>{dataresult?dataresult.msg:''}</h3>
            <form onSubmit={(e)=>{
                e.preventDefault()
                postData()}} className='form'>
                <span>Email :</span>
                <input onChange={(e)=>{setemail(e.target.value)}} placeholder='enter your email'></input>
                <span>Password :</span>
                <input onChange={(e)=>{setpassword(e.target.value)}} type='password' placeholder='enter your password'></input>
                <button>Click to submit</button>
            </form>
            
            <button onClick={(e)=>{
                e.preventDefault()
                Setgamestate('register')
                }}>Or click to register</button>
        </div>
    )
}

export default Login





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
