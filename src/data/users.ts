import type { UserProfile } from '../types/user';

export const users: UserProfile[] = [
    {
        id: "user-1",
        fullName: "Tech Vision",
        email: "tech@vision.com",
        address: "123 Tech Street, Innovation District",
        city: "Paris",
        state: "Île-de-France",
        zipCode: "75001",
        country: "France",
        profilePhoto: "",
        bio: "Technology enthusiast and innovation advocate. Passionate about sharing the latest tech trends.",
        eventsCount: 5,
        joinDate: "2024-01-15"
    },
    {
        id: "user-2",
        fullName: "Science Association",
        email: "contact@science-assoc.org",
        address: "456 Research Avenue",
        city: "Lyon",
        state: "Auvergne-Rhône-Alpes",
        zipCode: "69001",
        country: "France",
        profilePhoto: "",
        bio: "Dedicated to promoting scientific research and education.",
        eventsCount: 3,
        joinDate: "2024-02-01"
    },
    {
        id: "user-3",
        fullName: "Com Agency",
        email: "hello@comagency.com",
        address: "789 Marketing Boulevard",
        city: "Marseille",
        state: "Provence-Alpes-Côte d'Azur",
        zipCode: "13001",
        country: "France",
        profilePhoto: "",
        bio: "Creative communication agency specializing in event management.",
        eventsCount: 4,
        joinDate: "2024-01-20"
    },
    {
        id: "user-4",
        fullName: "Nature Aventure",
        email: "info@nature-aventure.fr",
        address: "321 Mountain Road",
        city: "Grenoble",
        state: "Auvergne-Rhône-Alpes",
        zipCode: "38000",
        country: "France",
        profilePhoto: "",
        bio: "Outdoor adventure specialists bringing you closer to nature.",
        eventsCount: 2,
        joinDate: "2024-03-10"
    },
    {
        id: "user-5",
        fullName: "Mode & Style",
        email: "contact@modestyle.fr",
        address: "555 Fashion Avenue",
        city: "Paris",
        state: "Île-de-France",
        zipCode: "75008",
        country: "France",
        profilePhoto: "",
        bio: "Fashion forward, style conscious. Bringing you the latest trends.",
        eventsCount: 6,
        joinDate: "2024-01-05"
    },
    {
        id: "user-6",
        fullName: "Business Insider",
        email: "editor@businessinsider.fr",
        address: "888 Corporate Plaza",
        city: "Paris",
        state: "Île-de-France",
        zipCode: "75002",
        country: "France",
        profilePhoto: "",
        bio: "Business news and startup ecosystem coverage.",
        eventsCount: 7,
        joinDate: "2023-12-01"
    },
    {
        id: "user-7",
        fullName: "Zen Life",
        email: "contact@zenlife.com",
        address: "111 Wellness Street",
        city: "Nice",
        state: "Provence-Alpes-Côte d'Azur",
        zipCode: "06000",
        country: "France",
        profilePhoto: "",
        bio: "Promoting wellness, mindfulness, and healthy living.",
        eventsCount: 3,
        joinDate: "2024-02-15"
    },
    {
        id: "user-8",
        fullName: "Music Live",
        email: "booking@musiclive.com",
        address: "222 Concert Hall Lane",
        city: "Toulouse",
        state: "Occitanie",
        zipCode: "31000",
        country: "France",
        profilePhoto: "",
        bio: "Live music events and concert organization.",
        eventsCount: 8,
        joinDate: "2023-11-20"
    },
    {
        id: "user-9",
        fullName: "Musée d'Histoire",
        email: "info@museehistoire.fr",
        address: "333 Heritage Road",
        city: "Bordeaux",
        state: "Nouvelle-Aquitaine",
        zipCode: "33000",
        country: "France",
        profilePhoto: "",
        bio: "Preserving and sharing historical knowledge through exhibitions.",
        eventsCount: 2,
        joinDate: "2024-01-30"
    },
    {
        id: "user-10",
        fullName: "Sport City",
        email: "events@sportcity.fr",
        address: "444 Stadium Drive",
        city: "Lyon",
        state: "Auvergne-Rhône-Alpes",
        zipCode: "69002",
        country: "France",
        profilePhoto: "",
        bio: "Organizing sports events and promoting active lifestyles.",
        eventsCount: 5,
        joinDate: "2023-10-15"
    }
];

// Helper function to get user by ID
export const getUserById = (id: string): UserProfile | undefined => {
    return users.find(user => user.id === id);
};

// Helper function to get user by name (for backward compatibility with events)
export const getUserByName = (name: string): UserProfile | undefined => {
    return users.find(user => user.fullName === name);
};
