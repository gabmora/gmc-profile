import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Main from './Main';
import Footer from './components/Footer';
import { Header, PDFViewer } from './components/Header';
import Contact from './components/Contact';
import Services from './components/Services';
import Weather from './components/Weather';
import SidebarWithWeather from './components/SidebarWithWeather';


function App() {
  return (
    <div className="grid-container">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/about" element={<Main />} />
          <Route path="/Services" element={<Services />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/pdf-viewer" element={<PDFViewer />} /> 
        </Routes>
        <Footer />
        <aside className="sidebar">
          <SidebarWithWeather />
        </aside>
      </Router>
    </div>
  );
}

export default App;
