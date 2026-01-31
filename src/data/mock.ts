
export interface Category {
    id: number;
    name: string;
    slug: string;
    description?: string;
    parent_id?: number;
    created_at: string;
    updated_at: string;
}

export const mockCategories: Category[] = [
    { id: 1, name: "Technology", slug: "technology", description: "All things tech", created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: 2, name: "Lifestyle", slug: "lifestyle", description: "Daily life and tips", created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: 3, name: "Programming", slug: "programming", description: "Coding tutorials and news", created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: 4, name: "Travel", slug: "travel", description: "Explore the world", created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: 5, name: "Food", slug: "food", description: "Delicious recipes", created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: 6, name: "Health", slug: "health", description: "Stay fit and healthy", created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: 7, name: "Business", slug: "business", description: "Market trends", created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: 8, name: "Art", slug: "art", description: "Creative expressions", created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: 9, name: "Science", slug: "science", description: "Discover the unknown", created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: 10, name: "Sports", slug: "sports", description: "Games and fitness", created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
];

export interface Article {
    id: number;
    title: string;
    content: string;
    category: string;
    image?: string;
    date: string;
    user_id?: number;
    author_name?: string;
    author_avatar?: string;
}

export const mockArticles: Article[] = [
    {
        id: 1,
        title: "Getting Started with React 19",
        content: "React 19 brings exciting new features including the new compiler, actions, and enhanced server components support. Learn how to upgrade and leverage these powerful tools for your next web application.",
        category: "Technology",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60",
        date: new Date().toISOString(),
        user_id: 1,
        author_name: "Tech Vision",
        author_avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=TechVision",
    },
    {
        id: 2,
        title: "The Future of Web Development",
        content: "Web development is evolving rapidly. From AI-generated code to WebAssembly, the landscape is shifting. Discover the key trends that will define the next decade of the internet.",
        category: "Programming",
        image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&auto=format&fit=crop&q=60",
        date: new Date().toISOString(),
        user_id: 1,
        author_name: "Tech Vision",
        author_avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=TechVision",
    },
    {
        id: 3,
        title: "10 Tips for a Balanced Life",
        content: "Maintaining work-life balance is crucial in today's fast-paced world. Here are 10 actionable tips to help you stay grounded, reduce stress, and find joy in everyday moments.",
        category: "Lifestyle",
        image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop&q=60",
        date: new Date().toISOString(),
        user_id: 7,
        author_name: "Zen Life",
        author_avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Zen",
    },
    {
        id: 4,
        title: "Exploring the Alps: A Hiker's Guide",
        content: "The Alps offer some of the most breathtaking hiking trails in the world. Join us as we explore hidden gems, preparation tips, and the best seasons for an unforgettable adventure.",
        category: "Travel",
        image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop&q=60",
        date: new Date(Date.now() - 86400000).toISOString(),
        user_id: 4,
        author_name: "Nature Aventure",
        author_avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Nature",
    },
    {
        id: 5,
        title: "Mastering French Cuisine Basics",
        content: "French cuisine is renowned for its elegance and flavor. We break down the 5 mother sauces and essential techniques that every home cook should know.",
        category: "Food",
        image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&auto=format&fit=crop&q=60",
        date: new Date(Date.now() - 172800000).toISOString(),
        user_id: 13,
        author_name: "Foodie Heaven",
        author_avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Foodie",
    },
    {
        id: 6,
        title: "The Rise of Sustainable Fashion",
        content: "Fast fashion is out, and sustainability is in. Learn how brands are adopting eco-friendly materials and ethical labor practices to change the industry.",
        category: "Lifestyle",
        image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&auto=format&fit=crop&q=60",
        date: new Date(Date.now() - 259200000).toISOString(),
        user_id: 5,
        author_name: "Mode & Style",
        author_avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Style",
    },
    {
        id: 7,
        title: "Understanding Quantum Computing",
        content: "Quantum computing promises to solve problems beyond the reach of classical computers. Here is a beginner-friendly explanation of qubits, superposition, and entanglement.",
        category: "Science",
        image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&auto=format&fit=crop&q=60",
        date: new Date(Date.now() - 345600000).toISOString(),
        user_id: 2,
        author_name: "Science Association",
        author_avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Science",
    },
    {
        id: 8,
        title: "Top 5 Marketing Strategies for 2026",
        content: "Marketing is changing. From hyper-personalization to immersive experiences, discover the top strategies that businesses need to adopt to stay competitive.",
        category: "Business",
        image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&auto=format&fit=crop&q=60",
        date: new Date(Date.now() - 432000000).toISOString(),
        user_id: 3,
        author_name: "Com Agency",
        author_avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Agency",
    },
    {
        id: 9,
        title: "Minimalist Living: Less is More",
        content: "Clutter can weigh you down. Explore the benefits of minimalism and how simplifying your environment can lead to greater mental clarity and freedom.",
        category: "Lifestyle",
        image: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?w=800&auto=format&fit=crop&q=60",
        date: new Date(Date.now() - 518400000).toISOString(),
        user_id: 7,
        author_name: "Zen Life",
        author_avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Zen",
    },
    {
        id: 10,
        title: "Marathon Training for Beginners",
        content: "Thinking about running your first marathon? We have prepared a comprehensive 16-week training plan to get you from the couch to the finish line.",
        category: "Sports",
        image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800&auto=format&fit=crop&q=60",
        date: new Date(Date.now() - 604800000).toISOString(),
        user_id: 10,
        author_name: "Sport City",
        author_avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sport",
    },
    {
        id: 11,
        title: "The Golden Age of Television",
        content: "With streaming services producing movie-quality series, we are living in a new golden age of TV. We review the top shows that define this era.",
        category: "Art",
        image: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=800&auto=format&fit=crop&q=60",
        date: new Date(Date.now() - 691200000).toISOString(),
        user_id: 16,
        author_name: "Cinema Paradiso",
        author_avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Cinema",
    },
    {
        id: 12,
        title: "DIY Home Office Makeover",
        content: "Transform your workspace on a budget. These DIY tips will help you create a productive and stylish home office without breaking the bank.",
        category: "Lifestyle",
        image: "https://images.unsplash.com/photo-1486946255434-2466348c2166?w=800&auto=format&fit=crop&q=60",
        date: new Date(Date.now() - 777600000).toISOString(),
        user_id: 20,
        author_name: "DIY Expert",
        author_avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=DIY",
    },
    {
        id: 13,
        title: "The Psychology of Color in Art",
        content: "How does color affect emotion? We explore color theory in art history and how famous painters used it to convey mood and meaning.",
        category: "Art",
        image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&auto=format&fit=crop&q=60",
        date: new Date(Date.now() - 864000000).toISOString(),
        user_id: 14,
        author_name: "Art Gallery",
        author_avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Art",
    },
    {
        id: 14,
        title: "Investing 101: Stocks vs. Bonds",
        content: "Confused by the stock market? detecting the difference between stocks and bonds is the first step to building a solid investment portfolio.",
        category: "Business",
        image: "https://images.unsplash.com/photo-1611974765270-ca12586343bb?w=800&auto=format&fit=crop&q=60",
        date: new Date(Date.now() - 950400000).toISOString(),
        user_id: 6,
        author_name: "Business Insider",
        author_avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Business",
    },
    {
        id: 15,
        title: "Hidden Gems of Kyoto",
        content: "Kyoto is famous for its temples, but there is so much more to see. Discover the quiet alleys, local cafes, and secret gardens of Japan's ancient capital.",
        category: "Travel",
        image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&auto=format&fit=crop&q=60",
        date: new Date(Date.now() - 1036800000).toISOString(),
        user_id: 12,
        author_name: "Travel Bug",
        author_avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Travel",
    }
];

export interface Comment {
    id: number;
    post_id: number;
    body: string;
    username: string;
    created_at: string;
}

export const mockComments: Comment[] = [
    { id: 1, post_id: 1, body: "Great article! React 19 looks amazing.", username: "CodeMaster", created_at: new Date().toISOString() },
    { id: 2, post_id: 1, body: "Can't wait to try the new compiler.", username: "DevJane", created_at: new Date().toISOString() },
    { id: 3, post_id: 2, body: "AI is definitely changing the game.", username: "TechGuru", created_at: new Date().toISOString() },
    { id: 4, post_id: 3, body: "Thanks for the tips, I needed this.", username: "StressedDev", created_at: new Date().toISOString() },
    { id: 5, post_id: 3, body: "Walking in nature really helps me.", username: "NatureLover", created_at: new Date().toISOString() },
    { id: 6, post_id: 4, body: "The Alps are on my bucket list!", username: "Wanderlust", created_at: new Date().toISOString() },
    { id: 7, post_id: 5, body: "Finally I understand hollandaise sauce.", username: "ChefWannabe", created_at: new Date().toISOString() },
    { id: 8, post_id: 6, body: "Thrifting is also a great way to be sustainable.", username: "EcoFriendly", created_at: new Date().toISOString() },
    { id: 9, post_id: 1, body: "Does this break backward compatibility?", username: "LegacyCode", created_at: new Date().toISOString() },
    { id: 10, post_id: 7, body: "My brain hurts but this is fascinating.", username: "CuriousMind", created_at: new Date().toISOString() },
    { id: 11, post_id: 8, body: "Data privacy is also huge for 2026.", username: "PrivacyFirst", created_at: new Date().toISOString() },
    { id: 12, post_id: 10, body: "Just signed up for my first 5k, baby steps!", username: "NewRunner", created_at: new Date().toISOString() },
    { id: 13, post_id: 15, body: "Kyoto is magical in autumn.", username: "JapanFan", created_at: new Date().toISOString() },
];
