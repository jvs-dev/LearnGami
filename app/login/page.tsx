"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import "./login.css";
import Header from "../components/Header/Header";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <>
      <Header />
      <div className="login-page">
        <div className="login-container">
          <div className="login-card">
            <h1 className="login-title">Entrar</h1>

            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  Senha
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input"
                  required
                />
              </div>

              {error && <div className="form-error">{error}</div>}

              <button type="submit" className="login-button" disabled={loading}>
                {loading ? "Entrando..." : "Entrar"}
              </button>
            </form>

            <div className="login-footer">
              <p>
                Não tem uma conta?{" "}
                <a href="/registro" className="login-link">
                  Registre-se
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
