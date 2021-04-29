
import './App.css';
import Quiz from './Components/Quiz'
import EndScreen from './Components/EndScreen'
import Menu from './Components/Menu'
import {QuizContext} from './Helpers/Context'
import Register from './Components/Register'
import Login from './Components/Login'
import {useState} from 'react'
function App() {
  const [gamestate,Setgamestate]=useState('register')
  const [useremail,Setuseremail]=useState('')
  const [time,Settime]=useState(0)
  const [count,Setcount]=useState(0)
  const [interval,Setinterval]=useState(null)
  const [timeon,Settimeon]=useState(false)
  const [score,setscore]=useState(0)
  function handelgamestate(){
    if(gamestate==='register'){
     return <Register/>
    }
    else if(gamestate==='menu'){
      return <Menu/>
    }
    else if(gamestate==='endscreen'){
      return <EndScreen/>
    }
    else if(gamestate==='quiz'){
      return <Quiz/>
    }
    else if(gamestate==='login'){
      return <Login/>
    }
  }
  return (
    <div className="app">
      <p>Hello from quiz app, you can only attend the quiz two times after the two times you will loged out automatically</p>
     
  <QuizContext.Provider value={{
    gamestate,Setgamestate,
    score,setscore
    ,time,Settime,
    timeon,Settimeon
    ,interval,Setinterval,
    count,Setcount,
    useremail,Setuseremail
    }}>

      {handelgamestate()}

   </QuizContext.Provider> 
    </div>
  );
}

export default App;
