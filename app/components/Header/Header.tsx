'use client';

import React from 'react';
import Link from 'next/link';
import './Header.css';

// Temporary mock for useUser hook since we can't import it yet
const useUser = () => {
  return {
    isAuthenticated: false,
    logout: () => {}
  };
};

const Header: React.FC = () => {
  const { isAuthenticated, logout } = useUser();

  return (
    <header className="header">
      <div className="header__container container">
        <Link href="/" className="header__logo">
          <img src="/favicon.svg" alt="LearnGami" className="header__logo-img" />
        </Link>
        
        <nav className="header__nav">
          <ul className="header__nav-list">
            <li className="header__nav-item">
              <Link href="/" className="header__nav-link">
                Home
              </Link>
            </li>
            
            {isAuthenticated ? (
              <>
                <li className="header__nav-item">
                  <Link href="/curso" className="header__nav-link">
                    Cursos
                  </Link>
                </li>
                <li className="header__nav-item">
                  <Link href="/conta" className="header__nav-link">
                    Minha Conta
                  </Link>
                </li>
                <li className="header__nav-item">
                  <button 
                    onClick={logout}
                    className="header__nav-button header__nav-button--logout"
                  >
                    Sair
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="header__nav-item">
                  <Link href="/login" className="header__nav-link">
                    Entrar
                  </Link>
                </li>
                <li className="header__nav-item">
                  <Link href="/registro" className="header__nav-link">
                    Registrar
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;