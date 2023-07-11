'use client'

import styled from 'styled-components';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { Montserrat } from 'next/font/google';
import SideBar from '@/components/SideBar';


export const metadata = {
  title: 'FalaUnB',
  description: 'Avalie seu professor da UnB',
}

const montserrat = Montserrat({
  weight: ['400','600','700'],
  subsets: ['latin'],
})

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    color: ${({ theme }) => theme.colors.dark};
    z-index: 2;
    font-family: 'Montserrat', sans-serif;
  }

  input {
    height: 3rem;
    font-size: 1rem;
    flex-grow: 1;
    border-radius: 0.5rem;
    border: 3px solid ${({ theme }) => theme.colors.dark};
    padding-left: 2.75rem;
  }

  button {
    height: 3.5rem;
    border-radius: 0.625rem;
    border: 0;
    color: ${({ theme }) => theme.colors.light};
    background: ${({ theme }) => theme.colors.dark};
    width: 100%;
    font-weight: 600;
    font-size: 1.25rem;
    cursor: pointer;
  }

  div {
    border-radius: 1.25rem;
  }

  h1 {
    font-size: 2.25rem;;
    font-weight: 700;
  }

  h2 {
    font-size: 2rem;
    font-weight: 600;
  }

  h3 {
    font-size: 1.5rem;
    font-weight: 600;
  }

  h4 {
    font-size: 1.25rem;
    font-weight: 600;
  }

  p {
    font-size: 1rem;
    font-weight: 500;
  }
`;

const MainDiv = styled.div`
  margin-left: 26rem;
  border-radius: 0;
  background: linear-gradient(180deg, #FAF5EC 5.60%, #FCD58D 81.63%);
  height: 100vh;
`;

const theme = {
  colors: {
    light: '#FFFFFF',
    dark: '#1B1C1E',
    grey: '#D1D2D2',
    yellow: '#E59500',
    lowYellow: 'rgba(229,149,0,0.20)',
    background: 'linear-gradient(180deg, #FAF5EC 5.60%, #FCD58D 81.63%)'
  }
}

export default function RootLayout({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <html lang="en">
        <body className={montserrat.className}>
          <SideBar />
          <MainDiv>  
            {children}
          </MainDiv>
        </body>
      </html>
    </ThemeProvider>
  )
}
