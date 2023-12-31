'use client'

import styled from 'styled-components';
import Image from 'next/image';
import logoBig from '../../assets/logoBig.svg'
import Link from 'next/link'
import InputBox from '@/components/InputBox';
import user from '../../assets/user.svg';
import lock from '../../assets/lock.svg';
import { useForm } from 'react-hook-form';
import { useAuthContext } from '../../context/AuthContext';

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
  const { loginError, onLogin } = useAuthContext();

  return (
    <Container>
      <Modal>
        <Image alt={'logo'} src={logoBig}/>
        <HeaderDiv>
          <h2>Bem vindo de volta!</h2>
          <h4>Entre para fazer avaliações</h4>
        </HeaderDiv>
      
        <form onSubmit={handleSubmit(onLogin)}>
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
              {...register('senha',{ required: '(Campo obrigatório)' })}
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
