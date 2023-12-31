import styled from 'styled-components';
import Image from 'next/image';
import login from '../assets/log-in.svg';
import logout from '../assets/log-out.svg';
import plus from '../assets/plus.svg';
import Link from 'next/link';
import { useAuthContext } from '../context/AuthContext';

const Container = styled.div`
  display: flex;
  justify-content: ${props => props.hasButton ? "space-between" : "flex-end"};
  align-items: center;
`;

const AddButton = styled(Link)`
  text-decoration: none;
  display: flex;
  padding: 0.75rem 1.5rem;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  border-radius: 0.625rem;
  border: 0;
  color: ${({ theme }) => theme.colors.light};
  background: ${({ theme }) => theme.colors.dark};
  h2 {
      color: white;
    }
`;

const AdminLabel = styled.div`
  display: flex;
  padding: 0.5rem 1rem;
  align-items: center;
  border-radius: 2.5rem;
  border: 3px solid ${({ theme }) => theme.colors.dark};
`;

const LoginDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;
`;

export default function Header({ home }) {
  const { isLogged, isAdmin, userData, onLogout } = useAuthContext();

  if (isLogged) {
    return (
      <Container hasButton={home}>
        {home &&
          <AddButton href={'avaliar'}>
            <h2>Avaliar</h2>
            <Image alt={'add'} src={plus} />
          </AddButton>}
        <LoginDiv>
          {isAdmin &&
            <AdminLabel><h3>ADMIN</h3></AdminLabel>
          }
          <h3>{`Olá, ${userData.nome}`}</h3>
          <Link onClick={onLogout} href={'/'}>
            <Image alt={'logout'} src={logout} />
          </Link>
        </LoginDiv>
      </Container>
    )
  } 

  return (
    <Container hasButton={home}>
      {home &&
        <AddButton href={'avaliar'}>
          <h2>Avaliar</h2>
          <Image alt={'add'} src={plus} />
        </AddButton>}
      <LoginDiv>
        <h3>{'Cadastre-se ou entre'}</h3>
        <Link href={'entrar'}>
          <Image alt={'login'} src={login} />
        </Link>
      </LoginDiv>
    </Container>
  )
}
