import React,{useEffect,useState,useContext} from 'react'
import {QuizContext} from '../Helpers/Context'
import '../styles/Quiz.css'
function Quiz() {
    const [data,setdata]=useState(null)
    const [currentposition,setcurrentposition]=useState(0)
    const [inputanswer,setinputanswer]=useState('')
    const {score,setscore,Setgamestate,timeon,Settime,Setinterval,Settimeon}=useContext(QuizContext)
    useEffect(()=>{
        async function fetchdata(){
         const res=await fetch('https://opentdb.com/api.php?amount=10&type=multiple')
         const data=await res.json()
         setdata(data.results)
        }
        fetchdata()
       },[])
       useEffect(()=>{
     
        if(timeon){
            Setinterval(setInterval(()=>{
                Settime(prev=>prev+10)
            },10))
        }
       },[timeon])
       function handeldata(){
           if(data){
            function handelnext(e){
                e.preventDefault()
                if(currentposition===data.length-1){
                    setcurrentposition(0)

                }
                setcurrentposition(currentposition+1)
             }
            return (
                <>
                   <p>Q-{currentposition+1} : {data[currentposition].question}</p>
                    <div className='options'>
                        
                                <button onClick={(e)=>{ e.preventDefault()
                                 setinputanswer(data[currentposition].correct_answer)
                                 setscore(score+10)
                                }}>{data[currentposition].correct_answer}</button>
                                <button onClick={(e)=>{ e.preventDefault()
                                 setinputanswer(data[currentposition].incorrect_answers[0])
                                 
                                }} >{data[currentposition].incorrect_answers[0]}</button>
                                <button  onClick={(e)=>{ e.preventDefault()
                                 setinputanswer(data[currentposition].incorrect_answers[1])
                                 
                                }}>{data[currentposition].incorrect_answers[1]}</button>
                                <button onClick={(e)=>{ e.preventDefault()
                                 setinputanswer(data[currentposition].incorrect_answers[2])
                                 
                                }} >{data[currentposition].incorrect_answers[2]}</button>
                         {currentposition===data.length-1?<button onClick={(e)=>{
                             e.preventDefault()
                             Settimeon(false)
                             Setgamestate('endscreen')
                         }}>click to see the result</button>:<button onClick={handelnext}>Click to go to the next question</button> }
                        {/* {currentposition!==data.length-1?<button onClick={(e)=>{
                            Setgamestate('menu')
                            setscore(0)
                        }}>Click to re-start the quiz</button>:''} */}
                      
                     
                        
                    </div>
                </>
               
            )
           }else{
            return ''
         }
       }
    return (
        <div className='quiz'>
            {handeldata()}
        </div>
    )
}

export default Quiz
