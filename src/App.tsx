import React from 'react';
import './App.css';
import Main from './components/Main/index.tsx';
import Header from './components/Header/index.tsx';

function App() {

  return (
    <div className='appContainer'>
      <Header></Header>
      <Main></Main>
    </div>
  );
}

export default App;
