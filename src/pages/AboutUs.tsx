export default function AboutUs() {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-bold text-[#004aad] font-primary mb-8">About Us</h1>
                <div className="bg-white rounded-2xl shadow-sm p-8 prose prose-lg max-w-none">
                    <p>Welcome to Blogscollaborative, a platform designed for sharing ideas, stories, and knowledge.</p>
                    <p>Our mission is to connect writers and readers from all over the world, fostering a community of creativity and learning.</p>
                    <h3>Our Values</h3>
                    <ul>
                        <li><strong>Integrity:</strong> We believe in authentic and honest content.</li>
                        <li><strong>Diversity:</strong> We welcome voices from all backgrounds and perspectives.</li>
                        <li><strong>Collaboration:</strong> We thrive when we support one another.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
