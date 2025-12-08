export interface UserProfile {
    id: string;
    fullName: string;
    email: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    profilePhoto?: string; // Base64 or URL
    bio?: string;
    eventsCount?: number;
    joinDate?: string;
}

export interface UpdateProfileRequest {
    fullName?: string;
    email?: string;
    address?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
    bio?: string;
}
