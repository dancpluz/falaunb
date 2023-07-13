import Chip from '@/components/Chip';
import { useEffect } from 'react';
import styled from 'styled-components';
import { useHomeContext } from '../context/HomeContext';

const DepartmentDiv = styled.div`
  display: flex;
  flex-flow: row nowrap;
  padding: 0.9rem;
  gap: 0.625rem;
  background: ${({ theme }) => theme.colors.dark};
  overflow-x: auto;
`;

export default function SelectDepartment() {
  const { departments,fetchDepartments,selectedDepartment,setSelectedDepartment } = useHomeContext();

  useEffect(() => {
    fetchDepartments();
  },[fetchDepartments]);


  if (departments) {
    return (
      <DepartmentDiv>
        {departments.map((depto) => {
          return (
            <Chip onClick={setSelectedDepartment(depto)} selected={selectedDepartment.codigo === depto.codigo} key={depto.codigo}>{depto.nome}</Chip>
          )
        })}
      </DepartmentDiv>
    )
  }

  return (
      <DepartmentDiv>
        {Array.from({ length: 10 },(_,index) => (
          <Chip key={index}>CARREGANDO...</Chip>
        ))}
      </DepartmentDiv>
  )
}