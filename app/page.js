'use client'

import Header from '@/components/Header';
import styled from 'styled-components';
//import { useHomeContext } from '../context/HomeContext';
import ReviewCard from '@/components/ReviewCard';
import { useEffect, useState } from 'react';
import supabase from '../utils/supabase.js';
//import SelectDepartment from '@/components/SelectDepartment';


const Container = styled.div`
  display: flex;
  padding: 2rem;
  flex-direction: column;
  gap: 2rem;
`;

const Modal = styled.div`
  display: flex;
  padding: 2rem;
  flex-direction: column;
  gap: 1.5rem;
  background: ${({ theme }) => theme.colors.light};
`;

export default function Home() {
  //const { departments,fetchDepartments,selectedDepartment,setSelectedDepartment } = useHomeContext();

  const [reviews,setReviews] = useState(null);
  const [isLoading,setIsLoading] = useState(true);


  useEffect(() => {
    const fetchReviews = async () => {
      const { data } = await supabase
        .from("avaliacao")
        .select(`*, cod_turma(turma, cod_disciplina(nome)), mat_estudante(nome)`)
        .order("codigo",{ ascending: false });

      // Faz um objeto com os professores como chaves e um Array com suas reviews

      const teachers = data.reduce((result, obj) => {
        const { nome_professor, ...rest } = obj;
        if (!result[nome_professor]) {
          result[nome_professor] = [rest];
        } else {
          result[nome_professor].push(rest);
        }
        return result;
      }, {});

      console.log(teachers);
      setReviews(teachers)
      setIsLoading(false)
    }

    fetchReviews()
  },[])

  if (isLoading) {
    return (
      <Container>
        <Header home />
        <h1>Carregando...</h1>
      </Container>
    )
  }

  return (
    <Container>
      <Header home />
      {
        //<SelectDepartment />
      }
      <Modal>
        {Object.keys(reviews).map((key) => {
        return renderCards(key, reviews[key])
          })
        }
      </Modal>
    </Container>
  )
}

export function renderCards(title, reviews) {
  return (
    <>
      <h3>Prof. {title}</h3>
      {reviews.map((review) => {
        return (<ReviewCard key={review.codigo} review={review}/>)
      })}
    </>
  )
}
