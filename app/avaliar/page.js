'use client'

import Header from '@/components/Header';
import styled from 'styled-components';
import InputBox from '@/components/InputBox';
import { useForm } from 'react-hook-form';
import book from '../../assets/book.svg';
import classroom from '../../assets/classroom.svg';
import briefcase from '../../assets/briefcase.svg';
import teacher from '../../assets/teacher.svg';
import SelectBox from 'react-select';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import Stars, { customStyles } from '@/components/Stars';
import { useEffect, useState } from 'react';
import { useHomeContext } from '../../context/HomeContext';
import supabase from '../../utils/supabase.js';
import { fetchDepartmentOptions } from '../../utils/fetchFunctions';



const Container = styled.div`
  display: flex;
  padding: 2rem;
  flex-direction: column;
  gap: 2rem;
`;

const Modal = styled.div`
  background: ${({ theme }) => theme.colors.light};
  display: flex;
  padding: 2rem;
  flex-direction: column;
  gap: 2rem;
  align-self: stretch;

  form {
    display: flex;
    gap: 2rem;
    flex-direction: column;
  }
`;

const BoxesDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  align-self: stretch;
  flex-grow: 1;
  z-index: 3;
`;

const InsideDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
`;



export default function Avaliar() {
  const { handleSubmit,register,formState: { errors } } = useForm();
  const [departmentsOptions, setDepartmentsOptions] = useState(['']);
  const [rating,setRating] = useState(0);


  useEffect(() => {
    const deptOptions = fetchDepartmentOptions()

  }, [])
  

  return (
    <Container>
      <Header />
      <Modal>
        <h2>Preencha os dados para fazer sua Avaliação:</h2>
        <form onSubmit={handleSubmit}>
          <BoxesDiv>
            <InsideDiv>
              <InputBox title={'Departamento'} errorMessage={errors.departamento} icon={briefcase}>
                <Select
                  unstyled
                  styles={selectStyles}
                  placeholder={''}
                  options={departmentsOptions}
                  noOptionsMessage={({inputValue})=> !inputValue? noOptionsText: 'Não encontrado'}
                  {...register('departamento',{ required: '(Campo obrigatório)' })}/>

              </InputBox>
              <InputBox title={'Professor(a)'} errorMessage={errors.professor} icon={teacher}>
                <Select
                  unstyled
                  styles={selectStyles}
                  placeholder={''}
                  options={[]}
                  {...register('professor',{ required: '(Campo obrigatório)' })}/>

              </InputBox>
            </InsideDiv>
            <InsideDiv>
              <InputBox title={'Disciplina'} errorMessage={errors.disciplina} icon={book}>
                <Select
                  unstyled
                  styles={selectStyles}
                  placeholder={''}
                  options={[]}
                  {...register('disciplina')}/>

              </InputBox>
              <InputBox title={'Turma'} errorMessage={errors.turma} icon={classroom}>
                <Select
                  unstyled
                  styles={selectStyles}
                  placeholder={''}
                  options={[]}
                  {...register('turma')}/>
              </InputBox>
            </InsideDiv>
            
          </BoxesDiv>
          <InputBox title={'Fale sobre este(a) professor(a):'} errorMessage={errors.avaliacao}>
            <textarea {...register('avaliacao',{ required: '(Campo obrigatório)' })}/>
          </InputBox>

          <Stars rating={rating} setRating={setRating} />

          <button>Enviar</button>
        </form>
      </Modal>
    </Container>
  )
}