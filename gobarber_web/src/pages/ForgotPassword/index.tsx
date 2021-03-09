import React, { useCallback, useRef, useState } from 'react';
import { FiLogIn, FiMail } from 'react-icons/fi';
import * as Styled from './styles';
import getValidationErrors from '../../utils/getValidationErrors';

import { Link } from 'react-router-dom';

import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import { useToast } from '../../hooks/Toast'; 

import logo from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';
import api from '../../services/api';

interface SignInFormData{
  email: string;
  password: string;
}

const ForgotPassword: React.FC = () => {
 const [loading, setLoading] = useState<boolean>(false);
 const formRef = useRef<FormHandles>(null);

 const { addToast } = useToast();

 const handleSubmit = useCallback(async (data: SignInFormData) => {
  try {
    setLoading(true);
    formRef.current?.setErrors({});

    const schema = Yup.object().shape({
      email: Yup.string().required("E-mail Obrigatório").email("E-mail Inválido")
    });

    await schema.validate(data, {
      abortEarly: false
    });

    await api.post("/password/forgot", {
      email: data.email
    });

    addToast({
      type: 'success',
      title: 'E-mail de recuperação enviado!',
      description: 'Enviamos um e-mail para confirmar a recuperação de senha, verifique sua caixa de entrada.'
    });

  } catch(err) {
    if (err instanceof Yup.ValidationError) {
      const errors = getValidationErrors(err);

      formRef.current?.setErrors(errors);
      return;
    }

    addToast({
      type: 'error',
      title: 'Erro na recuperação de senha',
      description: 'Ocorreu um erro ao tentar ao realizar a recuperação de senha.'
    });
    
  } finally {
    setLoading(false)
  }
 },[ addToast]);

  return (
    <Styled.Container>
      <Styled.Content>
        <Styled.AnimationContent>
          <img src={logo} alt="GoBarber"/>
          <Form ref={formRef} onSubmit={handleSubmit}>
            
            <h1>Recuperar Senha</h1>

            <Input name="email" icon={FiMail} placeholder="Digite seu e-mail" />

            <Button loading={loading} type="submit">Recuperar</Button>
            
          </Form>
        </Styled.AnimationContent>
        <Link to="/">
          <FiLogIn/>
          Acessar conta
        </Link>
      </Styled.Content>
      <Styled.Background />
    </Styled.Container>
  );
}

export default ForgotPassword;
