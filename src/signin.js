import {
    Button,
    Typography,
    Box,
} from '@mui/material';
import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'

export default function Signin() {
    const [email, setEmail] = useState('');
    const [approved, setApproved] = useState();
    const [awaiting, setAwaiting] = useState();
    const [isVerified, setIsVerified] = useState();
    const user = supabase.auth.user();

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

    useEffect(() => {
        const handleVerify = () => {
            let verified = false
            if (approved && user) {
                if (user.email.substring(user.email.length - 14) === '@securonix.com') verified = true
                if (approved.includes(user.email)) verified = true
            }
            return verified;
        }
        if (user) {
            setEmail(user.email)
            setIsVerified(handleVerify())
        }
    }, [user, approved]);

    useEffect(() => {
        if (awaiting && user && !isVerified && email) {
            const updateAwaiting = async () => {
                await supabase
                    .from('ssaqs')
                    .update({ awaiting: [...awaiting, email] })
                    .eq('id', 1);
            }
            const include = !awaiting.includes(email)
            if (user && include) {
                updateAwaiting();
            }
        }
    }, [user, awaiting, email, isVerified]);

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const { error } = await supabase.auth.signIn({
                provider: 'google',
            })
            if (error) throw error
        } catch (error) {
            alert(error.error_description || error.message)
        }
    }

    return (
        <Box id='auth' >
            <Box id='signin' aria-live='polite'>
                {user && !isVerified ? (
                    <Box sx={{ display: 'grid', fontFamily: 'HandelGo', justifyContent: 'center', width: '60%' }}>
                        <Typography sx={{ fontFamily: 'HandelGo' }} variant='h5'>
                            Please check your inbox at {email} for access verification
                        </Typography>
                        <Button onClick={handleLogin} aria-live='polite'>
                            use another account?
                        </Button>
                    </Box>
                ) : (
                    <Box>
                        <Box sx={{ display: 'flex', fontFamily: 'HandelGo', justifyContent: 'center' }}>
                            <Typography sx={{ fontFamily: 'HandelGo' }} variant='h3'>Fusion Tube</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '2%' }}>
                            <Button onClick={handleLogin} aria-live='polite'>
                                Sign in via Google
                            </Button>
                        </Box>
                    </Box>
                )}
            </Box>
        </Box>
    )
}