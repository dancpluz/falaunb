import styled from 'styled-components';
import Image from 'next/image';

const InputDiv = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.5rem;
`;

const Icon = styled(Image)`
  position: absolute;
  z-index: 3;
  top: 50%;
  left: 1rem;
  height: 1.5rem;
  width: 1.5rem;
`;

const HeaderDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  p {
    font-size: .8rem;
  }
`;

const ErrorText = styled.p`
  font-size: 1rem;
  font-weight: 400;
`;

export default function InputBox({ title, icon, errorMessage, children }) {

  return (
    <InputDiv>
      <HeaderDiv>
        <label>{title}</label>
        {errorMessage && <p>{errorMessage.message}</p>}
      </HeaderDiv>
      {icon && <Icon alt={icon.src} src={icon} />}
      {children}
    </InputDiv>
  );
}
  
  