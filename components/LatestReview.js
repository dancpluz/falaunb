import styled from 'styled-components';
import Image from 'next/image'
import trending from '../assets/trending-up.svg';
import Stars from './Stars';


const Container = styled.div`
  display: flex;
  padding: 1rem 1rem 1.5rem 1rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.625rem;
  align-self: stretch;
  background: ${({ theme }) => theme.colors.light};
  h4, h3, h2, p {
    color: ${({ theme }) => theme.colors.dark};
  }

  p {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
  }
`;

const TitleDiv = styled.div`
  display: flex;
  padding: 0.5rem 0rem;
  align-items: flex-end;
  gap: 0.5rem;
  align-self: stretch;
`;

const RatingHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  div {
    display: flex;
    flex-direction: column;
  }
  p:last-child{
    font-weight: 600;
  }
`;

const StarDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  align-self: stretch;
`;

export default function LatestReview() {
  const a = {
    'professor': 'FABRICIO ATAIDES BRAZ',
    'disciplina': 'APC',
    'turma': '01',
    'avaliador': 'Juan Pablo',
    'texto': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis euismod viverra finibus. Praesent sit amet lorem dui. Proin lobortis viverra turpis ac finibus.Lorem ipsum dolor sit amet',
    'nota': 4,
    'data': '07/07/2023'
  }

  return (
    <Container>
      <TitleDiv>
        <Image alt={'trending'} src={trending}/>
        <h3>Última Avaliação</h3>
      </TitleDiv>
      <h4>Prof. {a.professor}</h4>
      <RatingHeader>
        <div>
          <p>{a.disciplina} - Turma {a.turma}</p>
          <h4>{a.avaliador} diz:</h4> 
        </div>
        <p>{a.data}</p>
      </RatingHeader>
      <p>{a.texto}</p>
      <StarDiv>
        <h4>Nota: </h4>
        <Stars rating={a.nota}/>
      </StarDiv>
      
    </Container>
  )
}
