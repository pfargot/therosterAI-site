// Supabase storage service for reliable data persistence
// This replaces the in-memory storage with a real database

import { createClient } from '@supabase/supabase-js';

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

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.warn('⚠️ Supabase credentials not found. Using fallback in-memory storage.');
}

const supabase = supabaseUrl && supabaseKey 
  ? createClient(supabaseUrl, supabaseKey)
  : null;

// Fallback in-memory storage for development/testing
let fallbackUsers: User[] = [];
let fallbackDates: Date[] = [];

// User storage functions
export const createUser = async (user: User): Promise<User> => {
  console.log('Creating user:', user.email);
  
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('users')
        .insert([{
          id: user.id,
          email: user.email,
          username: user.username,
          first_name: user.firstName,
          last_name: user.lastName,
          password: user.password,
          created_at: user.createdAt
        }])
        .select()
        .single();
      
      if (error) {
        console.error('Supabase error creating user:', error);
        throw error;
      }
      
      console.log('User created in Supabase:', data.id);
      return user;
    } catch (error) {
      console.error('Failed to create user in Supabase, using fallback:', error);
    }
  }
  
  // Fallback to in-memory storage
  fallbackUsers.push(user);
  console.log('User created in fallback storage. Total users:', fallbackUsers.length);
  return user;
};

export const findUserByEmail = async (email: string): Promise<User | undefined> => {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single();
      
      if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
        console.error('Supabase error finding user by email:', error);
        throw error;
      }
      
      if (data) {
        return {
          id: data.id,
          email: data.email,
          username: data.username,
          firstName: data.first_name,
          lastName: data.last_name,
          password: data.password,
          createdAt: data.created_at
        };
      }
    } catch (error) {
      console.error('Failed to find user in Supabase, using fallback:', error);
    }
  }
  
  // Fallback to in-memory storage
  return fallbackUsers.find(user => user.email === email);
};

export const findUserById = async (id: string): Promise<User | undefined> => {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error && error.code !== 'PGRST116') {
        console.error('Supabase error finding user by id:', error);
        throw error;
      }
      
      if (data) {
        return {
          id: data.id,
          email: data.email,
          username: data.username,
          firstName: data.first_name,
          lastName: data.last_name,
          password: data.password,
          createdAt: data.created_at
        };
      }
    } catch (error) {
      console.error('Failed to find user in Supabase, using fallback:', error);
    }
  }
  
  // Fallback to in-memory storage
  return fallbackUsers.find(user => user.id === id);
};

export const findUserByUsername = async (username: string): Promise<User | undefined> => {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('username', username)
        .single();
      
      if (error && error.code !== 'PGRST116') {
        console.error('Supabase error finding user by username:', error);
        throw error;
      }
      
      if (data) {
        return {
          id: data.id,
          email: data.email,
          username: data.username,
          firstName: data.first_name,
          lastName: data.last_name,
          password: data.password,
          createdAt: data.created_at
        };
      }
    } catch (error) {
      console.error('Failed to find user in Supabase, using fallback:', error);
    }
  }
  
  // Fallback to in-memory storage
  return fallbackUsers.find(user => user.username === username);
};

// Date storage functions
export const createDate = async (date: Date): Promise<Date> => {
  console.log('Creating date for user:', date.userId, 'Name:', date.name);
  
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('dates')
        .insert([{
          id: date.id,
          user_id: date.userId,
          name: date.name,
          rating: date.rating,
          chemistry_rating: date.chemistryRating,
          attraction_rating: date.attractionRating,
          vibe_check: date.vibeCheck,
          emotional_impact: date.emotionalImpact,
          conversation_quality: date.conversationQuality,
          notes: date.notes,
          profile_image: date.profileImage,
          image_analysis: date.imageAnalysis,
          created_at: date.createdAt
        }])
        .select()
        .single();
      
      if (error) {
        console.error('Supabase error creating date:', error);
        throw error;
      }
      
      console.log('Date created in Supabase:', data.id);
      return date;
    } catch (error) {
      console.error('Failed to create date in Supabase, using fallback:', error);
    }
  }
  
  // Fallback to in-memory storage
  fallbackDates.push(date);
  console.log('Date created in fallback storage. Total dates:', fallbackDates.length);
  return date;
};

