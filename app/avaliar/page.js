'use client'

import Header from '@/components/Header';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  padding: 2rem;
  flex-direction: column;
  gap: 2rem;
`;

export default function Avaliar() {
  return (
    <Container>
      <Header />

    </Container>
  )
}
