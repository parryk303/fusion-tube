
import HighlightOffTwoToneIcon from '@mui/icons-material/HighlightOffTwoTone';
import StarIcon from '@mui/icons-material/Star';

import { IconButton, Box, Typography } from '@mui/material';

const Video = ({ handleShow, handleFav, saved, url }) => {
    return (
        <Box id='player'>
            <Box sx={{ flexGrow: 1, width: '100%', justifyContent: 'space-between', display: 'flex', marginTop: '-1%', alignItems: 'center', padding: '7px' }}>
                <Box>
                    <IconButton aria-label='add to saved' onClick={handleFav}>
                        <StarIcon fontSize='large' id={`${saved ? 'saved' : 'notSaved'}`} />
                    </IconButton>
                </Box>
                <Box>
                    <Typography variant='h3'>Title</Typography>
                </Box>
                <Box>
                    <IconButton aria-label='close' onClick={handleShow}>
                        <HighlightOffTwoToneIcon fontSize='large' />
                    </IconButton>
                </Box>
            </Box>

            <iframe id='frame' src='https://drive.google.com/file/d/15ShuJo17YjH6_KpRUDW67M2g4LY0K2Zl/preview' width='1491' height='837' allow='autoplay' allowfullscreen='allowfullscreen'></iframe>
        
        </Box>
    );
};

export default Video;