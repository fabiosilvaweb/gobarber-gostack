import React, { useCallback, useRef } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import * as Styled from './styles';
import getValidationErrors from '../../utils/getValidationErrors';

import { Link } from 'react-router-dom';

import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import { useAuth } from '../../hooks/AuthContext';

import logo from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';

interface SignInFormData{
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
 const formRef = useRef<FormHandles>(null);
 const { signIn } = useAuth();

 const handleSubmit = useCallback(async (data: SignInFormData) => {
  try {
    formRef.current?.setErrors({});

    const schema = Yup.object().shape({
      email: Yup.string().required("E-mail Obrigatório").email("E-mail Inválido"),
      password: Yup.string().required("Senha Obrigatória")
    });

    await schema.validate(data, {
      abortEarly: false
    });

    signIn({
      email: data.email,
      password: data.password
    });

  } catch(err) {
    const errors = getValidationErrors(err);

    formRef.current?.setErrors(errors);
  }
 },[signIn]);

  return (
    <Styled.Container>
      <Styled.Content>
        <Styled.AnimationContent>
          <img src={logo} alt="GoBarber"/>
          <Form ref={formRef} onSubmit={handleSubmit}>
            
            <h1>Faça seu logon</h1>

            <Input name="email" icon={FiMail} placeholder="Digite seu e-mail" />

            <Input name="password" type="password" icon={FiLock}  placeholder="Digite sua senha" />

            <Button type="submit">Entrar</Button>

            <a href="forgot">Esqueci minha senha</a>
            
          </Form>
        </Styled.AnimationContent>
        <Link to="/cadastre-se">
          <FiLogIn/>
          Criar conta
        </Link>
      </Styled.Content>
      <Styled.Background />
    </Styled.Container>
  );
}

export default SignIn;
