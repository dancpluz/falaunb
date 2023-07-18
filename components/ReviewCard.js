import styled from 'styled-components';
import { StarDiv } from './LatestReview';
import Stars from './Stars';
import ActionButton from './ActionButton';
import { formatDate, getNowDate } from '@/utils/formatting';
import { useAuthContext } from '../context/AuthContext';
import { removeReview } from '../utils/actionFunctions';


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

export default function ReviewCard({ review, model }) {
  const { codigo,cod_turma,data,mat_estudante,nota,texto } = review;
  const { userData, isAdmin } = useAuthContext();
  console.log(userData, mat_estudante)

  function renderButtons() {
    if (userData && mat_estudante) {
      if (isAdmin || userData.matricula === mat_estudante.matricula) {
        return (
          <ActionButton remove={() => { removeReview(codigo) }} />
        )
      }
    }
  }

  if (model) {
    return (
      <Container>
        <HeaderDiv>
          <TitleDiv>
            {cod_turma ? <p>{cod_turma.cod_disciplina.nome} - Turma {cod_turma.turma ? cod_turma.turma : '(?)'}</p> : <p>(Disciplina) - Turma (?)</p>}
            <h4>{mat_estudante ? mat_estudante.nome : 'Anônimo'} falou:</h4>
          </TitleDiv>
          <h4>{data ? formatDate(data) : getNowDate()}</h4>
        </HeaderDiv>
        <p>{texto}</p>
        <FooterDiv>
          <StarDiv>
            <h4>Nota: </h4>
            <Stars rating={nota} />
          </StarDiv>
        </FooterDiv>
      </Container>
    )
  }
  
  return (
    <Container>
      <HeaderDiv>
        <TitleDiv>
          {cod_turma &&
            <p>{cod_turma.cod_disciplina.nome}{cod_turma.turma && `- Turma ${cod_turma.turma}`}</p>
          }
          <h4>{mat_estudante ? mat_estudante.nome : 'Anônimo'} falou:</h4>
        </TitleDiv>
        <h4>{data ? formatDate(data) : getNowDate()}</h4>
      </HeaderDiv>
      <p>{texto}</p>
      <FooterDiv>
        <StarDiv>
          <h4>Nota: </h4>
          <Stars rating={nota} />
        </StarDiv>
        <ButtonsDiv>
          {renderButtons()}
        </ButtonsDiv>
      </FooterDiv>
    </Container>
  )
}

