// Enhanced storage service for Vercel serverless functions
// Uses global variables with fallback to file-based storage

import fs from 'fs';
import path from 'path';

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

// Storage file paths
const STORAGE_DIR = path.join(__dirname, '../../storage');
const USERS_FILE = path.join(STORAGE_DIR, 'users.json');
const DATES_FILE = path.join(STORAGE_DIR, 'dates.json');

// Ensure storage directory exists
if (!fs.existsSync(STORAGE_DIR)) {
  fs.mkdirSync(STORAGE_DIR, { recursive: true });
}

// Initialize storage files if they don't exist
if (!fs.existsSync(USERS_FILE)) {
  fs.writeFileSync(USERS_FILE, JSON.stringify([], null, 2));
}

if (!fs.existsSync(DATES_FILE)) {
  fs.writeFileSync(DATES_FILE, JSON.stringify([], null, 2));
}

// Global storage (for current function invocation)
declare global {
  var __usersStorage: User[] | undefined;
  var __datesStorage: Date[] | undefined;
}

// Load data from files
const loadUsersFromFile = (): User[] => {
  try {
    const data = fs.readFileSync(USERS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading users from file:', error);
    return [];
  }
};

const loadDatesFromFile = (): Date[] => {
  try {
    const data = fs.readFileSync(DATES_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading dates from file:', error);
    return [];
  }
};

// Save data to files
const saveUsersToFile = (users: User[]) => {
  try {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
  } catch (error) {
    console.error('Error saving users to file:', error);
  }
};

const saveDatesToFile = (dates: Date[]) => {
  try {
    fs.writeFileSync(DATES_FILE, JSON.stringify(dates, null, 2));
  } catch (error) {
    console.error('Error saving dates to file:', error);
  }
};

// Initialize storage
if (!global.__usersStorage) {
  global.__usersStorage = loadUsersFromFile();
}

if (!global.__datesStorage) {
  global.__datesStorage = loadDatesFromFile();
}

export const usersStorage = global.__usersStorage;
export const datesStorage = global.__datesStorage;

// User storage functions
export const createUser = (user: User): User => {
  usersStorage.push(user);
  saveUsersToFile(usersStorage);
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
  saveDatesToFile(datesStorage);
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
  saveDatesToFile(datesStorage);
  return datesStorage[dateIndex];
};

export const deleteDate = (id: string, userId: string): boolean => {
  const dateIndex = datesStorage.findIndex(date => date.id === id && date.userId === userId);
  if (dateIndex === -1) return false;
  
  datesStorage.splice(dateIndex, 1);
  saveDatesToFile(datesStorage);
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

// Force reload from files (useful for debugging)
export const reloadFromFiles = () => {
  global.__usersStorage = loadUsersFromFile();
  global.__datesStorage = loadDatesFromFile();
}; 