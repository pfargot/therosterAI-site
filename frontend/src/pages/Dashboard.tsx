import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Avatar,
  Chip,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  Add as AddIcon,
  People,
  Assessment,
  TrendingUp,
  Favorite,
} from '@mui/icons-material';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const stats = [
    {
      title: 'Total Dates',
      value: '12',
      icon: <Assessment sx={{ fontSize: 40, color: 'primary.main' }} />,
      color: 'primary.main',
    },
    {
      title: 'Active Prospects',
      value: '5',
      icon: <People sx={{ fontSize: 40, color: 'secondary.main' }} />,
      color: 'secondary.main',
    },
    {
      title: 'Evaluations',
      value: '8',
      icon: <TrendingUp sx={{ fontSize: 40, color: 'success.main' }} />,
      color: 'success.main',
    },
    {
      title: 'Green Flags',
      value: '23',
      icon: <Favorite sx={{ fontSize: 40, color: 'error.main' }} />,
      color: 'error.main',
    },
  ];

  const recentDates = [
    {
      id: '1',
      name: 'Sarah Johnson',
      date: '2024-01-15',
      rating: 8,
      status: 'completed',
    },
    {
      id: '2',
      name: 'Mike Chen',
      date: '2024-01-12',
      rating: 6,
      status: 'completed',
    },
    {
      id: '3',
      name: 'Emma Davis',
      date: '2024-01-10',
      rating: 9,
      status: 'completed',
    },
  ];

  return (
    <Box>
      {/* Welcome Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Welcome back, {user?.firstName || user?.username}!
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Here's what's happening with your dating roster
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  {stat.icon}
                  <Box sx={{ ml: 2 }}>
                    <Typography variant="h4" component="div" fontWeight="bold">
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {stat.title}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Quick Actions */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Quick Actions
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => navigate('/evaluation')}
                >
                  Add Date Evaluation
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => navigate('/roster')}
                >
                  View Roster
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => navigate('/insights')}
                >
                  View Insights
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Activity
              </Typography>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  • Added evaluation for Sarah Johnson (8/10)
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Updated profile for Mike Chen
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • New insight: "You tend to connect well with people who share your interest in travel"
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Recent Dates */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Recent Dates
          </Typography>
          <Box>
            {recentDates.map((date) => (
              <Box
                key={date.id}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  py: 1,
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                  '&:last-child': { borderBottom: 'none' },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                    {date.name.charAt(0)}
                  </Avatar>
                  <Box>
                    <Typography variant="body1" fontWeight="medium">
                      {date.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {new Date(date.date).toLocaleDateString()}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Chip
                    label={`${date.rating}/10`}
                    size="small"
                    color={date.rating >= 8 ? 'success' : date.rating >= 6 ? 'warning' : 'error'}
                  />
                  <Button
                    size="small"
                    onClick={() => navigate(`/evaluation/${date.id}`)}
                  >
                    View
                  </Button>
                </Box>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Dashboard; 