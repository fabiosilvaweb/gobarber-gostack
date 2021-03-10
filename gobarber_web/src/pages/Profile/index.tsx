import React, { ChangeEvent, useCallback, useRef } from 'react';
import { FiArrowLeft, FiUser, FiMail, FiLock, FiCamera } from 'react-icons/fi';

import { FormHandles } from '@unform/core';
import getValidationErrors from '../../utils/getValidationErrors';

import { Link, useHistory } from 'react-router-dom';

import { useToast } from '../../hooks/Toast'; 
import { useAuth} from '../../hooks/Auth';

import { Form } from '@unform/web';
import * as Yup from "yup";
import api from '../../services/api';

import * as Styled from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';

interface ProfileFormData {
  name: string;
  email: string;
  old_password: string;
  password: string;
  password_confirmation: string;
}

interface YupValProps  {
  length: number;
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { user, updateUser } = useAuth();

  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(async (data: ProfileFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required("Nome é obrigatório"),
        email: Yup.string().required("E-mail é obrigatório").email("E-mail Inválido!"),
        old_password: Yup.string(),
        password: Yup.string().when('old_password', {
          is: (val: YupValProps) => !!val.length,
          then: Yup.string().required(),
          otherwise: Yup.string()
        }),
        password_confirmation: Yup.string().when('old_password', {
          is: (val: YupValProps) => !!val.length,
          then: Yup.string().required(),
          otherwise: Yup.string()
        }).oneOf([Yup.ref('password'), null], 'Confirmação incorreta')
      });

      await schema.validate(data, {
        abortEarly: false
      });

      const { 
        name, 
        email, 
        password, 
        password_confirmation, 
        old_password
      } = data;

      const formData = Object.assign({
        name,
        email, 
      }, old_password ? {
        old_password,
        password,
        password_confirmation
      } : {});

      const response = await api.put('/profile',formData);

      updateUser(response.data);
      
      addToast({
        type: 'success',
        title: 'Perfil Atualizado!',
        description: 'Seus dados foram atualizados.'
      });

      history.push('/dashboard');

    } catch(err) {

      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
  
        formRef.current?.setErrors(errors);
        return;
      }

      addToast({
        type: 'error',
        title: 'Erro na Atualização',
        description: 'Ocorreu um erro ao fazer a atualização , cheque as informções.'
      });
    }
  }, [history, addToast, updateUser]);

  const handleAvatarChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {

    if (event.target.files) {
      const data = new FormData();

      data.append('avatar', event.target.files[0]);

      api.patch('/users/avatar', data).then((response) => {

        updateUser(response.data);

        addToast({
          type: 'success',
          title: 'Avatar atualizado!'
        });
      });
    }


  }, [addToast, updateUser]);

  return (
    <Styled.Container>
      <Styled.Header>
        <Link to="/dashboard">
          <FiArrowLeft size={24} />
        </Link>
      </Styled.Header>
      <Styled.Content> 
        <Styled.AvatarInput>
          <img src={user.avatar_url ? user.avatar_url : 'https://avatar.tobi.sh/' } alt={user.name}/>

          <label htmlFor="avatar">
            <FiCamera size={20}/>
            <input type="file" id="avatar" onChange={handleAvatarChange} /> 
          </label>

         

        </Styled.AvatarInput>
        <Form ref={formRef} onSubmit={handleSubmit} initialData={ { name: user.name, email: user.email  }  }>
          <h1>Meu Perfil</h1>
          <Input name="name" type="text" icon={FiUser} placeholder="Nome" />
          <Input name="email" type="emaill" icon={FiMail} placeholder="E-mail" />

          <Input containerStyle={{ marginTop: 24 }} name="old_password" type="password" icon={FiLock}  placeholder="Senha atual" />
          <Input name="password" type="password" icon={FiLock}  placeholder="Nova senha" />
          <Input name="password_confirmation" type="password" icon={FiLock}  placeholder="Confirmar senha" />
          <Button type="submit">Confirmar mudanças</Button>
        </Form>
        
      </Styled.Content>
      
    </Styled.Container>
  );
}

export default Profile;
