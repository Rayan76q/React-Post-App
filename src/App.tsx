import React from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import './styles/App.css';
import {Main} from "./pages/main/main"
import {Login} from "./pages/login"
import { CreatePost } from './pages/Create-post/createPost';
import {Navbar} from "./components/navbar"

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Main/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/createposte" element={<CreatePost/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
