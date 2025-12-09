"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import "./registro.css";

export default function RegistroPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("As senhas não coincidem");
      return;
    }
  };

  return (
    <div className="registro-page">
      <div className="registro-container">
        <div className="registro-card">
          <h1 className="registro-title">Registrar</h1>

          <form onSubmit={handleSubmit} className="registro-form">
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Nome
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-input"
                required
              />
            </div>

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

            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">
                Confirmar Senha
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="form-input"
                required
              />
            </div>

            {error && <div className="form-error">{error}</div>}

            <button
              type="submit"
              className="registro-button"
              disabled={loading}
            >
              {loading ? "Registrando..." : "Registrar"}
            </button>
          </form>

          <div className="registro-footer">
            <p>
              Já tem uma conta?
              <a href="/login" className="registro-link">
                Entrar
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
