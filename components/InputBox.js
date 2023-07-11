import styled from 'styled-components';
import Image from 'next/image';

const InputDiv = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.5rem;
  p {
    font-weight: 600;
  }
`;

const Icon = styled(Image)`
  position: absolute;
  z-index: 3;
  top: 50%;
  left: 1rem;
  height: 1.5rem;
  width: 1.5rem;
`;

export default function InputBox({ title, icon, children }) {
  return (
  <>
    <InputDiv>
      <p>{title}</p>
      <Icon alt={icon.src} src={icon} />
      {children}
    </InputDiv>
  </>
  );
}
  
  