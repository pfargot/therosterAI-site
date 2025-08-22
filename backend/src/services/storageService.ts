// Supabase storage service for Vercel serverless functions
// Uses Supabase for reliable data persistence

interface User {
  id: string;
  email: string;
  username: string;
  firstName?: string;
  lastName?: string;
  password: string;
  createdAt: string;
}

interface Date {
  id: string;
  userId: string;
  name: string;
  rating: number;
  chemistryRating: number;
  attractionRating: number;
  vibeCheck: string;
  emotionalImpact: string;
  conversationQuality: string;
  notes?: string;
  profileImage?: string;
  imageAnalysis?: any;
  createdAt: string;
}

// For MVP, we'll use a simple in-memory fallback with better session management
// In production, this should be replaced with Supabase

// Global storage with better session tracking
declare global {
  var __usersStorage: User[] | undefined;
  var __datesStorage: Date[] | undefined;
  var __sessionId: string | undefined;
}

// Initialize storage with session tracking
const initializeStorage = () => {
  if (!global.__sessionId) {
    global.__sessionId = `session-${Date.now()}`;
    console.log('New session created:', global.__sessionId);
  }
  
  if (!global.__usersStorage) {
    global.__usersStorage = [];
    console.log('Initialized users storage for session:', global.__sessionId);
  }
  
  if (!global.__datesStorage) {
    global.__datesStorage = [];
    console.log('Initialized dates storage for session:', global.__sessionId);
  }
};

// Initialize immediately
initializeStorage();

export const usersStorage = global.__usersStorage!;
export const datesStorage = global.__datesStorage!;

// User storage functions
export const createUser = (user: User): User => {
  initializeStorage();
  console.log('Creating user:', user.email, 'Session:', global.__sessionId);
  usersStorage.push(user);
  console.log('Total users in session:', usersStorage.length);
  return user;
};

export const findUserByEmail = (email: string): User | undefined => {
  initializeStorage();
  return usersStorage.find(user => user.email === email);
};

export const findUserById = (id: string): User | undefined => {
  initializeStorage();
  return usersStorage.find(user => user.id === id);
};

export const findUserByUsername = (username: string): User | undefined => {
  initializeStorage();
  return usersStorage.find(user => user.username === username);
};

// Date storage functions
export const createDate = (date: Date): Date => {
  initializeStorage();
  console.log('Creating date for user:', date.userId, 'Name:', date.name, 'Session:', global.__sessionId);
  datesStorage.push(date);
  console.log('Total dates in session:', datesStorage.length);
  return date;
};

export const findDatesByUserId = (userId: string): Date[] => {
  initializeStorage();
  console.log('Finding dates for user:', userId, 'Session:', global.__sessionId);
  const userDates = datesStorage.filter(date => date.userId === userId);
  console.log('Found dates for user:', userDates.length, 'Session:', global.__sessionId);
  return userDates;
};

export const findDateById = (id: string): Date | undefined => {
  initializeStorage();
  return datesStorage.find(date => date.id === id);
};

export const updateDate = (id: string, userId: string, updateData: Partial<Date>): Date | null => {
  initializeStorage();
  const dateIndex = datesStorage.findIndex(date => date.id === id && date.userId === userId);
  if (dateIndex === -1) return null;
  
  datesStorage[dateIndex] = { ...datesStorage[dateIndex], ...updateData };
  return datesStorage[dateIndex];
};

export const deleteDate = (id: string, userId: string): boolean => {
  initializeStorage();
  const dateIndex = datesStorage.findIndex(date => date.id === id && date.userId === userId);
  if (dateIndex === -1) return false;
  
  datesStorage.splice(dateIndex, 1);
  return true;
};

// Utility functions
export const getStorageStats = () => {
  initializeStorage();
  const stats = {
    users: usersStorage.length,
    dates: datesStorage.length,
    uniqueUsers: new Set(datesStorage.map(d => d.userId)).size,
    sessionId: global.__sessionId
  };
  console.log('Storage stats for session:', global.__sessionId, ':', stats);
  return stats;
};

// Debug function to show all data
export const debugStorage = () => {
  initializeStorage();
  console.log('=== STORAGE DEBUG ===');
  console.log('Session ID:', global.__sessionId);
  console.log('Users:', usersStorage.map(u => ({ id: u.id, email: u.email })));
  console.log('Dates:', datesStorage.map(d => ({ id: d.id, userId: d.userId, name: d.name })));
  console.log('====================');
};

// Force new session (useful for testing)
export const resetStorage = () => {
  global.__sessionId = `session-${Date.now()}`;
  global.__usersStorage = [];
  global.__datesStorage = [];
  console.log('Storage reset, new session:', global.__sessionId);
}; 