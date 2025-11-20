import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';


function PDFViewer() {
    const pdfFilePath = process.env.PUBLIC_URL + '/gabrielaMorales_cv.pdf';
    return (
      <div className="pdf-viewer">
        <iframe src={pdfFilePath} title="PDF Viewer" width="100%" height="600px" />
      </div>
    );
  }
function Header() {
  return (
    <header className="header">
      <Link to="/" style={{ textDecoration: 'none' }}>
        <div className="header-logo">GMC</div>
      </Link>
      <nav className="header-nav">
        <Link to="/" className="nav-link">
          About
        </Link>
        <Link to="/services" className="nav-link">
          Notary Services
        </Link>
        <Link to="/contact" className="nav-link">
          Contact
        </Link>
        <Link to="/pdf-viewer" className="resume-button">
          Resume
        </Link>
      </nav>
    </header>
  );
}

export {PDFViewer, Header};
