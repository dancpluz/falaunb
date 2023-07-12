import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import home from '../assets/home.svg';
import star from '../assets/star.svg';
import user from '../assets/user.svg';
import bookmark from '../assets/bookmark.svg';
import alertTriangle from '../assets/alert-triangle.svg';
import { usePathname } from 'next/navigation'
import { useAuthContext } from '../context/AuthContext';

const Nav = styled.nav`
  display: flex;
  padding: 1rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.625rem;
  align-self: stretch;
  border-radius: 1.25rem;
  background: ${({ theme }) => theme.colors.light};

  
  h3 {
    color: ${({ theme }) => theme.colors.dark};
  }
`;

const NavItem = styled(Link)`
  display: flex;
  padding: 0.6rem 1rem;
  align-items: center;
  gap: 0.5rem;
  align-self: stretch;
  text-decoration: none;
  
  border: 3px solid;
  border-color: ${(props) => props.selected ? '#1B1C1E' : 'white'};
  border-radius: 2.5rem;
`;

export default function NavBar() {
  const { isLogged, isAdmin } = useAuthContext();

  const pathName = usePathname();

  return (
    <Nav>
      <NavItem href={'/'} selected={pathName == '/'}>
        <Image alt={'home'} src={home}/>
        <h3>Home</h3>
      </NavItem>
      <NavItem href={isLogged ? '/avaliar' : '/entrar'} selected={pathName == '/avaliar'}>
        <Image alt={'star'} src={star} />
        <h3>Avaliar</h3>
      </NavItem>
      <NavItem href={isLogged ? '/perfil' : '/entrar'} selected={pathName == '/perfil'}>
        <Image alt={'user'} src={user} />
        <h3>Perfil</h3>
      </NavItem>
      <NavItem href={isLogged ? '/minhas-avaliacoes' : '/entrar'} selected={pathName == '/minhas-avaliacoes'}>
        <Image alt={'bookmark'} src={bookmark} />
        <h3>Minhas Avaliações</h3>
      </NavItem>
      {isAdmin && 
        <NavItem href={'denuncias'} selected={pathName == '/denuncias'}>
        <Image alt={'alert'} src={alertTriangle} />
        <h3>Denúncias</h3>
      </NavItem>
      }
    </Nav>
  )
}
