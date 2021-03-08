import React from 'react';
import { FiArrowLeft, FiUser, FiMail, FiLock } from 'react-icons/fi';
import * as Styled from './styles';

import { Form } from '@unform/web';

import logo from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';

const SignUp: React.FC = () => {

  function handleSubmit() {

  }

  return (
    <Styled.Container>
      <Styled.Background />
      <Styled.Content>
        <img src={logo} alt="GoBarber"/>
        <Form onSubmit={handleSubmit}>
          <h1>Faça seu cadastro</h1>

          <Input name="email" icon={FiUser} placeholder="Nome" />

          <Input name="email" icon={FiMail} placeholder="E-mail" />

          <Input type="password" icon={FiLock} name="password" placeholder="Senha" />

          <Button>Cadastrar</Button>

        </Form>
        <a href="/criar-conta">
          <FiArrowLeft/>
          Voltar para o login
        </a>
      </Styled.Content>
      
    </Styled.Container>
  );
}

export default SignUp;
