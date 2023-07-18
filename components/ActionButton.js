import styled from 'styled-components';
import Image from 'next/image';
import pen from '../assets/edit.svg';
import trash from '../assets/trash.svg';

const IconWrapper = styled.div`
  display: flex;
  width: 2rem;
  height: 2rem;
  padding: 0.5625rem;
  justify-content: center;
  align-items: center;
  border-radius: 0.625rem;
  border: 3px solid ${({ theme }) => theme.colors.light};
  background: ${({ theme }) => theme.colors.dark};
  cursor: pointer;
`;

const Icon = styled(Image)`

`;

export default function ActionButton({ edit,remove }) {
  return (
    <>
      {remove && <IconWrapper>
        <Icon alt={trash.src} src={trash} onClick={remove} />
      </IconWrapper>}
      {edit && <IconWrapper>
        <Icon alt={edit.src} src={pen} />
      </IconWrapper>}
    </>
  )
}
