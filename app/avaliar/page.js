'use client'

import Header from '@/components/Header';
import styled from 'styled-components';
import InputBox from '@/components/InputBox';
import { useForm } from 'react-hook-form';
import book from '../../assets/book.svg';
import classroom from '../../assets/classroom.svg';
import briefcase from '../../assets/briefcase.svg';
import teacher from '../../assets/teacher.svg';
import '@smastrom/react-rating/style.css';
import Stars from '@/components/Stars';
import { useEffect, useState } from 'react';
import SelectBox from '@/components/SelectBox';
import ReviewCard from '@/components/ReviewCard';
import { useAuthContext } from '../../context/AuthContext';
import { fetchDepartments,fetchTeachers } from '../../utils/fetchFunctions';

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
  const { handleSubmit,getValues,register,control,formState: { errors } } = useForm();
  const { userData } = useAuthContext();

  const [departmentOptions,setDepartmentOptions] = useState([]);
  const [teacherOptions, setTeacherOptions] = useState([]);
  const [subjectOptions, setSubjectOptions] = useState([]);
  const [classroomOptions, setClassroomOptions] = useState([]);
  const [text, setText] = useState('');
  const [classRoom, setClassRoom] = useState(null);

  const [anonymous, setAnonymous] = useState(false)
  const [rating,setRating] = useState(0);



  useEffect(() => {
    const fetchDepartmentOptions = async () => {
      setDepartmentOptions(await fetchDepartments());
    };

    fetchDepartmentOptions();
  },[]);

  const handleFetchTeachers = async (input) => {
    console.log(input)
    setTeacherOptions(await fetchTeachers(input))
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
                  onChange={() => handleFetchTeachers(selectedOption)}
                />
              </InputBox>
              <InputBox title={'Disciplina'} errorMessage={errors.disciplina} icon={book}>
                <SelectBox
                  control={control}
                  name='disciplina'
                  options={subjectOptions}
                />
              </InputBox>
            </InsideDiv>
            <InsideDiv>
              <InputBox title={'Professor(a)'} errorMessage={errors.professor} icon={teacher}>
                <SelectBox
                  control={control}
                  name='professor'
                  options={teacherOptions}
                />
              </InputBox>
              <InputBox title={'Turma'} errorMessage={errors.turma} icon={classroom}>
                <SelectBox
                  control={control}
                  name='turma'
                  options={classroomOptions}
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
          <ReviewCard review={{ mat_estudante: (anonymous ? null : userData),nota: rating,texto: (text == '' ? '(Texto)' : text) }} />
          <button>Enviar</button>
        </form>
      </Modal>
    </Container>
  )
}