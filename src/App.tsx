import React from 'react';
import './App.scss';
import { Header, Navbar, Notes } from "./components";

const App = () => {
  return (
    <div>
      <Header/>
      <main className="main">
        <Navbar/>
        <Notes/>
      </main>
    </div>
  );
};

export default App;
