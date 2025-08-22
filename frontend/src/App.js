import React, { useState, useEffect } from 'react';
import './App.css';

// Backend URL configuration
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001';

function App() {
  const [dates, setDates] = useState([]);
  const [newDate, setNewDate] = useState({ 
    name: '', 
    rating: 5, 
    notes: '',
    chemistryRating: 5,
    attractionRating: 5,
    vibeCheck: 'meh',
    emotionalImpact: 'comfortable',
    conversationQuality: 'flowing',
    effortLevel: 'casual',
    bodyLanguage: 'open',
    greenFlags: [],
    redFlags: [],
    profileImage: null,
    imageAnalysis: null
  });
  const [activeTab, setActiveTab] = useState('home');
  const [user, setUser] = useState(null);
  const [authForm, setAuthForm] = useState({ email: '', password: '', username: '', firstName: '', lastName: '' });
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [insights, setInsights] = useState([]);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Check if user is logged in on app start
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      verifyToken(token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const verifyToken = async (token) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/auth/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        // Load user's dates
        await loadUserDates();
      } else {
        console.log('Token verification failed, removing token');
        localStorage.removeItem('token');
        setUser(null);
        setDates([]);
      }
    } catch (error) {
      console.error('Token verification error:', error);
      localStorage.removeItem('token');
      setUser(null);
      setDates([]);
    }
  };

  const loadUserDates = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('No token found, skipping loadUserDates');
        return;
      }

      console.log('Loading user dates...');
      const response = await fetch(`${BACKEND_URL}/api/dates`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('Loaded dates:', data.dates);
        setDates(data.dates);
      } else {
        console.error('Failed to load dates:', response.status);
        const errorData = await response.json();
        console.error('Error details:', errorData);
      }
    } catch (error) {
      console.error('Error loading dates:', error);
    }
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const endpoint = isLogin ? 'login' : 'register';
      const response = await fetch(`${BACKEND_URL}/api/auth/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(authForm)
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        setUser(data.user);
        
        // Load user's dates immediately after authentication
        await loadUserDates();
        
        if (!isLogin) {
          alert('🎉 Registration successful! Welcome to Roster.AI!');
        } else {
          alert('✅ Login successful! Welcome back!');
        }
        
        setActiveTab('home');
      } else {
        const errorData = await response.json();
        alert(`Authentication failed: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Auth error:', error);
      alert('Authentication error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setDates([]);
    setActiveTab('home');
  };

  const addDate = () => {
    if (!newDate.name.trim()) {
      alert('Please enter a name for the date');
      return;
    }

    const dateToAdd = {
      ...newDate,
      date: new Date().toLocaleDateString()
    };

    if (user) {
      // Save to backend
      saveDateToBackend(dateToAdd);
    } else {
      // Save to local state (fallback)
      setDates([...dates, dateToAdd]);
      alert('Date added to local roster (login to save permanently)');
      setActiveTab('roster');
    }
  };

  const saveDateToBackend = async (dateData) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found for saving date');
        alert('❌ Please log in to save dates');
        return;
      }

      console.log('Saving date to backend:', dateData);
      
      const response = await fetch(`${BACKEND_URL}/api/dates`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(dateData)
      });
      
      if (response.ok) {
        const result = await response.json();
        console.log('Date saved successfully:', result);
        
        // Reload dates to get the updated roster
        await loadUserDates();
        
        // Show success message
        alert('🎉 Date added to your roster successfully!');
        
        // Reset the form
        setNewDate({ 
          name: '', 
          rating: 5, 
          notes: '',
          chemistryRating: 5,
          attractionRating: 5,
          vibeCheck: 'meh',
          emotionalImpact: 'comfortable',
          conversationQuality: 'flowing',
          effortLevel: 'casual',
          bodyLanguage: 'open',
          greenFlags: [],
          redFlags: [],
          profileImage: null,
          imageAnalysis: null
        });
        
        // Navigate to roster to see the new date
        setActiveTab('roster');
      } else {
        const errorData = await response.json();
        console.error('Failed to save date:', errorData);
        alert('❌ Failed to save date: ' + (errorData.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error saving date:', error);
      alert('❌ Error saving date: ' + error.message);
    }
  };

  const testAPI = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/health`);
      if (response.ok) {
        alert('✅ Backend is running!');
      } else {
        alert('❌ Backend is not responding');
      }
    } catch (error) {
      alert('❌ Cannot connect to backend: ' + error.message);
    }
  };

  const getInsights = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/ai/insights`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': user ? `Bearer ${localStorage.getItem('token')}` : ''
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setInsights(data.insights);
        setActiveTab('insights');
      } else {
        alert('Failed to get insights');
      }
    } catch (error) {
      alert('Error getting insights: ' + error.message);
    }
  };

  const uploadImage = async (file) => {
    setUploadingImage(true);
    try {
      console.log('Uploading image:', file.name, 'Size:', file.size);
      
      // Check file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        alert('Image file must be less than 10MB');
        setUploadingImage(false);
        return;
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        setUploadingImage(false);
        return;
      }

      const formData = new FormData();
      formData.append('image', file);

      console.log('Sending image upload request...');
      const response = await fetch(`${BACKEND_URL}/api/upload/profile-image`, {
        method: 'POST',
        body: formData
      });

      console.log('Upload response status:', response.status);

      if (response.ok) {
        const data = await response.json();
        console.log('Upload successful:', data);
        
        // Update the newDate state with the image URL
        const updatedNewDate = { ...newDate, profileImage: data.imageUrl };
        setNewDate(updatedNewDate);
        
        // Show success message
        alert('✅ Image uploaded successfully! Analyzing with AI...');
        
        // Analyze the uploaded image
        try {
          console.log('Starting AI analysis...');
          const analysisResponse = await fetch(`${BACKEND_URL}/api/ai/analyze-image`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ imageUrl: data.imageUrl })
          });

          if (analysisResponse.ok) {
            const analysisData = await analysisResponse.json();
            console.log('AI analysis:', analysisData);
            
            // Update with both image URL and analysis
            setNewDate({ 
              ...updatedNewDate, 
              imageAnalysis: analysisData.analysis 
            });
            
            alert('🎉 AI analysis complete! Check the analysis below.');
          } else {
            console.log('AI analysis failed, but image uploaded successfully');
            alert('✅ Image uploaded! AI analysis failed, but you can still use the image.');
          }
        } catch (analysisError) {
          console.error('AI analysis error:', analysisError);
          alert('✅ Image uploaded! AI analysis failed, but you can still use the image.');
        }
      } else {
        const errorData = await response.json();
        console.error('Upload failed:', errorData);
        alert('❌ Failed to upload image: ' + (errorData.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('❌ Error uploading image: ' + error.message);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      uploadImage(file);
    }
  };

  const renderAuth = () => (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">THE ROSTER AI</h2>
        <div className="auth-subtitle">DATING IS A MESS • SORT IT OUT</div>
        
        <form onSubmit={handleAuth} className="auth-form">
          {!isLogin && (
            <>
              <input
                type="text"
                placeholder="Username"
                value={authForm.username}
                onChange={(e) => setAuthForm({...authForm, username: e.target.value})}
                className="auth-input"
                required
              />
              <input
                type="text"
                placeholder="First Name"
                value={authForm.firstName}
                onChange={(e) => setAuthForm({...authForm, firstName: e.target.value})}
                className="auth-input"
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                value={authForm.lastName}
                onChange={(e) => setAuthForm({...authForm, lastName: e.target.value})}
                className="auth-input"
                required
              />
            </>
          )}
          <input
            type="email"
            placeholder="Email"
            value={authForm.email}
            onChange={(e) => setAuthForm({...authForm, email: e.target.value})}
            className="auth-input"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={authForm.password}
            onChange={(e) => setAuthForm({...authForm, password: e.target.value})}
            className="auth-input"
            required
          />
          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? 'Loading...' : (isLogin ? 'LOGIN' : 'REGISTER')}
          </button>
        </form>
        
        <button 
          onClick={() => setIsLogin(!isLogin)} 
          className="auth-toggle"
        >
          {isLogin ? 'Need an account? Register' : 'Have an account? Login'}
        </button>
      </div>
    </div>
  );

  const renderHome = () => (
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-title">THE ROSTER AI</h1>
        <div className="home-subtitle">DATING IS A MESS • SORT IT OUT</div>
        
        <div className="home-features">
          <div className="feature-item">
            <span className="feature-icon">💡</span>
            <span className="feature-text">Get Unique Insight</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">📝</span>
            <span className="feature-text">RECORD Your Interactions</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">📱</span>
            <span className="feature-text">SHARE your Roster to the GC</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">⚖️</span>
            <span className="feature-text">SIDE by SIDE Comparisons</span>
          </div>
        </div>

        <div className="home-actions">
          <button onClick={() => setActiveTab('add-date')} className="action-button primary">
            ADD NEW DATE
          </button>
          <button onClick={() => setActiveTab('roster')} className="action-button secondary">
            VIEW ROSTER
          </button>
          <button onClick={getInsights} className="action-button secondary">
            GET AI INSIGHTS
          </button>
          <button onClick={testAPI} className="action-button secondary">
            TEST API
          </button>
        </div>

        {user && (
          <div className="user-info">
            <p>Welcome back, {user.firstName || user.username}!</p>
            <button onClick={logout} className="logout-button">
              LOGOUT
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const renderAddDate = () => (
    <div className="add-date-container">
      <h2 className="section-title">ADD NEW DATE</h2>
      <div className="form-container">
        <div className="form-group">
          <label className="form-label">Name:</label>
          <input
            type="text"
            value={newDate.name}
            onChange={(e) => setNewDate({...newDate, name: e.target.value})}
            className="form-input"
            placeholder="Enter their name"
          />
        </div>

        {/* Image Upload */}
        <div className="form-group">
          <label className="form-label">Profile Picture:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="form-input file-input"
          />
          {uploadingImage && <p className="upload-status">Uploading and analyzing image...</p>}
          {newDate.profileImage && (
            <div className="image-preview">
              <img 
                src={`${BACKEND_URL}${newDate.profileImage}`} 
                alt="Profile" 
                className="profile-image"
              />
              {newDate.imageAnalysis && (
                <div className="image-analysis">
                  <h4>AI Analysis:</h4>
                  <p>Attractiveness: {newDate.imageAnalysis.attractiveness}/10</p>
                  <p>Confidence: {newDate.imageAnalysis.confidence}/10</p>
                  <p>Style: {newDate.imageAnalysis.style}</p>
                  <p>Mood: {newDate.imageAnalysis.mood}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Overall Rating */}
        <div className="form-group">
          <label className="form-label">Overall Rating (1-10):</label>
          <input
            type="range"
            min="1"
            max="10"
            value={newDate.rating}
            onChange={(e) => setNewDate({...newDate, rating: parseInt(e.target.value)})}
            className="form-range"
          />
          <span className="rating-display">{newDate.rating}/10</span>
        </div>

        {/* Chemistry Rating */}
        <div className="form-group">
          <label className="form-label">Chemistry Rating (1-10):</label>
          <input
            type="range"
            min="1"
            max="10"
            value={newDate.chemistryRating}
            onChange={(e) => setNewDate({...newDate, chemistryRating: parseInt(e.target.value)})}
            className="form-range"
          />
          <span className="rating-display">{newDate.chemistryRating}/10</span>
        </div>

        {/* Attraction Rating */}
        <div className="form-group">
          <label className="form-label">Physical Attraction (1-10):</label>
          <input
            type="range"
            min="1"
            max="10"
            value={newDate.attractionRating}
            onChange={(e) => setNewDate({...newDate, attractionRating: parseInt(e.target.value)})}
            className="form-range"
          />
          <span className="rating-display">{newDate.attractionRating}/10</span>
        </div>

        {/* Vibe Check */}
        <div className="form-group">
          <label className="form-label">Vibe Check:</label>
          <select
            value={newDate.vibeCheck}
            onChange={(e) => setNewDate({...newDate, vibeCheck: e.target.value})}
            className="form-select"
          >
            <option value="amazing">Amazing</option>
            <option value="good">Good</option>
            <option value="meh">Meh</option>
            <option value="bad">Bad</option>
            <option value="never again">Never Again</option>
          </select>
        </div>

        {/* Emotional Impact */}
        <div className="form-group">
          <label className="form-label">How did you feel?</label>
          <select
            value={newDate.emotionalImpact}
            onChange={(e) => setNewDate({...newDate, emotionalImpact: e.target.value})}
            className="form-select"
          >
            <option value="energized">Energized</option>
            <option value="comfortable">Comfortable</option>
            <option value="neutral">Neutral</option>
            <option value="drained">Drained</option>
            <option value="anxious">Anxious</option>
          </select>
        </div>

        {/* Conversation Quality */}
        <div className="form-group">
          <label className="form-label">Conversation Quality:</label>
          <select
            value={newDate.conversationQuality}
            onChange={(e) => setNewDate({...newDate, conversationQuality: e.target.value})}
            className="form-select"
          >
            <option value="flowing">Flowing</option>
            <option value="deep">Deep</option>
            <option value="surface-level">Surface Level</option>
            <option value="awkward pauses">Awkward Pauses</option>
            <option value="forced">Forced</option>
          </select>
        </div>

        {/* Notes */}
        <div className="form-group">
          <label className="form-label">Detailed Notes:</label>
          <textarea
            value={newDate.notes}
            onChange={(e) => setNewDate({...newDate, notes: e.target.value})}
            className="form-textarea"
            placeholder="How was the date? Any red/green flags? What did you learn about them?"
          />
        </div>

        <div className="form-actions">
          <button onClick={addDate} className="action-button primary">
            ADD TO ROSTER
          </button>
          <button onClick={() => setActiveTab('home')} className="action-button secondary">
            BACK TO HOME
          </button>
        </div>
      </div>
    </div>
  );

  const renderRoster = () => (
    <div className="roster-container">
      <h2 className="section-title">YOUR ROSTER</h2>
      <div className="roster-grid">
        {dates.length === 0 ? (
          <div className="empty-state">
            <p>No dates in your roster yet.</p>
            <button onClick={() => setActiveTab('add-date')} className="action-button primary">
              ADD YOUR FIRST DATE
            </button>
          </div>
        ) : (
          dates.map((date) => (
            <div key={date.id} className="date-card">
              <h3 className="date-name">{date.name}</h3>
              <p className="date-date">{date.date}</p>
              <div className="date-ratings">
                <p className="rating-item">Overall: {'⭐'.repeat(date.rating)} ({date.rating}/10)</p>
                <p className="rating-item">Chemistry: {'❤️'.repeat(date.chemistryRating || 0)} ({date.chemistryRating || 0}/10)</p>
                <p className="rating-item">Attraction: {'🔥'.repeat(date.attractionRating || 0)} ({date.attractionRating || 0}/10)</p>
                <p className="rating-item">Vibe: {date.vibeCheck || 'N/A'}</p>
                <p className="rating-item">Felt: {date.emotionalImpact || 'N/A'}</p>
              </div>
              {date.profileImage && (
                <img 
                  src={`${BACKEND_URL}${date.profileImage}`} 
                  alt="Profile" 
                  className="date-image"
                />
              )}
              {date.notes && <p className="date-notes">{date.notes}</p>}
            </div>
          ))
        )}
      </div>
      <button onClick={() => setActiveTab('home')} className="action-button secondary">
        BACK TO HOME
      </button>
    </div>
  );

  const renderInsights = () => (
    <div className="insights-container">
      <h2 className="section-title">AI INSIGHTS</h2>
      <div className="insights-grid">
        {insights.map((insight, index) => (
          <div key={index} className="insight-card">
            <h3 className="insight-title">{insight.title}</h3>
            <p className="insight-content">{insight.content}</p>
            <div className="insight-type">{insight.type}</div>
          </div>
        ))}
      </div>
      <button onClick={() => setActiveTab('home')} className="action-button secondary">
        BACK TO HOME
      </button>
    </div>
  );

  return (
    <div className="app">
      {!user && activeTab === 'home' ? renderAuth() : (
        <>
          {activeTab === 'home' && renderHome()}
          {activeTab === 'add-date' && renderAddDate()}
          {activeTab === 'roster' && renderRoster()}
          {activeTab === 'insights' && renderInsights()}
        </>
      )}
    </div>
  );
}

export default App; 