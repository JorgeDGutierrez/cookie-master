import { useEffect, useState } from 'react';
import '../styles/globals.css'
import type { AppContext, AppProps } from 'next/app'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { darkTheme, lightTheme, customTheme } from '../themes'
import Cookies from 'js-cookie';

interface Props extends AppProps {
  theme: string;
}

function MyApp({ Component, pageProps, theme = 'dark' }: Props) {

  // console.log({ theme })

  const [currentTheme, setCurrentTheme] = useState(lightTheme);

  useEffect(() => {

    const cookieTheme = Cookies.get('theme') || 'light';

    console.log('cookieTheme', cookieTheme);

    const selectedTheme = cookieTheme === 'light'
      ? lightTheme
      : (cookieTheme === 'dark')
        ? darkTheme
        : customTheme

    setCurrentTheme(selectedTheme);
  }, [])



  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}


// MyApp.getInitialProps = async (appContext: AppContext) => {

//   const { theme } = appContext.ctx.req ? (appContext.ctx.req as any).cookies : { theme: 'light' }

//   const validThemes = ['light', 'dark', 'custom'];
//   // console.log('getInitialProps: ', cookies);

//   return {
//     theme: validThemes.includes(theme) ? theme : 'dark',
//   }

// }

export default MyApp
