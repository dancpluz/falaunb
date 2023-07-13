import styled from 'styled-components';
import Image from 'next/image'
import trending from '../assets/trending-up.svg';
import Stars from './Stars';
import { useEffect, useState } from 'react';
import supabase from '../utils/supabase.js';
import { formatDate,formatInitials,formatTeacherName } from '@/utils/formatting';


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

export const StarDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
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
  
  const [latestReview, setLatestReview] = useState(null)
  const [isLoading,setIsLoading] = useState(true)

  useEffect(() => {
    const fetchLatestReview = async () => {
      const { data } = await supabase
      .from("avaliacao")
      .select(`*, cod_turma(turma, cod_disciplina(nome)), mat_estudante(nome)`)
      .order("codigo",{ ascending: false })
      .limit(1);

      setLatestReview(data[0])
      console.log(data[0])
      setIsLoading(false)
    }

    fetchLatestReview()
  },[])

  if (isLoading) {
    return (
    <Container>
      <TitleDiv>
        <Image alt={'trending'} src={trending} />
        <h3>Última Avaliação</h3>
      </TitleDiv>
        <h4>Carregando...</h4>
      <RatingHeader>
        <div>
          <p>...</p>
          <h4>...</h4>
        </div>
      </RatingHeader>
      <p>...</p>
      <StarDiv>
        <h4>Nota: </h4>
        <Stars rating={0} />
      </StarDiv>
    </Container>
    )
  }

  const {cod_turma, data, mat_estudante, nome_professor, nota, texto} = latestReview

  return (
    <Container>
      <TitleDiv>
        <Image alt={'trending'} src={trending}/>
        <h3>Última Avaliação</h3>
      </TitleDiv>
      <h4>Prof. {formatTeacherName(nome_professor)}</h4>
      <RatingHeader>
        <div>
          {cod_turma &&  
          <p>{formatInitials(cod_turma.cod_disciplina.nome)} - Turma {cod_turma.turma}</p>
          }
          <h4>{mat_estudante ? mat_estudante.nome : 'Anônimo'} falou:</h4>
        </div>
        <p>{formatDate(data)}</p>
      </RatingHeader>
      <p>{texto}</p>
      <StarDiv>
        <h4>Nota: </h4>
        <Stars rating={nota}/>
      </StarDiv>
    </Container>
  )
}
