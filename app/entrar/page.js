'use client'
import styled from 'styled-components';
import Image from 'next/image';
import logoBig from '../../assets/logoBig.svg'
import user from '../../assets/user.svg'
import Link from 'next/link'
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';

const Container = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const Modal = styled.div`
  display: flex;
  width: 26.25rem;
  padding: 2rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  background: ${({ theme }) => theme.colors.light};
`;

const HeaderDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;


const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.yellow};
`;

export default function Login() {
  return (
    <Container>
      <Modal>
        <Image alt={'logo'} src={logoBig}/>
        <HeaderDiv>
          <h2>Bem vindo de volta!</h2>
          <h4>Entre para fazer avaliações</h4>
        </HeaderDiv>

        

        <p>Não possui uma conta?
          <StyledLink href={''}> Cadastrar-se</StyledLink>
        </p>
      </Modal>
    </Container>
  )
}
