"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { login, fetchUserData } from "../services/authService";
import { useUser } from "../UserContext";
import { isValidEmail } from "../utils/validators";

import AuthLayout from "../components/AuthLayout/AuthLayout";
import Input from "../components/ui/Input/Input";
import PasswordInput from "../components/ui/Input/PasswordInput";
import Button from "../components/ui/Button/Button";

import "../components/AuthLayout/AuthLayout.css";
import "./login.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const { login: loginUser } = useUser();

  const redirectUrl = searchParams.get('redirect') || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!isValidEmail(email)) {
      setError("Por favor, insira um endereço de email válido.");
      setLoading(false);
      return;
    }

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
          router.push(redirectUrl);
        }
      }
    } catch (err) {
      setError("Erro ao fazer login. Tente novamente.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Entrar"
      imageSrc="https://images.pexels.com/photos/700413/pexels-photo-700413.jpeg"
      footerText="Não tem uma conta?"
      footerLinkText="Registre-se"
      footerLinkHref="/registro"
    >
      <form onSubmit={handleSubmit} className="auth-layout__form-wrapper">
        <Input
          id="email"
          type="email"
          label="Email"
          placeholder="Digite seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <PasswordInput
          id="password"
          label="Senha"
          placeholder="Digite sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <div className="auth-layout__error">{error}</div>}

        <Button type="submit" isLoading={loading}>
          Entrar
        </Button>
      </form>
    </AuthLayout>
  );
}