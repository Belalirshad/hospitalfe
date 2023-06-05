import { Avatar, Card, CardContent, Typography } from '@mui/material';
import { pink } from '@mui/material/colors';
import { Box } from '@mui/system';
import React from 'react';
import useAuth from '../../../../Hooks/useAuth';
import jwtDecode from  'jwt-decode';
const UserProfile = () => {
    const { user } = useAuth();
    let token = localStorage.getItem('token');
    let name = jwtDecode(token).companyName;
    let email = jwtDecode(token).email;
    return (
        <Card sx={{ display: { xs: 'flex-wrap', md: 'flex' }, maxWidth: '600px', my: 8, mx: 'auto', p: 5 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h5">
                        Welcome to Thakur Hospital, {name}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        {email}
                    </Typography>
                </CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                </Box>
            </Box>
            <Avatar
                sx={{ mx: { xs: "auto", md: 1 }, border: 1, borderColor: '#f48fb1', boxShadow: 1, bgcolor: pink[500], width: 150, height: 150 }}
                alt={name}
                src={user.photoURL}
            />
        </Card>
    );
};

export default UserProfile;