import './App.css'

import { Login } from './components/login'
import { Home } from './homePage/home';
import { NavBar } from './components/navBar';
import {Route, Routes, BrowserRouter as Router} from "react-router-dom"
import { Zaps } from './homePage/createZaps';
import { Popular } from './filterPages/popular';


function App() {


  return (

      <div className='App text-center'>
      <Router>
        <NavBar/>
        <Routes>
          <Route path='/' element={<Home/>} ></Route>
          <Route path='login.tsx' element={<Login/>} ></Route>
          <Route path='createZaps.tsx' element={<Zaps/>} ></Route>
          <Route path='popular.tsx' element={<Popular/>}/>
        </Routes>
      </Router>
  

      </div>

  )
}

export default App