export const findDatesByUserId = async (userId: string): Promise<Date[]> => {
  console.log('Finding dates for user:', userId);
  
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('dates')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Supabase error finding dates:', error);
        throw error;
      }
      
      const dates = data?.map(row => ({
        id: row.id,
        userId: row.user_id,
        name: row.name,
        rating: row.rating,
        chemistryRating: row.chemistry_rating,
        attractionRating: row.attraction_rating,
        vibeCheck: row.vibe_check,
        emotionalImpact: row.emotional_impact,
        conversationQuality: row.conversation_quality,
        notes: row.notes,
        profileImage: row.profile_image,
        imageAnalysis: row.image_analysis,
        createdAt: row.created_at
      })) || [];
      
      console.log('Found dates in Supabase:', dates.length);
      return dates;
    } catch (error) {
      console.error('Failed to find dates in Supabase, using fallback:', error);
    }
  }
  
  // Fallback to in-memory storage
  const userDates = fallbackDates.filter(date => date.userId === userId);
  console.log('Found dates in fallback storage:', userDates.length);
  return userDates;
};

export const findDateById = async (id: string): Promise<Date | undefined> => {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('dates')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error && error.code !== 'PGRST116') {
        console.error('Supabase error finding date by id:', error);
        throw error;
      }
      
      if (data) {
        return {
          id: data.id,
          userId: data.user_id,
          name: data.name,
          rating: data.rating,
          chemistryRating: data.chemistry_rating,
          attractionRating: data.attraction_rating,
          vibeCheck: data.vibe_check,
          emotionalImpact: data.emotional_impact,
          conversationQuality: data.conversation_quality,
          notes: data.notes,
          profileImage: data.profile_image,
          imageAnalysis: data.image_analysis,
          createdAt: data.created_at
        };
      }
    } catch (error) {
      console.error('Failed to find date in Supabase, using fallback:', error);
    }
  }
  
  // Fallback to in-memory storage
  return fallbackDates.find(date => date.id === id);
};

export const updateDate = async (id: string, userId: string, updateData: Partial<Date>): Promise<Date | null> => {
  if (supabase) {
    try {
      const updatePayload: any = {};
      if (updateData.name) updatePayload.name = updateData.name;
      if (updateData.rating !== undefined) updatePayload.rating = updateData.rating;
      if (updateData.chemistryRating !== undefined) updatePayload.chemistry_rating = updateData.chemistryRating;
      if (updateData.attractionRating !== undefined) updatePayload.attraction_rating = updateData.attractionRating;
      if (updateData.vibeCheck) updatePayload.vibe_check = updateData.vibeCheck;
      if (updateData.emotionalImpact) updatePayload.emotional_impact = updateData.emotionalImpact;
      if (updateData.conversationQuality) updatePayload.conversation_quality = updateData.conversationQuality;
      if (updateData.notes !== undefined) updatePayload.notes = updateData.notes;
      if (updateData.profileImage !== undefined) updatePayload.profile_image = updateData.profileImage;
      if (updateData.imageAnalysis !== undefined) updatePayload.image_analysis = updateData.imageAnalysis;
      
      const { data, error } = await supabase
        .from('dates')
        .update(updatePayload)
        .eq('id', id)
        .eq('user_id', userId)
        .select()
        .single();
      
      if (error) {
        console.error('Supabase error updating date:', error);
        throw error;
      }
      
      if (data) {
        return {
          id: data.id,
          userId: data.user_id,
          name: data.name,
          rating: data.rating,
          chemistryRating: data.chemistry_rating,
          attractionRating: data.attraction_rating,
          vibeCheck: data.vibe_check,
          emotionalImpact: data.emotional_impact,
          conversationQuality: data.conversation_quality,
          notes: data.notes,
          profileImage: data.profile_image,
          imageAnalysis: data.image_analysis,
          createdAt: data.created_at
        };
      }
    } catch (error) {
      console.error('Failed to update date in Supabase, using fallback:', error);
    }
  }
  
  // Fallback to in-memory storage
  const dateIndex = fallbackDates.findIndex(date => date.id === id && date.userId === userId);
  if (dateIndex === -1) return null;
  
  fallbackDates[dateIndex] = { ...fallbackDates[dateIndex], ...updateData };
  return fallbackDates[dateIndex];
};

