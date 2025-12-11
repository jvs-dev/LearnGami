"use client";

import React, { useState } from "react";
import { useUser } from "../UserContext";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import "./conta.css";

export default function AccountPage() {
  const { user } = useUser();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");

  const handleSave = () => {
    // In a real application, you would send the updated data to the server here
    console.log("Saving user data:", { name, email });
    setEditing(false);
  };

  if (!user) {
    return (
      <>
        <Header />
        <div className="account">
          <div className="account__container">
            <div className="account__error">
              Você precisa estar logado para acessar esta página.
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="account">
        <div className="account__container">
          <h1 className="account__title">Minha Conta</h1>
          
          <div className="account__info">
            <div className="account__field">
              <label className="account__label">Nome:</label>
              {editing ? (
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="account__input"
                />
              ) : (
                <span className="account__value">{user.name}</span>
              )}
            </div>
            
            <div className="account__field">
              <label className="account__label">Email:</label>
              {editing ? (
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="account__input"
                />
              ) : (
                <span className="account__value">{user.email}</span>
              )}
            </div>
            
            <div className="account__field">
              <label className="account__label">Tipo de conta:</label>
              <span className="account__value">
                {user.role === "ADMIN" ? "Administrador" : "Usuário"}
              </span>
            </div>
            
            <div className="account__actions">
              {editing ? (
                <>
                  <button 
                    onClick={handleSave}
                    className="account__button account__button--save"
                  >
                    Salvar
                  </button>
                  <button 
                    onClick={() => {
                      setName(user.name);
                      setEmail(user.email);
                      setEditing(false);
                    }}
                    className="account__button account__button--cancel"
                  >
                    Cancelar
                  </button>
                </>
              ) : (
                <button 
                  onClick={() => setEditing(true)}
                  className="account__button account__button--edit"
                >
                  Editar Perfil
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}