import React from 'react';
import { Box, Typography, Card, CardContent, Switch, FormControlLabel } from '@mui/material';

const Settings: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>
      
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Notifications
          </Typography>
          
          <FormControlLabel
            control={<Switch defaultChecked />}
            label="Email notifications"
          />
          
          <FormControlLabel
            control={<Switch defaultChecked />}
            label="Push notifications"
          />
          
          <FormControlLabel
            control={<Switch />}
            label="Weekly insights"
          />
        </CardContent>
      </Card>
    </Box>
  );
};

export default Settings; 