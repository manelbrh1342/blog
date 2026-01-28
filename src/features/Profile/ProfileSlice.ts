import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { UserProfile, UpdateProfileRequest } from '../../types/user';
import * as profileAPI from '../../api/profileAPI';

interface ProfileState {
    currentUser: UserProfile | null;
    viewedUser: UserProfile | null;
    users: UserProfile[];
    loading: boolean;
    error: string | null;
    uploadingPhoto: boolean;
    updatingProfile: boolean;
}

const initialState: ProfileState = {
    currentUser: null,
    viewedUser: null,
    users: [],
    loading: false,
    error: null,
    uploadingPhoto: false,
    updatingProfile: false
};

// Async thunks
export const fetchCurrentUser = createAsyncThunk(
    'profile/fetchCurrentUser',
    async () => {
        const user = await profileAPI.getCurrentUser();
        return user;
    }
);

export const fetchUserProfile = createAsyncThunk(
    'profile/fetchUserProfile',
    async (userId: string) => {
        const user = await profileAPI.getUserProfile(userId);
        return user;
    }
);

export const updateProfile = createAsyncThunk(
    'profile/updateProfile',
    async ({ userId, data }: { userId: string; data: UpdateProfileRequest }) => {
        const updatedUser = await profileAPI.updateUserProfile(userId, data);
        return updatedUser;
    }
);

export const uploadPhoto = createAsyncThunk(
    'profile/uploadPhoto',
    async ({ userId, photo }: { userId: string; photo: File }) => {
        const photoUrl = await profileAPI.uploadProfilePhoto(userId, photo);
        return { userId, photoUrl };
    }
);

export const fetchAllUsers = createAsyncThunk(
    'profile/fetchAllUsers',
    async () => {
        const users = profileAPI.getAllUsers();
        return users;
    }
);

// Slice
const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        clearViewedUser: (state) => {
            state.viewedUser = null;
        }
    },
    extraReducers: (builder) => {
        // Fetch current user
        builder.addCase(fetchCurrentUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchCurrentUser.fulfilled, (state, action) => {
            state.loading = false;
            state.currentUser = action.payload;
        });
        builder.addCase(fetchCurrentUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to fetch current user';
        });

        // Fetch user profile
        builder.addCase(fetchUserProfile.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.viewedUser = action.payload;
        });
        builder.addCase(fetchUserProfile.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to fetch user profile';
        });

        // Update profile
        builder.addCase(updateProfile.pending, (state) => {
            state.updatingProfile = true;
            state.error = null;
        });
        builder.addCase(updateProfile.fulfilled, (state, action) => {
            state.updatingProfile = false;
            // Update both current user and viewed user if they match
            if (state.currentUser?.id === action.payload.id) {
                state.currentUser = action.payload;
            }
            if (state.viewedUser?.id === action.payload.id) {
                state.viewedUser = action.payload;
            }
        });
        builder.addCase(updateProfile.rejected, (state, action) => {
            state.updatingProfile = false;
            state.error = action.error.message || 'Failed to update profile';
        });

        // Upload photo
        builder.addCase(uploadPhoto.pending, (state) => {
            state.uploadingPhoto = true;
            state.error = null;
        });
        builder.addCase(uploadPhoto.fulfilled, (state, action) => {
            state.uploadingPhoto = false;
            const { userId, photoUrl } = action.payload;

            // Update photo in current user
            if (state.currentUser?.id === userId) {
                state.currentUser.profilePhoto = photoUrl;
            }
            // Update photo in viewed user
            if (state.viewedUser?.id === userId) {
                state.viewedUser.profilePhoto = photoUrl;
            }
        });
        builder.addCase(uploadPhoto.rejected, (state, action) => {
            state.uploadingPhoto = false;
            state.error = action.error.message || 'Failed to upload photo';
        });

        // Fetch all users
        builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
            state.users = action.payload;
        });
    }
});

export const { clearError, clearViewedUser } = profileSlice.actions;
export default profileSlice.reducer;
