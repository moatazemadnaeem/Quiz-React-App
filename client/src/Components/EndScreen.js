import React,{useContext,useEffect} from 'react'
import '../styles/EndScreen.css'
import axios from 'axios'
import Cookies from 'universal-cookie';
import {QuizContext} from '../Helpers/Context'
function EndScreen() {
    //time,Settime,timeon,Settimeon
    async function removejwt(){
        const data=await axios.get('http://localhost:3000/logout')
        console.log(data.data)
        if(data.data==='cookie was deleted'){
            const cookie=new Cookies()
            cookie.remove('jwtAuth')
        }
    }
  const {score,Setgamestate,setscore,time,timeon,interval,Settime,count,Setcount,Setuseremail}= useContext(QuizContext)
  useEffect(()=>{
    if(!timeon){
        clearInterval(interval)
    }
   
    },[timeon])

    return (
        <div className='endscreen'>
            <h2>Your score is {score}, You answered {score/10} questions from 10 in {time/1000}s</h2>
            <button onClick={(e)=>{
                 if(count===1){
                    Setuseremail('')
                    setscore(0)
                    Settime(0)
                    Setcount(0)
                    removejwt()
                    Setgamestate('register')
                }else{
                    Setcount(count+1)
                    Setgamestate('menu')
                    setscore(0)
                    Settime(0)
                }
                }}>Click to re-start the quiz</button>
        </div>
    )
}

export default EndScreen
