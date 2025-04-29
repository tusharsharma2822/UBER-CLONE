import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Start from './Pages/Start';
import UserLogin from './Pages/UserLogin';
import UserRegister from './Pages/UserRegister';
import CaptainLogin from './Pages/CaptainLogin';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Start /> } />
        <Route path='/login' element={ <UserLogin />} />
        <Route path='/register' element={ <UserRegister />} />
        <Route path='/captain-login' element={ <CaptainLogin /> } />
      </Routes>
    </BrowserRouter>
  )
}

export default App