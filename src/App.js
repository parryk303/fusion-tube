import '@fontsource/roboto';
import './styles/App.css';
import './styles/index.css';
import {
  Container,
  CssBaseline,
} from '@mui/material';
import './styles/App.css';
import './styles/index.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient'
import Signin from './signin';
import NavBar from './components/NavBar';

import VerifyUsers from './verifyusers';

const light = {
  palette: {
    mode: 'light',
  },
};

const dark = {
  palette: {
    mode: 'dark',
  },
};

const App = () => {
  const [session, setSession] = useState(null)
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [approved, setApproved] = useState();
  const [awaiting, setAwaiting] = useState();

  const user = supabase.auth.user();

  useEffect(() => {
    setSession(supabase.auth.session())
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  const handleVerify = () => {
    let verified = false
    if (approved && user) {
      if (user.email.substring(user.email.length - 14) === '@securonix.com') verified = true
      if (approved.includes(user.email)) verified = true
    }
    return verified;
  }

  useEffect(() => {
    const verify = async () => {
      const { data, error } = await supabase
        .from('ssaqs')
        .select('*')
        .eq('id', 1)
      if (!error) {
        setApproved(data[0].approved)
        setAwaiting(data[0].awaiting)
      }
    }
    verify()
  }, [])

  const changeTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <>
      {!session || !handleVerify() ? <Signin /> :
        <ThemeProvider theme={isDarkTheme ? createTheme(dark) : createTheme(light)}>
          <NavBar isDarkTheme={isDarkTheme} changeTheme={changeTheme} setAdmin={setAdmin} admin={admin} />
          <CssBaseline />
          <Container id='contain' sx={{ display: 'grid', justifyContent: 'center' }}>
            {admin &&
              <VerifyUsers approved={approved} setApproved={setApproved} awaiting={awaiting} setAwaiting={setAwaiting} />
            }
            Hello World!
          </Container>
        </ThemeProvider>
      }
    </>
  )
};

export default App;