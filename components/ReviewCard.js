import styled from 'styled-components';
import { StarDiv } from './LatestReview';
import Stars from './Stars';
import ActionButton from './ActionButton';
import { formatDate } from '@/utils/formatting';

const Container = styled.div`
  display: flex;
  padding: 1.5rem;
  flex-direction: column;
  gap: 1rem;
  border-radius: 0.625rem;
  background:  ${({ theme }) => theme.colors.dark};
  h4, p {
    color: ${({ theme }) => theme.colors.light};
  }
`;

const HeaderDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TitleDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const FooterDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ButtonsDiv = styled.div`
  display: flex;
  gap: 0.625rem;
`;



export default function ReviewCard({ review }) {
  const { cod_turma,data,mat_estudante,nota,texto } = review;

  return (
    <Container>
      <HeaderDiv>
        <TitleDiv>
          {cod_turma &&
            <p>{cod_turma.cod_disciplina.nome} - Turma {cod_turma.turma}</p>
          }
          <h4>{mat_estudante ? mat_estudante.nome : 'Anônimo'} falou:</h4>
        </TitleDiv>
        <h4>{formatDate(data)}</h4>
      </HeaderDiv>
      <p>{texto}</p>
      <FooterDiv>
        <StarDiv>
          <h4>Nota: </h4>
          <Stars rating={nota} />
        </StarDiv>
        <ButtonsDiv>
          <ActionButton type={'edit'}/>
        </ButtonsDiv>
      </FooterDiv>
    </Container>
  )
}