export const deleteDate = async (id: string, userId: string): Promise<boolean> => {
  if (supabase) {
    try {
      const { error } = await supabase
        .from('dates')
        .delete()
        .eq('id', id)
        .eq('user_id', userId);
      
      if (error) {
        console.error('Supabase error deleting date:', error);
        throw error;
      }
      
      console.log('Date deleted from Supabase');
      return true;
    } catch (error) {
      console.error('Failed to delete date in Supabase, using fallback:', error);
    }
  }
  
  // Fallback to in-memory storage
  const dateIndex = fallbackDates.findIndex(date => date.id === id && date.userId === userId);
  if (dateIndex === -1) return false;
  
  fallbackDates.splice(dateIndex, 1);
  return true;
};

// Utility functions
export const getStorageStats = async () => {
  let stats = {
    users: 0,
    dates: 0,
    uniqueUsers: 0,
    storageType: 'fallback'
  };
  
  if (supabase) {
    try {
      const [usersResponse, datesResponse] = await Promise.all([
        supabase.from('users').select('id', { count: 'exact' }),
        supabase.from('dates').select('user_id', { count: 'exact' })
      ]);
      
      const userCount = usersResponse.count || 0;
      const dateCount = datesResponse.count || 0;
      
      // Get unique users from dates
      const { data: uniqueUserData } = await supabase
        .from('dates')
        .select('user_id')
        .limit(1000); // Reasonable limit for MVP
      
      const uniqueUsers = new Set(uniqueUserData?.map(d => d.user_id) || []).size;
      
      stats = {
        users: userCount,
        dates: dateCount,
        uniqueUsers,
        storageType: 'supabase'
      };
    } catch (error) {
      console.error('Failed to get Supabase stats, using fallback:', error);
      stats = {
        users: fallbackUsers.length,
        dates: fallbackDates.length,
        uniqueUsers: new Set(fallbackDates.map(d => d.userId)).size,
        storageType: 'fallback'
      };
    }
  } else {
    stats = {
      users: fallbackUsers.length,
      dates: fallbackDates.length,
      uniqueUsers: new Set(fallbackDates.map(d => d.userId)).size,
      storageType: 'fallback'
    };
  }
  
  console.log('Storage stats:', stats);
  return stats;
};

// Debug function to show all data
export const debugStorage = async () => {
  console.log('=== STORAGE DEBUG ===');
  
  if (supabase) {
    console.log('Storage type: Supabase');
    try {
      const { data: users } = await supabase.from('users').select('id, email').limit(10);
      const { data: dates } = await supabase.from('dates').select('id, user_id, name').limit(10);
      
      console.log('Users (first 10):', users?.map(u => ({ id: u.id, email: u.email })));
      console.log('Dates (first 10):', dates?.map(d => ({ id: d.id, userId: d.user_id, name: d.name })));
    } catch (error) {
      console.error('Error fetching debug data from Supabase:', error);
    }
  } else {
    console.log('Storage type: Fallback (in-memory)');
    console.log('Users:', fallbackUsers.map(u => ({ id: u.id, email: u.email })));
    console.log('Dates:', fallbackDates.map(d => ({ id: d.id, userId: d.userId, name: d.name })));
  }
  
  console.log('====================');
};

// Force reload from database
export const reloadFromDatabase = async () => {
  if (supabase) {
    try {
      const { data: users } = await supabase.from('users').select('*');
      const { data: dates } = await supabase.from('dates').select('*');
      
      fallbackUsers = users?.map(row => ({
        id: row.id,
        email: row.email,
        username: row.username,
        firstName: row.first_name,
        lastName: row.last_name,
        password: row.password,
        createdAt: row.created_at
      })) || [];
      
      fallbackDates = dates?.map(row => ({
        id: row.id,
        userId: row.user_id,
        name: row.name,
        rating: row.rating,
        chemistryRating: row.chemistry_rating,
        attractionRating: row.attraction_rating,
        vibeCheck: row.vibe_check,
        emotionalImpact: row.emotional_impact,
        conversationQuality: row.conversation_quality,
        notes: row.notes,
        profileImage: row.profile_image,
        imageAnalysis: row.image_analysis,
        createdAt: row.created_at
      })) || [];
      
      console.log('Reloaded data from Supabase. Users:', fallbackUsers.length, 'Dates:', fallbackDates.length);
    } catch (error) {
      console.error('Failed to reload from Supabase:', error);
    }
  }
}; 