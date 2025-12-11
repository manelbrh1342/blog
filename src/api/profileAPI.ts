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
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : users;
};

// Get user by ID
export const getUserProfile = (id: string): Promise<UserProfile | null> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const allUsers = getAllUsers();
            const user = allUsers.find(u => u.id === id);
            resolve(user || null);
        }, 300); // Simulate network delay
    });
};

// Get current logged-in user
export const getCurrentUser = (): Promise<UserProfile | null> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            initializeStorage();
            const currentUserId = localStorage.getItem(CURRENT_USER_KEY);
            if (!currentUserId) {
                resolve(null);
                return;
            }

            const allUsers = getAllUsers();
            const user = allUsers.find(u => u.id === currentUserId);
            resolve(user || null);
        }, 200);
    });
};

// Update user profile
export const updateUserProfile = (
    id: string,
    data: UpdateProfileRequest
): Promise<UserProfile> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const allUsers = getAllUsers();
            const userIndex = allUsers.findIndex(u => u.id === id);

            if (userIndex === -1) {
                reject(new Error('User not found'));
                return;
            }

            // Update user data
            allUsers[userIndex] = {
                ...allUsers[userIndex],
                ...data
            };

            // Save to localStorage
            localStorage.setItem(STORAGE_KEY, JSON.stringify(allUsers));

            resolve(allUsers[userIndex]);
        }, 500); // Simulate network delay
    });
};

// Upload profile photo
export const uploadProfilePhoto = (
    id: string,
    photoFile: File
): Promise<string> => {
    return new Promise((resolve, reject) => {
        // Validate file type
        const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        if (!validTypes.includes(photoFile.type)) {
            reject(new Error('Invalid file type. Please upload a JPEG, PNG, GIF, or WebP image.'));
            return;
        }

        // Validate file size (max 5MB)
        const maxSize = 5 * 1024 * 1024; // 5MB in bytes
        if (photoFile.size > maxSize) {
            reject(new Error('File size too large. Maximum size is 5MB.'));
            return;
        }

        // Convert to Base64
        const reader = new FileReader();
        reader.onload = () => {
            const base64String = reader.result as string;

            // Update user profile with new photo
            const allUsers = getAllUsers();
            const userIndex = allUsers.findIndex(u => u.id === id);

            if (userIndex === -1) {
                reject(new Error('User not found'));
                return;
            }

            allUsers[userIndex].profilePhoto = base64String;
            localStorage.setItem(STORAGE_KEY, JSON.stringify(allUsers));

            setTimeout(() => {
                resolve(base64String);
            }, 800); // Simulate upload delay
        };

        reader.onerror = () => {
            reject(new Error('Failed to read file'));
        };

        reader.readAsDataURL(photoFile);
    });
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
