import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Cards from './components/Cards/Cards';
import Form from './components/Form/Form';

const App = () => {
  return (
    <div>
      <nav className='navBar'>
        <Link to='/'>HOME</Link>
        <Link to='/form'>FORM</Link>
      </nav>
      <Routes>
        <Route path='/' element={<Cards />} />
        <Route path='/form' element={<Form />} />
      </Routes>
    </div>
  );
};

export default App;
