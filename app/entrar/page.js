'use client'
import styled from 'styled-components';
import Image from 'next/image';
import logoBig from '../../assets/logoBig.svg'
import Link from 'next/link'
import InputBox from '@/components/InputBox';
import user from '../../assets/user.svg';
import lock from '../../assets/lock.svg';
import supabase from '../../utils/supabase.js';
import { useForm } from 'react-hook-form';
import { useState } from 'react';


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

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.yellow};
`;

export default function Entrar() {
  const { handleSubmit,register,formState: { errors } } = useForm();
  const [loginError,setLoginError] = useState('');

  const onSubmit = async (data) => {
    const { matricula, senha } = data;

    try {
      const { data: users,error } = await supabase
        .from('estudante')
        .select('*')
        .eq('matricula',matricula);

      if (error) {
        console.error('Database error:',error);
        // Handle error, display error message, etc.
        return;
      }

      if (users.length === 0) {
        setLoginError('Matrícula não existe');
        return;
      }

      const user = users[0];

      if (user.senha !== senha) {
        setLoginError('Senha errada');
        return;
      }

      // Login successful, proceed with authentication logic
      console.log('Login successful:',user);
      // Redirect to the authenticated page, etc.
    } catch (error) {
      console.error('Login error:',error.message);
      // Handle error, display error message, etc.
    }
  };


  return (
    <Container>
      <Modal>
        <Image alt={'logo'} src={logoBig}/>
        <HeaderDiv>
          <h2>Bem vindo de volta!</h2>
          <h4>Entre para fazer avaliações</h4>
        </HeaderDiv>
      
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputBox title={'Matrícula'} errorMessage={errors.matricula} icon={user}>
            <input
              type='number'
              {...register('matricula',{
                required: '(Campo obrigatório)',
                minLength: { value: 9,message: '(A matrícula são 9 números)' },
                maxLength: { value: 9,message: '(A matrícula são 9 números)' }
              })}
            />
          </InputBox>

          <InputBox title={'Senha'} errorMessage={errors.senha} icon={lock}>
            <input
              type='password'
              {...register('senha',{ required: true })}
            />
          </InputBox>
          {loginError && <p>{loginError}</p>}
          <button>Entrar</button>
        </form>

        <p>Não possui uma conta?
          <StyledLink href={'/cadastrar'}> Cadastrar-se</StyledLink>
        </p>
      </Modal>
    </Container>
  )
}
