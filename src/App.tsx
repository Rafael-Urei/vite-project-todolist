import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './routes/home';
import { Login } from './routes/login';
import { Todolist } from './routes/todolist';
import { Register } from './routes/register';
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from './firebase/firebase';
import { Welcome } from './routes/welcome';

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <Router>
          {user ? 
            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/Home' element={<Home/>}/>
              <Route path='/login' element={<Login/>}/>
              <Route path='/dashboard' element={<Todolist/>}/>
              <Route path='/register' element={<Register/>}/>
            </Routes>          
          : 
            <Routes>
              <Route path='/' element={<Welcome/>}/>
              <Route path='/Home' element={<Home/>}/>
              <Route path='/login' element={<Login/>}/>
              <Route path='/dashboard' element={<Home/>}/>
              <Route path='/register' element={<Register/>}/>
            </Routes>
          }
      </Router>
    </div>
  )
}

export default App
