import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';


function PDFViewer() {
    const pdfFilePath = process.env.PUBLIC_URL + '/gmorales_CV.pdf';
    return (
      <div className="pdf-viewer">
        <iframe src={pdfFilePath} title="PDF Viewer" width="100%" height="600px" />
      </div>
    );
  }
function Header() {
  return (
    <header className="header">
      <Link to="/" className="logo-link">
        <div className="header-logo"></div>
      </Link>
      <nav className="header-nav">
        <Link to="/about" className="nav-link">
          About
        </Link>
        <Link to="/services" className="nav-link">
          Notary Services
        </Link>
        <Link to="/contact" className="nav-link">
          Contact
        </Link>
        <Link to="/pdf-viewer" className="nav-link">
          <button className="resume-button">CHECK OUT MY RESUME</button>
        </Link>
      </nav>
    </header>
  );
}

export {PDFViewer, Header};
