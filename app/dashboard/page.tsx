"use client";

import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import "./dashboard.css";

export default function DashboardPage() {
  return (
    <ProtectedRoute requiredRole="ADMIN">
      <Header />
      <div className="dashboard">
        <div className="dashboard__container">
          <h1 className="dashboard__title">Painel de Administração</h1>
          <div className="dashboard__content">
            <div className="dashboard__card">
              <h2 className="dashboard__card-title">Bem-vindo ao Painel de Administração</h2>
              <p className="dashboard__card-description">
                Você está no painel de administração. Aqui você pode gerenciar cursos, usuários e outras configurações do sistema.
              </p>
            </div>
            
            <div className="dashboard__stats">
              <div className="dashboard__stat-card">
                <h3 className="dashboard__stat-title">Cursos</h3>
                <p className="dashboard__stat-value">0</p>
              </div>
              
              <div className="dashboard__stat-card">
                <h3 className="dashboard__stat-title">Usuários</h3>
                <p className="dashboard__stat-value">0</p>
              </div>
              
              <div className="dashboard__stat-card">
                <h3 className="dashboard__stat-title">Aulas</h3>
                <p className="dashboard__stat-value">0</p>
              </div>
            </div>
            
            <div className="dashboard__actions">
              <button className="dashboard__action-button">
                Gerenciar Cursos
              </button>
              <button className="dashboard__action-button">
                Gerenciar Usuários
              </button>
              <button className="dashboard__action-button">
                Configurações
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </ProtectedRoute>
  );
}