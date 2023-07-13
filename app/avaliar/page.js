'use client'

import Header from '@/components/Header';
import styled from 'styled-components';
import InputBox from '@/components/InputBox';
import { useForm } from 'react-hook-form';
import book from '../../assets/book.svg';
import classroom from '../../assets/classroom.svg';
import briefcase from '../../assets/briefcase.svg';
import teacher from '../../assets/teacher.svg';
import Select from 'react-select';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import Stars, { customStyles } from '@/components/Stars';
import { useState } from 'react';



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
`;

const InsideDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  flex-grow: 1;
`;

const BigInput = styled.input`
  height: 6rem;
`;

export default function Avaliar() {
  const { handleSubmit,register,formState: { errors } } = useForm();
  const [rating,setRating] = useState(0);

  return (
    <Container>
      <Header />
      <Modal>
        <h2>Preencha os dados para fazer sua Avaliação:</h2>
        <form onSubmit={''}>
          <BoxesDiv>
            <InsideDiv>
              <InputBox title={'Departamento'} errorMessage={errors.departamento} icon={briefcase}>
                <Select
                  placeholder={''}
                  options={[]}
                  {...register('departamento',{ required: '(Campo obrigatório)' })}>
                </Select>
              </InputBox>
              <InputBox title={'Professor(a)'} errorMessage={errors.professor} icon={teacher}>
                <Select
                  placeholder={''}
                  options={[]}
                  {...register('professor',{ required: '(Campo obrigatório)' })}>
                </Select>
              </InputBox>
            </InsideDiv>
            <InsideDiv>
              <InputBox title={'Disciplina'} errorMessage={errors.disciplina} icon={book}>
                <Select
                  placeholder={''}
                  options={[]}
                  {...register('disciplina')}>
                </Select>
              </InputBox>
              <InputBox title={'Turma'} errorMessage={errors.turma} icon={classroom}>
                <Select
                  placeholder={''}
                  options={[]}
                  {...register('turma')}>
                </Select>
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