import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import Main from './Main';
import Footer from './components/Footer'
import Header from './components/Header'
import Contact from './components/Contact'

function App() {
  return (
    <div className="grid-container">
    <Router>
      <Header/>
      <Routes>
      <Route path="/" element={<Main />} />
        <Route path="/about" element={<Main />} />
        <Route path="/Contact" element={<Contact />} />

      </Routes>
        <p>test</p>
      <Footer/>
      <aside className="sidebar">Sidebar</aside>
    </Router>
    </div>
  );
}

export default App;
