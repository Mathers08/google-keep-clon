import React from 'react';
import './App.scss';
import { Header, Navbar } from "./components";
import "react-alert-confirm/dist/index.css";
import { Route, Routes } from "react-router-dom";
import { Archive, Home, Trash } from "./pages";

const App = () => {
  return (
    <div>
      <Header/>
      <main className="main">
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          {/*<Route path="/reminders" element={<Home/>}/>
          <Route path="/" element={<Home/>}/>*/}
          <Route path="archive" element={<Archive/>}/>
          <Route path="trash" element={<Trash/>}/>
        </Routes>
      </main>
    </div>
  );
};

export default App;
