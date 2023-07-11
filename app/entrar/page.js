'use client'
import styled from 'styled-components';
import Image from 'next/image';
import logoBig from '../../assets/logoBig.svg'
import Link from 'next/link'
import InputBox from '@/components/InputBox';
import user from '../../assets/user.svg';
import lock from '../../assets/lock.svg';

const Container = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
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
  return (
    <Container>
      <Modal>
        <Image alt={'logo'} src={logoBig}/>
        <HeaderDiv>
          <h2>Bem vindo de volta!</h2>
          <h4>Entre para fazer avaliações</h4>
        </HeaderDiv>
        
        <InputBox title={'Matrícula'} icon={user}>
          <input type='text' />
        </InputBox>

        <InputBox title={'Senha'} icon={lock}>
          <input type='text' />
        </InputBox>
        <button>Entrar</button>

        <p>Não possui uma conta?
          <StyledLink href={'/cadastro'}> Cadastrar-se</StyledLink>
        </p>
      </Modal>
    </Container>
  )
}
