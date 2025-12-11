"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { register, fetchUserData } from "../services/authService";
import { useUser } from "../UserContext";
import { isValidEmail } from "../utils/validators";

import AuthLayout from "../components/AuthLayout/AuthLayout";
import Input from "../components/ui/Input/Input";
import PasswordInput from "../components/ui/Input/PasswordInput";
import Button from "../components/ui/Button/Button";
import "./registro.css";

export default function RegistroPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { login: loginUser } = useUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      setError("Por favor, insira um endereço de email válido.");
      return;
    }

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

      if (data && data.token) {
        const userData = await fetchUserData(data.token);
        if (userData) {
          loginUser(userData);
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
    <AuthLayout
      title="Cadastre-se"
      imageSrc="https://images.pexels.com/photos/700413/pexels-photo-700413.jpeg"
      footerText="Já tem uma conta?"
      footerLinkText="Entrar"
      footerLinkHref="/login"
    >
      <form onSubmit={handleSubmit} className="auth-layout__form-wrapper">
        <Input
          id="name"
          type="text"
          label="Nome"
          placeholder="Digite seu nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

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

        <PasswordInput
          id="confirmPassword"
          label="Confirmar Senha"
          placeholder="Confirme sua senha"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        {error && <div className="auth-layout__error">{error}</div>}

        <Button type="submit" isLoading={loading}>
          Cadastre-se
        </Button>
      </form>
    </AuthLayout>
  );
}
