import './styles/App.css'
import './styles/index.css';
import {
  Box
} from '@mui/material';
import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import Section from './components/Section'
import Video from './components/Video';
import NavBar from './components/NavBar';
import Signin from './signin';
import VerifyUsers from './verifyusers';

const light = {
  palette: {
    mode: 'light',
  },
  typography: {
    fontFamily: 'HandelGo'
  }
};

const dark = {
  palette: {
    mode: 'dark',
  },
  typography: {
    fontFamily: 'HandelGo'
  }
};

const App = () => {
  const genreIncrement = 15
  const [session, setSession] = useState(null)
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [approved, setApproved] = useState();
  const [awaiting, setAwaiting] = useState();

  const [show, setShow] = useState(false);
  const [saved, setSaved] = useState(false);
  const [movie, setMovie] = useState();

  const [genres, setGenres] = useState(null)
  const [limit, setLimit] = useState(genreIncrement)

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

  const fetchData = async () => {
    const response = await fetch('/.netlify/functions/getGenres', {
      method: 'POST',
      body: limit,
    })
    const responseBody = await response.json()
    setGenres(responseBody.data.reference_list.values)
  }

  console.log(limit)

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit])

  const changeTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const handleShow = (selected) => {
    setMovie(selected)
    setShow(!show);
  };

  const handleFav = () => {
    setSaved(!saved);
  };

  return (
    <>
      {!session || !handleVerify() ? <Signin /> :
        <ThemeProvider theme={isDarkTheme ? createTheme(dark) : createTheme(light)}>
          {!show &&
            <NavBar isDarkTheme={isDarkTheme} changeTheme={changeTheme} admin={admin} setAdmin={setAdmin} />
          }
          <CssBaseline />
          <Box sx={{ flexGrow: 1, width: '100%', justifyContent: 'center', display: 'grid' }}>
            {/* <HeroSection /> */}
            {genres && !show && (
              <Box sx={{ flexGrow: 1, width: '100%', justifyContent: 'center', marginTop: '2%' }}>
                {/* {Object.values(genres).map((genre) => (
                  <Section key={genre.value} genre={genre.value} />
                ))} */}
                <Section genre={'RIN'} handleShow={handleShow} />
                <Section genre={'Snyper'} handleShow={handleShow} />
              </Box>
            )}
            {show && movie &&
              <Video handleShow={handleShow} handleFav={handleFav} saved={saved} movie={movie} />
            }
            <div
              className='page-end'
              onMouseEnter={() => {
                setLimit(limit + genreIncrement)
              }}
            />
            {admin &&
              <VerifyUsers approved={approved} setApproved={setApproved} awaiting={awaiting} setAwaiting={setAwaiting} />
            }
          </Box>

        </ThemeProvider>
      }
    </>
  )
}

export default App
