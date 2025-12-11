"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import "./registro.css";
import { register, fetchUserData } from "../services/authService";
import { useUser } from "../UserContext";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function RegistroPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { login: loginUser } = useUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("As senhas não coincidem");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const { data, error: apiError } = await register(name, email, password);

      if (apiError) {
        setError(apiError);
        setLoading(false);
        return;
      }

      // Fetch user data after successful registration
      if (data && data.token) {
        const userData = await fetchUserData(data.token);
        if (userData) {
          loginUser(userData);
          // Redirect to home page after successful registration
          router.push("/");
        }
      }
    } catch (err) {
      setError("Erro ao registrar usuário. Tente novamente.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="registro">
      <div className="registro__container">
        <div className="registro__logo-container">
          <img
            src="./favicon.svg"
            alt="LearnGami Logo"
            className="registro__logo"
          />
          <h1 className="registro__logo-title">LearnGami</h1>
        </div>
        <div className="registro__card">
          <h1 className="registro__title title">Cadastre-se</h1>

          <form onSubmit={handleSubmit} className="registro__form">
            <div className="registro__form-group">
              <label htmlFor="name" className="registro__label">
                Nome
              </label>
              <input
                id="name"
                type="text"
                placeholder="Digite seu nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="registro__input"
                required
              />
            </div>

            <div className="registro__form-group">
              <label htmlFor="email" className="registro__label">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Digite seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="registro__input"
                required
              />
            </div>

            <div className="registro__form-group">
              <label htmlFor="password" className="registro__label">
                Senha
              </label>
              <div className="registro__password-container">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Digite sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="registro__input registro__input--password"
                  required
                />
                <button
                  type="button"
                  className="registro__password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                >
                  <i
                    className={showPassword ? "bi bi-eye-slash" : "bi bi-eye"}
                  ></i>
                </button>
              </div>
            </div>

            <div className="registro__form-group">
              <label htmlFor="confirmPassword" className="registro__label">
                Confirmar Senha
              </label>
              <div className="registro__password-container">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirme sua senha"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="registro__input registro__input--password"
                  required
                />
                <button
                  type="button"
                  className="registro__password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={
                    showConfirmPassword ? "Ocultar senha" : "Mostrar senha"
                  }
                >
                  <i
                    className={
                      showConfirmPassword ? "bi bi-eye-slash" : "bi bi-eye"
                    }
                  ></i>
                </button>
              </div>
            </div>

            {error && <div className="registro__error">{error}</div>}

            <button
              type="submit"
              className="registro__button"
              disabled={loading}
            >
              {loading ? "Registrando..." : "Cadastre-se"}
            </button>
          </form>

          <div className="registro__footer">
            <p>
              Já tem uma conta?{" "}
              <a href="/login" className="registro__link">
                Entrar
              </a>
            </p>
          </div>
        </div>
        <div className="registro__image-container">
          <img
            src="https://images.pexels.com/photos/700413/pexels-photo-700413.jpeg"
            alt="Registro illustration"
            className="registro__image"
          />
        </div>
      </div>
    </div>
  );
}