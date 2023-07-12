'use client'
import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link'
import InputBox from '@/components/InputBox';
import user from '../../assets/user.svg';
import lock from '../../assets/lock.svg';
import book from '../../assets/book.svg';
import mail from '../../assets/mail.svg';
import smile from '../../assets/smile.svg';
import supabase from '../../utils/supabase.js';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import Select from 'react-select';


const Container = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  form {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    width: 100%;
  }
`;

const Modal = styled.div`
  display: flex;
  width: 22rem;
  padding: 2.5rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.25rem;
  background: ${({ theme }) => theme.colors.light};
`;

const HeaderDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
`;

const ErrorText = styled.p`
  font-size: 1rem;
  font-weight: 400;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.yellow};
`;

const selectStyles = {
  control: styles => ({ ...styles,backgroundColor: 'white' }),
  option: (styles,{ data,isDisabled,isFocused,isSelected }) => {
    return {
      ...styles,
      backgroundColor: 'black',
      color: '#FFF',
      cursor: isDisabled ? 'not-allowed' : 'default',
    };
  },
};

export default function Cadastrar() {
  const { handleSubmit,register,formState: { errors } } = useForm();
  const [loginError,setLoginError] = useState('');

  const onSubmit = async (data) => {
    const { matricula,senha } = data;

  
  };


  return (
    <Container>
      <Modal>
        <HeaderDiv>
          <h2>Crie sua conta</h2>
          <h4>Coloque suas informações</h4>
        </HeaderDiv>

        <form onSubmit={handleSubmit(onSubmit)}>
          <InputBox title={'Matrícula'} errorMessage={errors.matricula} icon={user}>
            <input
              type='number'
              {...register('matricula',{
                required: '(Campo obrigatório)',
                minLength: { value: 9,message: '(A matrícula são 9 números)'},
                maxLength: { value: 9,message: '(A matrícula são 9 números)'}
              })}
            />
          </InputBox>

          <InputBox title={'Nome'} errorMessage={errors.nome} icon={smile}>
            <input
              type='text'
              {...register('nome',{ required: '(Campo obrigatório)' })}
            />
          </InputBox>

          <InputBox title={'Email'} errorMessage={errors.email} icon={mail}>
            <input
              type='email'
              {...register('email',{ required: '(Campo obrigatório)' })}
            />
          </InputBox>

          <InputBox title={'Curso/Departamento'} errorMessage={errors.departamento} icon={book}>
            <Select 
              placeholder={''}
              styles={selectStyles}
              options={[{ value: "blues",label: "Blues" }]}
              {...register('departamento',{ required: '(Campo obrigatório)' })}>
            </Select>
          </InputBox>

          <InputBox title={'Senha'} errorMessage={errors.senha} icon={lock}>
            <input
              type='password'
              {...register('senha',{ required: '(Campo obrigatório)' })}
            />
          </InputBox>

          <InputBox title={'Confirmar senha'} errorMessage={errors.confirmar} icon={lock}>
            <input
              type='password'
              {...register('confirmar',{ required: '(Campo obrigatório)' })}
            />
          </InputBox>

          {loginError && <ErrorText>{loginError}</ErrorText>}
          <button>Cadastrar-se</button>
        </form>

        <p>Já possui uma conta?
          <StyledLink href={'/entrar'}> Entrar</StyledLink>
        </p>
      </Modal>
    </Container>
  )
}
