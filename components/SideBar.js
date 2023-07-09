import styled from 'styled-components';
import logo from '../assets/logo.svg'
import Image from 'next/image';
import NavBar from './NavBar';
import LatestReview from './LatestReview';

const Container = styled.div`
  width: 25rem;
  height: 100vh;
  border-radius: 0;
  background: ${({ theme }) => theme.colors.dark};
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2rem;
  h3 {
    color: ${({ theme }) => theme.colors.light};
  }
`;

const LogoDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  align-self: stretch;
  h1 {
    color: ${({ theme }) => theme.colors.light};
  }
`;

export default function SideBar() {
  return (
    <Container>
      <LogoDiv>
        <Image alt={'logo'} src={logo} />
        <h1>FalaUnB</h1>
      </LogoDiv>
      <h3>Faça sua avaliação dos professores da UnB!</h3>
      <NavBar />
      <LatestReview />
    </Container>
  )
}
