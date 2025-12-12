"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "./Header.css";
import { useUser } from "../../UserContext";
import { logout as authLogout } from "../../services/authService";

const Header: React.FC = () => {
  const { user, isAuthenticated, logout } = useUser();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);
  const router = useRouter();

  const getUserFirstNames = () => {
    if (user?.name) {
      const nameParts = user.name.split(" ");
      const firstName = nameParts[0];
      const secondName = nameParts.length > 1 ? nameParts[1] : "";
      return {
        full: secondName ? `${firstName} ${secondName}` : firstName,
        first: firstName
      };
    }
    return { full: "", first: "" };
  };

  const handleLogout = () => {
    authLogout();
    logout();
    setIsDropdownOpen(false);
  };

  const handleDashboardClick = (e: React.MouseEvent) => {
    e.preventDefault();

    if (user?.role === "ADMIN") {
      router.push("/dashboard");
    } else {
      router.push("/curso");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const { full: fullUserName, first: firstUserName } = getUserFirstNames();

  return (
    <header className="header">
      <div className="header__container container">
        <Link href="/" className="header__logo">
          <img
            src="/favicon.svg"
            alt="LearnGami"
            width="32"
            height="32"
            className="header__logo-img"
          />
          <span className="header__logo-text">LearnGami</span>
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
                  <a
                    href={user?.role === "ADMIN" ? "/dashboard" : "/curso"}
                    className="header__nav-link"
                    onClick={handleDashboardClick}
                  >
                    {user?.role === "ADMIN" ? "Dashboard" : "Favoritos"}
                  </a>
                </li>
                <li className="header__nav-item" ref={dropdownRef}>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="header__nav-button header__user-dropdown"
                  >
                    <span className="user-name-full">{fullUserName}</span>
                    <span className="user-name-mobile">{firstUserName}</span> ▼
                  </button>
                  {isDropdownOpen && (
                    <div className="header__dropdown-menu">
                      <Link
                        href="/conta"
                        className="header__dropdown-link"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Minha Conta
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="header__dropdown-link header__dropdown-logout"
                      >
                        Sair
                      </button>
                    </div>
                  )}
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