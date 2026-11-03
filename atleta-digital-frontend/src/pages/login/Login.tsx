import React, {type ChangeEvent, type SyntheticEvent, useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'

import {Button, Card, Spinner} from 'flowbite-react';
import type {UsuarioLogin} from "../../models/UsuarioLogin.ts";
import {useAuth} from "../../contexts/UseAuth.ts";
import TextInputField from "../../components/form/TextInputField.tsx";

export default function Login() {

  const navigate = useNavigate();
  const {handleLogin, isLoading, isAuthenticated} = useAuth();

  const [usuarioLogin, setUsuarioLogin] = useState<Partial<UsuarioLogin>>({});

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuarioLogin({
      ...usuarioLogin,
      [e.target.name]: e.target.value
    });
  }

  async function login(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    await handleLogin(usuarioLogin);
  }

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home');
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      <div className='pt-32 pb-20 px-4 min-h-screen flex justify-center items-start'>
        <Card className="w-full max-w-md shadow-lg border-gray-200 dark:bg-gray-800 p-4">
          <h2 className="text-4xl font-semibold text-center text-gray-900 dark:text-gray-100 mb-6">
            Entrar
          </h2>

          <form className="flex flex-col gap-4" onSubmit={login}>

            <TextInputField
              label="E-mail"
              name="email"
              type="email"
              placeholder="Digite seu e-mail"
              value={usuarioLogin.email || ""}
              onChange={atualizarEstado}
              required
            />

            <TextInputField
              label="Senha"
              name="senha"
              type="password"
              placeholder="Digite sua senha"
              value={usuarioLogin.senha || ""}
              onChange={atualizarEstado}
              required
            />

            <Button
              type="submit"
              color="green"
              className="w-full mt-4 cursor-pointer focus:outline-none focus:ring-0"
              disabled={isLoading}
            >
              {isLoading ? <Spinner size="sm" className="mr-2" light/> : null}
              Acessar Plataforma
            </Button>

          </form>
        </Card>
      </div>
    </>
  )
}