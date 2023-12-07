import React from 'react';
import './App.scss';
import { Header, Navbar } from "./components";
import "react-alert-confirm/dist/index.css";
import { Route, Routes } from "react-router-dom";
import { Archive, Labels, Home, Trash, CreatedLabels } from "./pages";
import { useSelector } from "react-redux";
import { selectNotes } from "./redux/notes/selectors";

const App = () => {
  const { labels } = useSelector(selectNotes);

  return (
    <div>
      <Header/>
      <main className="main">
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="archive" element={<Archive/>}/>
          <Route path="trash" element={<Trash/>}/>
          {labels && labels.map(label => (
            <Route path={`label/${label.title}`} element={<CreatedLabels label={label}/>}/>
          ))}
        </Routes>
        <Labels/>
      </main>
    </div>
  );
};

export default App;
