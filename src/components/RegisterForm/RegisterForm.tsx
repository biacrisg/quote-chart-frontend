"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const validateEmail = (email: string): boolean => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!validateEmail(email)) {
      setMessage("Por favor, insira um email válido.");
      return;
    }

    setLoading(true);
    setMessage("");

    const formattedBirthdate = new Date(birthdate).toISOString().split("T")[0];

    const formData = {
      name,
      email,
      birthdate: formattedBirthdate,
      password,
    };

    try {
      const response = await fetch(
        "https://chart-app-currency-new-1cf60e87e39e.herokuapp.com/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao registrar o usuário");
      }

      setMessage(
        "Cadastro realizado com sucesso! Você será redirecionado para área de login."
      );
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      setMessage("Erro ao cadastrar o usuário. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-slate-200">
      <form
        className="bg-white p-10 rounded-lg w-[40rem] max-w-full flex justify-center items-center flex-col gap-3"
        onSubmit={handleSubmit}
      >
        <h2 className="font-bold text-xl mb-5">Criar uma nova conta</h2>
        {message && <div className="text-green-500 mb-4">{message}</div>}{" "}
        <label htmlFor="name" className="text-sm font-medium text-left w-full">
          Nome
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nome"
          className="input input-primary w-full"
        />
        <label htmlFor="email" className="text-sm font-medium text-left w-full">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="input input-primary w-full"
        />
        <label
          htmlFor="birthdate"
          className="text-sm font-medium text-left w-full"
        >
          Data de Nascimento
        </label>
        <input
          type="date"
          id="birthdate"
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
          className="input input-primary w-full"
          max={new Date().toISOString().split("T")[0]}
        />
        <label
          htmlFor="password"
          className="text-sm font-medium text-left w-full"
        >
          Nova senha
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Senha"
          className="input input-primary w-full"
        />
        <p>
          Ao clicar em Cadastre-se, você concorda com nossos Termos, Política de
          Privacidade e Política de Cookies.
        </p>
        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={loading}
        >
          {loading ? "Cadastrando..." : "Cadastre-se"}
        </button>
        <Link href="/" className="text-blue-500 cursor-pointer underline mt-2">
          Já tem uma conta?
        </Link>
      </form>
    </div>
  );
}
