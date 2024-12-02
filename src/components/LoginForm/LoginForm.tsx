"use client";

import Link from "next/link";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import Cookie from "js-cookie";

export default function LoginForm() {
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function login(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      const res = await fetch(
        "https://chart-app-currency-new-1cf60e87e39e.herokuapp.com/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!res.ok) {
        throw new Error("Erro na autenticação");
      }

      setMessage("Login realizado com sucesso!");
      setError(null);

      const response = await signIn("credentials", {
        redirect: false,
        credentials: {
          email: data.email,
          password: data.password,
        },
      });

      if (response?.error) {
        setError("Erro na autenticação");
        setMessage(null);
      } else {
        Cookie.set("authToken", "userAuthenticated", { expires: 7 });
        window.location.href = "/quote";
      }
    } catch (error) {
      setError("Erro ao realizar o login. Verifique suas credenciais.");
      setMessage(null);
    }
  }

  return (
    <form
      onSubmit={login}
      className="bg-white p-10 rounded-lg w-full sm:w-4/5 md:w-1/2 lg:w-1/3 flex justify-end items-center flex-col gap-3"
    >
      <h2 className="font-bold text-xl mb-5">Faça seu Login</h2>

      {message && <div className="text-green-500">{message}</div>}
      {error && <div className="text-red-500">{error}</div>}

      <input
        type="email"
        name="email"
        placeholder="Email ou CPF"
        className="input input-primary w-full"
      />
      <input
        type="password"
        name="password"
        placeholder="Senha"
        className="input input-primary w-full"
      />
      <button className="w-full bg-blue-300 hover:bg-blue-400 text-white py-2 px-4 rounded">
        Entrar
      </button>

      <Link
        href="/register"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded flex justify-center items-center"
      >
        Criar nova conta
      </Link>

      <span
        className="text-blue-500 cursor-pointer underline mt-2"
        title="Contate o administrador do sistema"
      >
        Esqueceu a senha?
      </span>
    </form>
  );
}
