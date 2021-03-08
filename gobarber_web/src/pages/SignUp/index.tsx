import React, { useCallback, useRef } from 'react';
import { FiArrowLeft, FiUser, FiMail, FiLock } from 'react-icons/fi';

import { FormHandles } from '@unform/core';
import getValidationErrors from '../../utils/getValidationErrors';

import { Form } from '@unform/web';
import * as Yup from "yup";
import api from '../../services/api';

import * as Styled from './styles';
import logo from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: SignUpFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required("Nome é obrigatório"),
        email: Yup.string().required("E-mail é obrigatório").email("E-mail Inválido!"),
        password: Yup.string().min(6, "A senha requer ao menos 6 dígitos"),
      });

      await schema.validate(data, {
        abortEarly: false
      });

      const response = await api.post("/users", {
        name: data.name,
        email: data.email,
        password: data.password,
      });

      console.log(response);

    } catch(err) {

      const errors = getValidationErrors(err);

      formRef.current?.setErrors(errors);
    }
  }, []);

  return (
    <Styled.Container>
      <Styled.Background />
      <Styled.Content>
        <img src={logo} alt="GoBarber"/>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Faça seu cadastro</h1>

          <Input name="name" type="text" icon={FiUser} placeholder="Nome" />

          <Input name="email" type="emaill" icon={FiMail} placeholder="E-mail" />

          <Input name="password" type="password" icon={FiLock}  placeholder="Senha" />

          <Button type="submit">Cadastrar</Button>

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
