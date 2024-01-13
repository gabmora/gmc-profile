import React from 'react';
import './Footer.css';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

function Footer() {
    return (
      <footer className="footer">
        <div className="icon-container">
        <a href="https://github.com/gabmora" target="_blank" rel="noopener noreferrer">
          <FaGithub size={30} /> {/* Adjust size as needed */}
        </a>
        <a href="https://www.linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer">
          <FaLinkedin size={30} /> {/* Adjust size as needed */}
        </a>
        </div>
      </footer>
    );
  }
  
  

  export default Footer; 