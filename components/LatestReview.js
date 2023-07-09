import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  padding: 1rem 1rem 1.5rem 1rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.625rem;
  align-self: stretch;

  background: ${({ theme }) => theme.colors.light};
`;

export default function LatestReview() {
  const a = {
    'professor': 'FABRICIO ATAIDES BRAZ',
    'disciplina': 'Algoritmos de Programação de Computadores',
    'turma': '01',
    'avaliador': 'Juan Pablo',
    'texto': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'nota': 4,
    'data': '07/07/2023'
  }

  return (
    <Container>
      LatestReview
    </Container>
  )
}
