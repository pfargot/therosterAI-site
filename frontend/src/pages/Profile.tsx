import React from 'react';
import { Box, Typography, Card, CardContent, Avatar, Button } from '@mui/material';

const Profile: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Profile
      </Typography>
      
      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Avatar sx={{ width: 80, height: 80, mr: 3, bgcolor: 'primary.main' }}>
              U
            </Avatar>
            <Box>
              <Typography variant="h5">User Profile</Typography>
              <Typography variant="body1" color="text.secondary">
                Member since January 2024
              </Typography>
            </Box>
          </Box>
          
          <Typography variant="body1" sx={{ mb: 2 }}>
            This is your profile page where you can manage your account settings and preferences.
          </Typography>
          
          <Button variant="outlined">
            Edit Profile
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Profile; 