import styled from 'styled-components';
import logo from '../assets/logo.svg'
import unb from '../assets/unb.svg'
import Image from 'next/image';
import NavBar from './NavBar';
import LatestReview from './LatestReview';

const Container = styled.div`
  position: fixed;
  width: 22rem;
  height: 100vh;
  border-radius: 0;
  background: ${({ theme }) => theme.colors.dark};
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.75rem;
  z-index: 0;
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

const Text = styled.h3`
  color: ${({ theme }) => theme.colors.light};
`;

const UnBLogo = styled(Image)`
  position: absolute;
  z-index: 1;
  bottom: 5rem;
  left: -3rem;
  rotate: -20deg;
`;

const Footer = styled.p`
  position: absolute;
  z-index: 1;
  bottom: 5.5rem;
  width: 100%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: ${({ theme }) => theme.colors.light};
`;

export default function SideBar() {
  return (
    <Container>
      <LogoDiv>
        <Image alt={'logo'} src={logo} />
        <h1>FalaUnB</h1>
      </LogoDiv>
      <Text>Faça sua avaliação dos professores da UnB!</Text>
      <NavBar />
      <LatestReview />
      <UnBLogo alt={'unb'} src={unb} />
      <Footer>Desenvolvido por Daniel Luz</Footer>
    </Container>
  )
}
