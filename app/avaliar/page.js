'use client'

import Header from '@/components/Header';
import styled from 'styled-components';
import InputBox from '@/components/InputBox';
import { set, useForm } from 'react-hook-form';
import book from '../../assets/book.svg';
import room from '../../assets/classroom.svg';
import briefcase from '../../assets/briefcase.svg';
import teach from '../../assets/teacher.svg';
import '@smastrom/react-rating/style.css';
import Stars from '@/components/Stars';
import { useEffect, useState } from 'react';
import SelectBox from '@/components/SelectBox';
import ReviewCard from '@/components/ReviewCard';
import { useAuthContext } from '../../context/AuthContext';
import { fetchDepartments,fetchTeachers,fetchSubjects,fetchClassrooms } from '../../utils/fetchFunctions';

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
`;

const InsideDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
`;

const StarDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1 0 0;
`;

const CheckDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 2rem;
  flex: 1 0 0;
`;

export default function Avaliar() {
  const { handleSubmit,register,getValues,setValue,control,formState: { errors } } = useForm();
  const { userData } = useAuthContext();

  const [departmentOptions,setDepartmentOptions] = useState([]);
  const [teacherOptions, setTeacherOptions] = useState([]);
  const [subjectOptions, setSubjectOptions] = useState([]);
  const [classroomOptions, setClassroomOptions] = useState([]);

  const [text, setText] = useState('');

  const [classroom, setClassroom] = useState(null);
  const [anonymous, setAnonymous] = useState(false)
  const [rating,setRating] = useState(0);



  useEffect(() => {
    const fetchDepartmentOptions = async () => {
      setDepartmentOptions(await fetchDepartments());
    };

    fetchDepartmentOptions();
  },[]);

  const fetchTeacherOptions = async (input) => {
    setTeacherOptions(await fetchTeachers(input.value))
  }

  const fetchSubjectOptions = async (input) => {
    setSubjectOptions(await fetchSubjects(input.value))
  }

  const fetchClassroomOptions = async (input, teacher) => {
    const newClass = classroom;
    newClass.turma = input.label;
    setClassroom(newClass);
    setClassroomOptions(await fetchClassrooms(input.value, teacher.value))
  }

  return (
    <Container>
      <Header />
      <Modal>
        <h2>Preencha os dados para fazer sua Avaliação:</h2>
        <form onSubmit={handleSubmit}>
          <BoxesDiv>
            <InsideDiv>
              <InputBox title={'Departamento'} errorMessage={errors.departamento} icon={briefcase}>
                <SelectBox
                  control={control}
                  name='departamento'
                  options={departmentOptions}
                  onChange={(e) => {fetchTeacherOptions(e); setValue('departamento',e)}}
                />
              </InputBox>
              <InputBox title={'Disciplina'} errorMessage={errors.disciplina} icon={book}>
                <SelectBox
                  control={control}
                  name='disciplina'
                  options={subjectOptions}
                  onChange={(e) => {fetchClassroomOptions(e, getValues().professor)}}
                />
              </InputBox>
            </InsideDiv>
            <InsideDiv>
              <InputBox title={'Professor(a)'} errorMessage={errors.professor} icon={teach}>
                <SelectBox
                  control={control}
                  name='professor'
                  options={teacherOptions}
                  onChange={(e) => {fetchSubjectOptions(e); setValue('professor',e)}}
                />
              </InputBox>
              <InputBox title={'Turma'} errorMessage={errors.turma} icon={room}>
                <SelectBox
                  control={control}
                  name='turma'
                  options={classroomOptions}
                  onChange={(e) => {}}
                />
              </InputBox>
            </InsideDiv>
          </BoxesDiv>
          <InputBox title={'Fale sobre este(a) professor(a):'} errorMessage={errors.texto}>
            <textarea {...register('texto',{ onChange: (e) => setText(e.target.value), required: '(Campo obrigatório)' })}/>
          </InputBox>
          <BoxesDiv>
            <StarDiv>
              <h3>Nota:</h3>
              <Stars rating={rating} setRating={setRating} />
            </StarDiv>
            <CheckDiv>
              <h3>Anônimo:</h3>
              <input type='checkbox' onChange={() => setAnonymous(!anonymous)} />
            </CheckDiv>
          </BoxesDiv>
          <h4>Sua avaliação ficará assim:</h4>
          <ReviewCard review={{ cod_turma: classroom,mat_estudante: (anonymous ? null : userData),nota: rating,texto: (text == '' ? '(Texto)' : text) }} />
          <button>Enviar</button>
        </form>
      </Modal>
    </Container>
  )
}