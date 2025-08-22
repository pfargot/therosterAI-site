// Simple in-memory storage that persists across function invocations
// In production, this should be replaced with a real database

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

// Global storage (persists across function invocations in Vercel)
declare global {
  var __usersStorage: User[] | undefined;
  var __datesStorage: Date[] | undefined;
}

// Initialize storage if it doesn't exist
if (!global.__usersStorage) {
  global.__usersStorage = [];
}

if (!global.__datesStorage) {
  global.__datesStorage = [];
}

export const usersStorage = global.__usersStorage;
export const datesStorage = global.__datesStorage;

// User storage functions
export const createUser = (user: User): User => {
  usersStorage.push(user);
  return user;
};

export const findUserByEmail = (email: string): User | undefined => {
  return usersStorage.find(user => user.email === email);
};

export const findUserById = (id: string): User | undefined => {
  return usersStorage.find(user => user.id === id);
};

export const findUserByUsername = (username: string): User | undefined => {
  return usersStorage.find(user => user.username === username);
};

// Date storage functions
export const createDate = (date: Date): Date => {
  datesStorage.push(date);
  return date;
};

export const findDatesByUserId = (userId: string): Date[] => {
  return datesStorage.filter(date => date.userId === userId);
};

export const findDateById = (id: string): Date | undefined => {
  return datesStorage.find(date => date.id === id);
};

export const updateDate = (id: string, userId: string, updateData: Partial<Date>): Date | null => {
  const dateIndex = datesStorage.findIndex(date => date.id === id && date.userId === userId);
  if (dateIndex === -1) return null;
  
  datesStorage[dateIndex] = { ...datesStorage[dateIndex], ...updateData };
  return datesStorage[dateIndex];
};

export const deleteDate = (id: string, userId: string): boolean => {
  const dateIndex = datesStorage.findIndex(date => date.id === id && date.userId === userId);
  if (dateIndex === -1) return false;
  
  datesStorage.splice(dateIndex, 1);
  return true;
};

// Utility functions
export const getStorageStats = () => {
  return {
    users: usersStorage.length,
    dates: datesStorage.length,
    uniqueUsers: new Set(datesStorage.map(d => d.userId)).size
  };
}; 