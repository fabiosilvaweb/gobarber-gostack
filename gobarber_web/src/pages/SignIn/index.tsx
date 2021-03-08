import React from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import * as Styled from './styles';

import logo from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';

const SignIn: React.FC = () => {

  function handleSubmit() {

  }

  return (
    <Styled.Container>
      <Styled.Content>
        <img src={logo} alt="GoBarber"/>
        <form onSubmit={handleSubmit}>
          <h1>Faça seu logon</h1>

          <Input name="email" icon={FiMail} placeholder="Digite seu e-mail" />

          <Input type="password" icon={FiLock} name="password" placeholder="Digite sua senha" />

          <Button>Entrar</Button>

          <a href="forgot">Esqueci minha senha</a>

        </form>
        <a href="/criar-conta">
          <FiLogIn/>
          Criar conta
        </a>
      </Styled.Content>
      <Styled.Background />
    </Styled.Container>
  );
}

export default SignIn;
