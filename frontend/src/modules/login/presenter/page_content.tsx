"use client";

import { useAuth } from "@/modules/auth";
import {
  AppImage,
  Button,
  CheckboxInput,
  Column,
  Icon,
  Input,
  Row,
} from "@/modules/common";
import { useState } from "react";

export function LoginPageContent() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState<string>("user@email.com");
  const [password, setPassword] = useState<string>("12345678");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) return;

    await signIn({ email: email, password: password });
  }

  return (
    <div className="flex flex-col w-full h-full sm:flex-row">
      <div className="flex h-2/5 bg-white sm:bg-gray-200 sm:w-2/5 sm:h-full justify-center items-center">
        <AppImage
          src={UriAssets.accountingLogo}
          height={128}
          width={256}
          className="w-2/5 sm:w-3/5"
          alt="Accounting logo"
        />
      </div>
      <div className="flex h-3/5 sm:w-3/5 sm:h-full bg-white justify-center items-start sm:items-center">
        <form onSubmit={handleSubmit}>
          <Column className="justify-center items-stretch w-96 h-min gap-6">
            <h1 className="text-app-lime font-bold text-start text-xl">
              Faça seu login
            </h1>
            <Input
              prefix={<Icon name="mail" className="text-xl text-gray-400" />}
              placeholder="Digite seu e-mail"
              className="text-base"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              prefix={<Icon name="lock" className="text-xl text-gray-400" />}
              placeholder="Digite sua senha"
              type="password"
              className="text-base"
              obscureText={true}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Row className="justify-between">
              <Row className="justify-start gap-2">
                <CheckboxInput sizeStyle="h-4" />
                <span className="text-sm text-gray-400 font-medium">
                  Lembrar-me
                </span>
              </Row>
              <Button className="underline text-blue-600 text-sm" type="button">
                Esqueci minha senha
              </Button>
            </Row>
            <Button
              className="bg-app-lime text-white font-bold py-3 px-6 rounded-xl text-sm"
              type="submit"
            >
              Entrar
            </Button>
          </Column>
        </form>
      </div>
    </div>
  );
}
