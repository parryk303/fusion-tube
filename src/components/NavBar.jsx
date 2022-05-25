import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import LogoutIcon from '@mui/icons-material/Logout';
import LightSwitch from './LightSwitch';
import {
  Toolbar,
  AppBar,
  IconButton,
  Button,
  Typography,
  Box,
  Popper,
  Fade,
} from '@mui/material';
import { supabase } from '../supabaseClient';
import { useState } from 'react';

export default function NavBar({ isDarkTheme, changeTheme, admin, setAdmin }) {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [placement, setPlacement] = useState();

  const user = supabase.auth.user();
  const admins = ['kparry@securonix.com', 'mosman@securonix.com']

  const handleClick = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  return (
    <Box sx={{ flexGrow: 1, width: '100%' }}>
      <AppBar id={`${isDarkTheme ? 'navDark' : 'nav'}`} position='static'>
        <Toolbar id='tool' sx={{ justifyContent: 'space-between', padding: '1%' }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {user && admins.includes(user.email) &&
              <IconButton id='adminButton' size='large' aria-label='Collection' sx={{ mr: 2 }} onClick={() => setAdmin(!admin)}>
                <VerifiedUserIcon />
              </IconButton>
            }
          </Box>
          <Box>
            <img id='logo' src='/logoBig.png' alt='logo' width='481' height='80' />
          </Box>
          {user &&
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <img
                onClick={handleClick('bottom')}
                id='profile'
                src={user.user_metadata.picture}
                alt='profile'
                width='80'
                height='80'
                decode='async'
              />
              <LightSwitch sx={{ marginLeft: '10%' }} theme={isDarkTheme} onChange={changeTheme} />
              <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
                {({ TransitionProps }) => (
                  <Fade {...TransitionProps} timeout={350}>
                    <Typography sx={{ p: 2 }}>
                      <Button sx={{ marginRight: '-20px', mr: 2 }} id='navButton' onClick={() => supabase.auth.signOut()} size='large' aria-label='Logout' type='submit'>
                        Logout <LogoutIcon />
                      </Button>
                    </Typography>
                  </Fade>
                )}
              </Popper>
            </Box>
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
}
