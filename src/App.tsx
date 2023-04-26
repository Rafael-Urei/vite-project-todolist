import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './routes/home';
import { Login } from './routes/login';
import { Todolist } from './routes/todolist';
import { Register } from './routes/register';
import { Welcome } from './routes/welcome';

function App() {

  return (
    <div className="App">
      <Router>
          <Routes>
            <Route path='/' element={<Welcome/>}/>
            <Route path='/Home' element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/dashboard' element={<Todolist/>}/>
            <Route path='/register' element={<Register/>}/>
          </Routes>
      </Router>
    </div>
  )
}

export default App
