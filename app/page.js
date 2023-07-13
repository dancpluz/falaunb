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

export default function Home() {
  //const { departments,fetchDepartments,selectedDepartment,setSelectedDepartment } = useHomeContext();

  const [reviews,setReviews] = useState(null);
  const [isLoading,setIsLoading] = useState(true);


  useEffect(() => {
    const fetchLatestReview = async () => {
      const { data } = await supabase
        .from("avaliacao")
        .select(`*, cod_turma(turma, cod_disciplina(nome)), mat_estudante(nome)`)
        .order("codigo",{ ascending: false });

      data

      console.log(data[0])
      setIsLoading(false)
    }

    fetchLatestReview()
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
      <ReviewCard />
    </Container>
  )
}
