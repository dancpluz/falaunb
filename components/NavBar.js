import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import home from '../assets/home.svg';
import star from '../assets/star.svg';
import user from '../assets/user.svg';
import bookmark from '../assets/bookmark.svg';
import alertTriangle from '../assets/alert-triangle.svg';

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

const styleSelected = (selected) => {
  if (selected) {
    return `${({ theme }) => theme.colors.dark}`
  } else {
    return `white`
  }
}

const NavItem = styled(Link)`
  display: flex;
  height: 2.75rem;
  padding: 0.625rem 1.25rem;
  align-items: center;
  gap: 0.5rem;
  align-self: stretch;
  text-decoration: none;
  
  border: 3px solid;
  border-color: ${(props) => styleSelected(props.selected)};
  border-radius: 2.5rem;
`;

export default function NavBar() {
  const admin = false;

  return (
    <Nav>
      <NavItem href={''} selected={true}>
        <Image alt={'home'} src={home}/>
        <h3>Home</h3>
      </NavItem>
      <NavItem href={''} selected={false}>
        <Image alt={'star'} src={star} />
        <h3>Avaliar</h3>
      </NavItem>
      <NavItem href={''} selected={false}>
        <Image alt={'user'} src={user} />
        <h3>Perfil</h3>
      </NavItem>
      <NavItem href={''} selected={false}>
        <Image alt={'bookmark'} src={bookmark} />
        <h3>Minhas Avaliações</h3>
      </NavItem>
      {admin && 
      <NavItem href={''} selected={false}>
        <Image alt={'alert'} src={alertTriangle} />
        <h3>Denúncias</h3>
      </NavItem>
      }
    </Nav>
  )
}
