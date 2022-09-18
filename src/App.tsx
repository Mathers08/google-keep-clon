import React from 'react';
import './App.scss';
import { Header, Navbar } from "./components";
import "react-alert-confirm/dist/index.css";
import { Route, Routes } from "react-router-dom";
import { Archive, Labels, Home, Trash } from "./pages";

const App = () => {
  return (
    <div>
      <Header/>
      <main className="main">
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="labels" element={<Labels/>}/>
          <Route path="archive" element={<Archive/>}/>
          <Route path="trash" element={<Trash/>}/>
        </Routes>
        <Labels/>
      </main>
    </div>
  );
};

export default App;
