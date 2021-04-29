import React,{useContext,useEffect,useState} from 'react'
import {QuizContext} from '../Helpers/Context'
import Cookies from 'universal-cookie';
import '../styles/Menu.css'
import axios from 'axios'
function Menu() {
    const {Setgamestate,Settimeon,Settime,count,Setcount,Setuseremail,useremail}=useContext(QuizContext)
 const [auth,setauth]=useState(null)
//time,Settime,timeon,Settimeon
useEffect(()=>{
    async function fetchdata(){
        const cookies = new Cookies();
        const token=cookies.get('jwtAuth')
        if(token){
            const data=await axios.get('http://localhost:3000/private',{headers:{'jwtAuth':token}})
            //user authorized...
            console.log(data)
            setauth(data.data)
           
        }
        else{
           // setauth('')
          
           Setgamestate('register') 
        }
       
    }
    fetchdata()
    },[])
  if(auth){
    if(auth.toString()!=='user authorized...'){
     //   console.log('asdasddfasfadsasd.....') 
         Setgamestate('register')
     }
  }
  async function removejwt(){
      const data=await axios.get('http://localhost:3000/logout')
      console.log(data.data)
      if(data.data==='cookie was deleted'){
          const cookie=new Cookies()
          cookie.remove('jwtAuth')
      }
  }
    return (
        
        <div className='menu'>
            <p>Hello {useremail}</p>
            <p>This is the quiz number {count+1} </p>
            <button onClick={(e)=>{
                Setgamestate('quiz')
                Settimeon(true)
                }}>Start the quiz.</button>
                <button onClick={(e)=>{
                Setuseremail('')
                Setcount(0)
                Settimeon(false)
                Settime(0)
                removejwt()
                Setgamestate('register')
                }}>Click to Log out.</button>
        </div>
    )
}

export default Menu
