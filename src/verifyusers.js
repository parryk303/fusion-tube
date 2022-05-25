import DoNotDisturb from '@mui/icons-material/DoNotDisturb';
import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import {
    Button,
    Typography,
    Box,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import { styled } from '@mui/material/styles';

const VerifyUsers = ({ approved, awaiting, setApproved, setAwaiting }) => {
    const [expanded, setExpanded] = useState();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [approvedUpdate, setApprovedUpdate] = useState(approved);
    const [awaitingUpdate, setAwaitingUpdate] = useState(awaiting);

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    useEffect(() => {
        const updateApproved = async () => {
            await supabase
                .from('ssaqs')
                .update({ approved: approvedUpdate, awaiting: awaitingUpdate })
                .eq('id', 1);
        }
        if (isSubmitting) {
            updateApproved();
            setApproved(approvedUpdate);
        }
    }, [isSubmitting, approvedUpdate, awaitingUpdate, setApproved])

    const handleVerify = (e) => {
        setAwaitingUpdate([...awaitingUpdate.filter(value => { return value !== e.target.name })])
        setAwaiting([...awaitingUpdate.filter(value => { return value !== e.target.name })])
        setApprovedUpdate([...approvedUpdate, e.target.name])
        setApproved(approvedUpdate);
        setIsSubmitting(true)
    }

    const handleRefuse = (e) => {
        setAwaitingUpdate([...awaitingUpdate.filter(value => { return value !== e.target.name })])
        setAwaiting(awaitingUpdate)
        setIsSubmitting(true)
    }

    const handleRemove = (e) => {
        setApprovedUpdate([...approvedUpdate.filter(value=> { return value !== e.target.name })])
        setApproved(approvedUpdate)
        setIsSubmitting(true)
    }

    return (
        <Box sx={{ marginBottom: '4%', fontFamily: 'HandelGo' }}>
            <h1>Manage Users</h1>
            <Box sx={{ display: 'grid' }}>
                <Accordion expanded={expanded === `panel1`} onChange={handleChange(`panel1`)}>
                    <AccordionSummary section='Verified Users' aria-controls={`panel1d-content`} id={`panel1d-header`}></AccordionSummary>
                    <AccordionDetails>
                        {approved.length > 0 ?
                            approved.map((user) => {
                                return (
                                    <Box key={user} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography variant='paragraph'> {user}
                                        </Typography>
                                        <Button name={user} onClick={handleRemove}>Remove<DeleteIcon /></Button>
                                    </Box>
                                )
                            }) : (
                                <Typography variant='paragraph'> no verified users </Typography>
                            )
                        }
                    </AccordionDetails>
                </Accordion>
            </Box>
            <Box sx={{ display: 'grid' }}>
                <Accordion expanded={expanded === `panel2`} onChange={handleChange(`panel2`)}>
                    <AccordionSummary section='Awaiting Verification' aria-controls={`panel2d-content`} id={`panel2d-header`}></AccordionSummary>
                    <AccordionDetails>
                        {awaiting.length > 0 ?
                            awaiting.map((user) => {
                                return (
                                    <Box key={user} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography variant='paragraph'> {user}
                                        </Typography>
                                        <Box>
                                            <Button sx={{ fontSize: '0.7rem' }} name={user} onClick={handleVerify}>Verify<DoneIcon /></Button>
                                            <Button sx={{ fontSize: '0.7rem' }} name={user} onClick={handleRefuse}>Refuse<DoNotDisturb /></Button>
                                        </Box>

                                    </Box>
                                )
                            }) : (
                                <Typography variant='paragraph'> none to verify </Typography>
                            )
                        }
                    </AccordionDetails>
                </Accordion>
            </Box>
        </Box >
    );
};

export default VerifyUsers;

const AccordionSummary = styled(({ section }) => (
    <>
        <Box className='box' sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box className='box' sx={{ display: 'flex', alignItems: 'center', padding: '2%' }}>
                <MuiAccordionSummary
                    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
                />
                <Box sx={{ display: 'flex' }}>
                    <Typography variant='h7' sx={{ marginLeft: '2%', width: '250px' }}>
                        {section === 'Verified Users' ?
                            <VerifiedUserIcon sx={{ color: '#019e9c' }} fontSize='large' /> :
                            <ManageSearchIcon sx={{ color: '#ff7b09' }} fontSize='large' />} {section}
                    </Typography>
                </Box>
            </Box>
        </Box>
    </>

))(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, .05)'
            : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
}));

const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
    alignItems: 'center'
}));