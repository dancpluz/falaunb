'use client'
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { Montserrat } from 'next/font/google';

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
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
        <body className={montserrat.className}>{children}</body>
      </html>
    </ThemeProvider>
  )
}
