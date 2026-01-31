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
    comments?: any[];
}

export const events: Event[] = [
    {
        id: 1,
        title: "Skincare & Beauty Routine Masterclass",
        content: "Discover the best skincare products and routines for glowing, healthy skin. Join our experts for a personalized consultation where we analyze your skin type and recommend the best products.",
        author: "Beauty Glow",
        authorId: "user-1",
        category: "Beauty & Wellness",
        date: "DECEMBER 08, 2025",
        likes: 123,
        favorites: 45,
        views: 800,
        image: "https://images.unsplash.com/photo-1596462502278-27bfdd403348?w=800&auto=format&fit=crop&q=60"
    },
    {
        id: 2,
        title: "The Future of AI Technology Conference",
        content: "Deep dive into artificial intelligence, neural networks, and how brain-computer interfaces are reshaping our future. Featuring keynote speakers from top tech companies.",
        author: "Tech Minds",
        authorId: "user-2",
        category: "Technology",
        date: "DECEMBER 12, 2025",
        likes: 450,
        favorites: 120,
        views: 3200,
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&auto=format&fit=crop&q=60"
    },
    {
        id: 3,
        title: "Digital Marketing Trends Summit",
        content: "Master the art of social media marketing and analytics. Learn how to boost your online presence effectively through organic reach and paid advertising strategies.",
        author: "Marketing Pro",
        authorId: "user-3",
        category: "Marketing",
        date: "DECEMBER 15, 2025",
        likes: 267,
        favorites: 89,
        views: 1540,
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60"
    },
    {
        id: 4,
        title: "Community Meetup: February Edition",
        content: "Join the 'Chop Knuckle' community gathering! celebrate our achievements and connect with fellow members. Food, drinks, and good vibes guaranteed.",
        author: "Community Hub",
        authorId: "user-4",
        category: "Community",
        date: "DECEMBER 18, 2025",
        likes: 134,
        favorites: 28,
        views: 410,
        image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&auto=format&fit=crop&q=60"
    },
    {
        id: 5,
        title: "Business Analytics Workshop",
        content: "Analyze market trends and financial data like a pro. Perfect for entrepreneurs and business analysts looking to level up their data visualization skills.",
        author: "Biz Success",
        authorId: "user-5",
        category: "Business",
        date: "DECEMBER 22, 2025",
        likes: 189,
        favorites: 65,
        views: 1200,
        image: "https://images.unsplash.com/photo-1543286386-713df548e617?w=800&auto=format&fit=crop&q=60"
    },
    {
        id: 6,
        title: "Leadership & Management Bootcamp",
        content: "Develop essential leadership skills to inspire teams and drive organizational success. Interactive sessions on conflict resolution and team building.",
        author: "Leader Ship",
        authorId: "user-6",
        category: "Management",
        date: "DECEMBER 25, 2025",
        likes: 156,
        favorites: 55,
        views: 967,
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&auto=format&fit=crop&q=60"
    },
    {
        id: 7,
        title: "Pediatric Health Awareness Campaign",
        content: "Essential information on child healthcare, regular checkups, and maintaining a healthy lifestyle for kids. Expert pediatricians will answer your questions.",
        author: "Health First",
        authorId: "user-7",
        category: "Health",
        date: "DECEMBER 28, 2025",
        likes: 142,
        favorites: 38,
        views: 855,
        image: "https://images.unsplash.com/photo-1504813184591-01572f98c85f?w=800&auto=format&fit=crop&q=60"
    },
    {
        id: 8,
        title: "Cosmetic Artistry Masterclass",
        content: "Explore the latest makeup trends and products. Learn professional application techniques from celebrity makeup artists.",
        author: "Glamour Life",
        authorId: "user-8",
        category: "Beauty",
        date: "JANUARY 10, 2026",
        likes: 320,
        favorites: 160,
        views: 4200,
        image: "https://images.unsplash.com/photo-1487412947132-2329845674c5?w=800&auto=format&fit=crop&q=60"
    },
    {
        id: 9,
        title: "City Marathon 2026",
        content: "Join thousands of runners in the annual city marathon. A test of endurance and spirit! Registration open for all age groups.",
        author: "Sport City",
        authorId: "user-9",
        category: "Sports",
        date: "JANUARY 15, 2026",
        likes: 478,
        favorites: 130,
        views: 5090,
        image: "https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=800&auto=format&fit=crop&q=60"
    },
    {
        id: 10,
        title: "International Film Festival",
        content: "A showcase of award-winning films from around the globe. Celebrate the art of cinema with screenings, director Q&As, and workshops.",
        author: "Cinema World",
        authorId: "user-10",
        category: "Cinema",
        date: "JANUARY 20, 2026",
        likes: 850,
        favorites: 380,
        views: 10300,
        image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&auto=format&fit=crop&q=60"
    },
    {
        id: 11,
        title: "Organic Gardening Workshop",
        content: "Learn sustainable farming techniques and how to grow your own organic vegetables at home. No large backyard required!",
        author: "Green Thumb",
        authorId: "user-1",
        category: "Gardening",
        date: "FEBRUARY 05, 2026",
        likes: 165,
        favorites: 45,
        views: 780,
        image: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=800&auto=format&fit=crop&q=60"
    },
    {
        id: 12,
        title: "Wellness & Spa Retreat",
        content: "Relax and rejuvenate with our exclusive wellness treatments and spa therapies. A weekend getaway to restore your mind and body.",
        author: "Health Plus",
        authorId: "user-2",
        category: "Wellness",
        date: "FEBRUARY 12, 2026",
        likes: 255,
        favorites: 90,
        views: 1700,
        image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&auto=format&fit=crop&q=60"
    },
    {
        id: 13,
        title: "The Art of Steak Cooking",
        content: "A culinary masterclass focused on selecting and preparing the perfect steak cuts. Tasting session included!",
        author: "Chef Master",
        authorId: "user-3",
        category: "Gastronomy",
        date: "FEBRUARY 18, 2026",
        likes: 148,
        favorites: 45,
        views: 860,
        image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800&auto=format&fit=crop&q=60"
    },
    {
        id: 14,
        title: "Creative Fruit Plating",
        content: "Learn the art of fruit carving and presentation to create stunning edible centerpieces for your next dinner party.",
        author: "Fresh Fruits",
        authorId: "user-4",
        category: "Culinary Art",
        date: "FEBRUARY 25, 2026",
        likes: 195,
        favorites: 80,
        views: 1150,
        image: "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=800&auto=format&fit=crop&q=60"
    }
];
