// Test script to check backend API
const BASE_URL = 'https://theroster-ai-site.vercel.app';

async function testBackend() {
  console.log('🧪 Testing Roster.AI Backend API...\n');

  // Test 1: Health Check
  try {
    console.log('1️⃣ Testing health endpoint...');
    const healthResponse = await fetch(`${BASE_URL}/api/health`);
    const healthData = await healthResponse.text();
    console.log('Health Response:', healthData);
    console.log('✅ Health check passed\n');
  } catch (error) {
    console.log('❌ Health check failed:', error.message);
  }

  // Test 2: Registration
  try {
    console.log('2️⃣ Testing registration endpoint...');
    const registerResponse = await fetch(`${BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'test@example.com',
        username: 'testuser',
        firstName: 'Test',
        lastName: 'User',
        password: 'password123'
      })
    });
    
    const registerData = await registerResponse.text();
    console.log('Registration Status:', registerResponse.status);
    console.log('Registration Response:', registerData);
    
    if (registerResponse.ok) {
      console.log('✅ Registration test passed\n');
    } else {
      console.log('❌ Registration test failed\n');
    }
  } catch (error) {
    console.log('❌ Registration test error:', error.message);
  }

  // Test 3: AI Insights
  try {
    console.log('3️⃣ Testing AI insights endpoint...');
    const insightsResponse = await fetch(`${BASE_URL}/api/ai/insights`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({})
    });
    
    const insightsData = await insightsResponse.text();
    console.log('Insights Status:', insightsResponse.status);
    console.log('Insights Response:', insightsData);
    
    if (insightsResponse.ok) {
      console.log('✅ AI insights test passed\n');
    } else {
      console.log('❌ AI insights test failed\n');
    }
  } catch (error) {
    console.log('❌ AI insights test error:', error.message);
  }
}

// Run the test
testBackend(); 