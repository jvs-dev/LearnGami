"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import "./login.css";
import Header from "../components/Header/Header";
import { login, fetchUserData } from "../services/authService";
import { useUser } from "../UserContext";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { login: loginUser } = useUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const { data, error: apiError } = await login(email, password);

      if (apiError) {
        setError(apiError);
        setLoading(false);
        return;
      }

      if (data && data.token) {
        const userData = await fetchUserData(data.token);
        if (userData) {
          loginUser(userData);
        }
      }

      router.push("/"); // Redirect to home page after successful login
    } catch (err) {
      setError("Erro ao fazer login. Tente novamente.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="login">
        <div className="login__container">
          <div className="login__logo-container">
            <img
              src="./favicon.svg"
              alt="LearnGami Logo"
              className="login__logo"
            />
            <h1 className="login__logo-title">LearnGami</h1>
          </div>
          <div className="login__card">
            <h1 className="login__title title">Entrar</h1>

            <form onSubmit={handleSubmit} className="login__form">
              <div className="login__form-group">
                <label htmlFor="email" className="login__label">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Digite seu email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="login__input"
                  required
                />
              </div>

              <div className="login__form-group">
                <label htmlFor="password" className="login__label">
                  Senha
                </label>
                <div className="login__password-container">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Digite sua senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="login__input login__input--password"
                    required
                  />
                  <button
                    type="button"
                    className="login__password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={
                      showPassword ? "Ocultar senha" : "Mostrar senha"
                    }
                  >
                    <i
                      className={showPassword ? "bi bi-eye-slash" : "bi bi-eye"}
                    ></i>
                  </button>
                </div>
              </div>

              {error && <div className="login__error">{error}</div>}

              <button
                type="submit"
                className="login__button"
                disabled={loading}
              >
                {loading ? "Entrando..." : "Entrar"}
              </button>
            </form>

            <div className="login__footer">
              <p>
                Não tem uma conta?{" "}
                <a href="/registro" className="login__link">
                  Registre-se
                </a>
              </p>
            </div>
          </div>
          <div className="login__image-container">
            <img
              src="https://images.pexels.com/photos/700413/pexels-photo-700413.jpeg"
              alt="Login illustration"
              className="login__image"
            />
          </div>
        </div>
      </div>
    </>
  );
}
