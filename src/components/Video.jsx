
import React from 'react';
import { Player } from 'video-react';
import HighlightOffTwoToneIcon from '@mui/icons-material/HighlightOffTwoTone';

import { IconButton, Box } from '@mui/material';

const Video = ({ handleShow }) => {
    return (
        <Box id='player'>
            <IconButton aria-label='close' sx={{ marginTop: '-5%' }} onClick={handleShow}>
                <HighlightOffTwoToneIcon />
            </IconButton>

            <Player playsInline poster='https://video-react.js.org/assets/poster.png'>
                <source src='https://kyles3bucket303.s3.us-east-2.amazonaws.com/GMT20220315-222555_Recording_1920x1080.mp4' type='video/mp4' />
            </Player>
        </Box>
    );
};

export default Video;