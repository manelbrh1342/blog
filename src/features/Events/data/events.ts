export interface Event {
    id: number;
    title: string;
    content: string;
    author: string;
    authorId: string;
    category: string;
    date: string;
    likes: number;
    favorites: number;
    views: number;
    image?: string;
}

export const events: Event[] = [
    {
        id: 1,
        title: "Skincare & Beauty Routine",
        content: "Discover the best skincare products and routines for glowing, healthy skin. Join our experts for a personalized consultation.",
        author: "Beauty Glow",
        authorId: "user-1",
        category: "Beauty & Wellness",
        date: "DECEMBER 08, 2025",
        likes: 23,
        favorites: 5,
        views: 18,
        image: "event1.jpg"
    },
    {
        id: 2,
        title: "The Future of AI Technology",
        content: "Deep dive into artificial intelligence, neural networks, and how brain-computer interfaces are reshaping our future.",
        author: "Tech Minds",
        authorId: "user-2",
        category: "Technology",
        date: "DECEMBER 12, 2025",
        likes: 45,
        favorites: 12,
        views: 32,
        image: "event2.jpg"
    },
    {
        id: 3,
        title: "Digital Marketing Trends",
        content: "Master the art of social media marketing and analytics. Learn how to boost your online presence effectively.",
        author: "Marketing Pro",
        authorId: "user-3",
        category: "Marketing",
        date: "DECEMBER 15, 2025",
        likes: 67,
        favorites: 23,
        views: 54,
        image: "event3.jpg"
    },
    {
        id: 4,
        title: "Community Meetup: February Edition",
        content: "Join the 'Chop Knuckle' community gathering! celebrate our achievements and connect with fellow members.",
        author: "Community Hub",
        authorId: "user-4",
        category: "Community",
        date: "DECEMBER 18, 2025",
        likes: 34,
        favorites: 8,
        views: 41,
        image: "event4.jpg"
    },
    {
        id: 5,
        title: "Business Analytics Workshop",
        content: "Analyze market trends and financial data like a pro. Perfect for entrepreneurs and business analysts.",
        author: "Biz Success",
        authorId: "user-5",
        category: "Business",
        date: "DECEMBER 22, 2025",
        likes: 89,
        favorites: 45,
        views: 120,
        image: "event5.jpg"
    },
    {
        id: 6,
        title: "Leadership & Management",
        content: "Develop essential leadership skills to inspire teams and drive organizational success.",
        author: "Leader Ship",
        authorId: "user-6",
        category: "Management",
        date: "DECEMBER 25, 2025",
        likes: 56,
        favorites: 15,
        views: 67,
        image: "event6.jpg"
    },
    {
        id: 7,
        title: "Pediatric Health Awareness",
        content: "Essential information on child healthcare, regular checkups, and maintaining a healthy lifestyle for kids.",
        author: "Health First",
        authorId: "user-7",
        category: "Health",
        date: "DECEMBER 28, 2025",
        likes: 42,
        favorites: 18,
        views: 55,
        image: "event7.jpg"
    },
    {
        id: 8,
        title: "Cosmetic Artistry Masterclass",
        content: "Explore the latest makeup trends and products. Learn professional application techniques.",
        author: "Glamour Life",
        authorId: "user-8",
        category: "Beauty",
        date: "JANUARY 10, 2026",
        likes: 120,
        favorites: 60,
        views: 200,
        image: "event8.jpg"
    },
    {
        id: 9,
        title: "City Marathon 2026",
        content: "Join thousands of runners in the annual city marathon. A test of endurance and spirit!",
        author: "Sport City",
        authorId: "user-9",
        category: "Sports",
        date: "JANUARY 15, 2026",
        likes: 78,
        favorites: 30,
        views: 90,
        image: "event9.jpg"
    },
    {
        id: 10,
        title: "International Film Festival",
        content: "A showcase of award-winning films from around the globe. Celebrate the art of cinema.",
        author: "Cinema World",
        authorId: "user-10",
        category: "Cinema",
        date: "JANUARY 20, 2026",
        likes: 150,
        favorites: 80,
        views: 300,
        image: "event10.jpg"
    },
    {
        id: 11,
        title: "Organic Gardening Workshop",
        content: "Learn sustainable farming techniques and how to grow your own organic vegetables at home.",
        author: "Green Thumb",
        authorId: "user-1",
        category: "Gardening",
        date: "FEBRUARY 05, 2026",
        likes: 65,
        favorites: 25,
        views: 80,
        image: "event11.jpg"
    },
    {
        id: 12,
        title: "Wellness & Spa Retreat",
        content: "Relax and rejuvenate with our exclusive wellness treatments and spa therapies.",
        author: "Health Plus",
        authorId: "user-2",
        category: "Wellness",
        date: "FEBRUARY 12, 2026",
        likes: 55,
        favorites: 20,
        views: 70,
        image: "event12.jpg"
    },
    {
        id: 13,
        title: "The Art of Steak Cooking",
        content: "A culinary masterclass focused on selecting and preparing the perfect steak cuts.",
        author: "Chef Master",
        authorId: "user-3",
        category: "Gastronomy",
        date: "FEBRUARY 18, 2026",
        likes: 48,
        favorites: 15,
        views: 60,
        image: "event13.jpg"
    },
    {
        id: 14,
        title: "Creative Fruit Plating",
        content: "Learn the art of fruit carving and presentation to create stunning edible centerpieces.",
        author: "Fresh Fruits",
        authorId: "user-4",
        category: "Culinary Art",
        date: "FEBRUARY 25, 2026",
        likes: 95,
        favorites: 40,
        views: 150,
        image: "event14.jpg"
    }
];
