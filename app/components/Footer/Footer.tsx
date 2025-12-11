'use client';

import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer__container container">
        <div className="footer__content">
          <p className="footer__copyright">
            © {new Date().getFullYear()} JVS-DEV. Todos os direitos reservados.
          </p>
          <nav className="footer__nav">
            <ul className="footer__nav-list">
              <li className="footer__nav-item">
                <a href="#" className="footer__nav-link">
                  Termos de Uso
                </a>
              </li>
              <li className="footer__nav-item">
                <a href="#" className="footer__nav-link">
                  Política de Privacidade
                </a>
              </li>
              <li className="footer__nav-item">
                <a href="#" className="footer__nav-link">
                  Contato
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;