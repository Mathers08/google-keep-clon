import React from 'react';
import './App.scss';
import { Header, Navbar, Notes } from "./components";
import alertConfirm from "react-alert-confirm";
import "react-alert-confirm/dist/index.css";

alertConfirm.config({
  lang: "en"
});

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
