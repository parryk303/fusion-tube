
import HighlightOffTwoToneIcon from '@mui/icons-material/HighlightOffTwoTone';
import StarIcon from '@mui/icons-material/Star';

import { IconButton, Box, Typography } from '@mui/material';

const Video = ({ handleShow, handleFav, saved, movie }) => {
    return (
        <Box id='player'>
            <Box sx={{ flexGrow: 1, width: '100%', justifyContent: 'space-between', display: 'flex', marginTop: '-1%', alignItems: 'center', padding: '7px' }}>
                <Box>
                    <IconButton aria-label='add to saved' onClick={handleFav}>
                        <StarIcon fontSize='large' id={`${saved ? 'saved' : 'notSaved'}`} />
                    </IconButton>
                </Box>
                <Box>
                    <Typography variant='h3'>{movie.title}</Typography>
                </Box>
                <Box>
                    <IconButton aria-label='close' onClick={handleShow}>
                        <HighlightOffTwoToneIcon fontSize='large' />
                    </IconButton>
                </Box>
            </Box>

            <iframe id='frame' src={`${movie.thumbnail}`} poster="favicon.ico" width='1491' height='837' allow='autoplay' allowFullScreen='allowfullscreen'></iframe>
        
        </Box>
    );
};

export default Video;