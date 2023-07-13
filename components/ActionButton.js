import styled from 'styled-components';
import Image from 'next/image';
import edit from '../assets/edit.svg';

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

// Adicionar mais casos

export default function ActionButton({ type }) {
  
  switch (type) {
    case 'edit':
      return (
        <IconWrapper>
          <Icon src={edit} />
        </IconWrapper>
      )
  }
  return (
    <div>ActionButton</div>
  )
}
