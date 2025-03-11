import React from 'react'
import Creators from './pages/Creators'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Header from './components/Header'

const App = () => {
  return (
    <div>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/creators' element={<Creators/>}/>
      </Routes>
    </div>
  )
}

export default App