import * as React from 'react';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Speed from './Speed';

export default function Filter({ }) {

    return (
        <Box sx={{ display: 'grid', justifyContent: 'space-between', alignItems: 'center', width: '400px' }}>
            <Box>
                <Stack spacing={3} sx={{ padding: '0.5%', width: '300px' }}>
                    <Autocomplete
                        multiple
                        options={['RIN', 'Snyper']}
                        renderTags={(value, getTagProps) =>
                            value.map((option, i) => (
                                <Chip key={i} sx={{ fontFamily: 'HandelGo' }} variant='outlined' label={option} {...getTagProps({ i })} />
                            ))
                        }
                        renderInput={(params) => (
                            <TextField
                                id='tagFilter'
                                {...params}
                                label='search'
                                placeholder=''
                            />
                        )}
                    />
                </Stack>
            </Box>
            <Box>
                <Speed  />
            </Box>

        </Box>

    );
}