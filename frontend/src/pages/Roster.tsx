import React from 'react';
import { Box, Typography, Card, CardContent, Button, Avatar, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Roster: React.FC = () => {
  const navigate = useNavigate();

  const roster = [
    { id: '1', name: 'Sarah Johnson', age: 28, rating: 8, status: 'active' },
    { id: '2', name: 'Mike Chen', age: 31, rating: 6, status: 'active' },
    { id: '3', name: 'Emma Davis', age: 26, rating: 9, status: 'active' },
  ];

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">My Roster</Typography>
        <Button variant="contained" onClick={() => navigate('/evaluation')}>
          Add New Prospect
        </Button>
      </Box>

      <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
        {roster.map((person) => (
          <Card key={person.id}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                  {person.name.charAt(0)}
                </Avatar>
                <Box>
                  <Typography variant="h6">{person.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Age: {person.age}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <Chip label={`${person.rating}/10`} size="small" />
                <Chip label={person.status} size="small" color="success" />
              </Box>
              <Button size="small" onClick={() => navigate(`/evaluation/${person.id}`)}>
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default Roster; 