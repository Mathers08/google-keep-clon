import React from 'react';
import './App.scss';
import { Header, Navbar, Notes } from "./components";
import "react-alert-confirm/dist/index.css";

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
