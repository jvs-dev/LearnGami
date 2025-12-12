"use client";

import React, { useState } from "react";
import { useUser } from "../UserContext";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Input from "../components/ui/Input/Input";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./conta.css";

export default function AccountPage() {
  const { user } = useUser();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");

  const handleSave = () => {    
    setEditing(false);
  };

  if (!user) {
    return (
      <>
        <Header />
        <div className="account">
          <div className="account__container">
            <div className="account__error">
              <i className="bi bi-exclamation-circle account__error-icon"></i>
              <p>Você precisa estar logado para acessar esta página.</p>
              <a href="/login" className="account__error-link">Ir para login</a>
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
          <div className="account__header">
            <div className="account__avatar">
              <i className="bi bi-person-circle"></i>
            </div>
            <h1 className="account__title">Minha Conta</h1>
            <p className="account__subtitle">Gerencie suas informações pessoais</p>
          </div>
          
          <div className="account__content">
            <div className="account__info">
              <div className="account__field">
                <label className="account__label">Nome</label>
                {editing ? (
                  <Input
                    id="name"
                    label="Nome"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Digite seu nome"
                  />
                ) : (
                  <div className="account__value">
                    <span>{user.name}</span>
                  </div>
                )}
              </div>
              
              <div className="account__field">
                <label className="account__label">Email</label>
                {editing ? (
                  <Input
                    id="email"
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Digite seu email"
                  />
                ) : (
                  <div className="account__value">
                    <span>{user.email}</span>
                  </div>
                )}
              </div>
              
              <div className="account__field">
                <label className="account__label">Tipo de conta</label>
                <div className="account__value">
                  <span className={`account__role account__role--${user.role.toLowerCase()}`}>
                    {user.role === "ADMIN" ? "Administrador" : "Usuário"}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="account__actions">
              {editing ? (
                <div className="account__button-group">
                  <button 
                    onClick={handleSave}
                    className="account__button account__button--save"
                  >
                    <i className="bi bi-check-circle"></i>
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
                    <i className="bi bi-x-circle"></i>
                    Cancelar
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => setEditing(true)}
                  className="account__button account__button--edit"
                >
                  <i className="bi bi-pencil"></i>
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