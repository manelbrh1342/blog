import type { UserProfile, UpdateProfileRequest } from '../types/user';
import { users } from '../data/users';

const STORAGE_KEY = 'blog_users';
const CURRENT_USER_KEY = 'blog_current_user';

// Initialize localStorage with mock data if empty
const initializeStorage = (): void => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
    }

    // Set default current user if not set
    const currentUser = localStorage.getItem(CURRENT_USER_KEY);
    if (!currentUser) {
        localStorage.setItem(CURRENT_USER_KEY, 'user-1'); // Default to Tech Vision
    }
};

// Get all users from storage
export const getAllUsers = (): UserProfile[] => {
    initializeStorage();
    // For static version, just return the constant users if localStorage fails or is empty
    return users;
};

// Get user by ID
export const getUserProfile = (id: string): Promise<UserProfile | null> => {
    const user = users.find(u => u.id === id);
    return Promise.resolve(user || null);
};

// Get current logged-in user
export const getCurrentUser = (): Promise<UserProfile | null> => {
    return Promise.resolve(users[0] || null); // Always return first user as logged in
};

// Update user profile
export const updateUserProfile = (
    id: string,
    data: UpdateProfileRequest
): Promise<UserProfile> => {
    const user = users.find(u => u.id === id);
    if (!user) throw new Error('User not found');
    return Promise.resolve({ ...user, ...data });
};

// Upload profile photo
export const uploadProfilePhoto = (
    id: string,
    photoFile: File
): Promise<string> => {
    return Promise.resolve("https://api.dicebear.com/7.x/avataaars/svg?seed=newphoto");
};

// Set current user (for testing/demo purposes)
export const setCurrentUser = (userId: string): void => {
    localStorage.setItem(CURRENT_USER_KEY, userId);
};

// Clear all data (for testing)
export const clearStorage = (): void => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(CURRENT_USER_KEY);
};
