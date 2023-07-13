import styled from 'styled-components';

const ChipDiv = styled.div`
  color: ${({ theme }) => theme.colors.light};
  display: flex;
  padding: 0.625rem 1.25rem;
  align-items: center;
  gap: 0.5rem;
  border-radius: 2.5rem;
  border: 3px solid ${({ theme }) => theme.colors.light};
  cursor: pointer;
  h4 {
    color: ${({ theme }) => theme.colors.light};
    white-space: nowrap;
  }
`;

export default function Chip({ selected,children }) {

  return (
    <ChipDiv><h4>{children}</h4></ChipDiv>
  )
}
