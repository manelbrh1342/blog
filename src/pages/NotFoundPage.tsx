import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import AuthNav from '../components/AuthNavigation';
import Footer from '../components/landing/Footer';

const NotFoundPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <AuthNav />

            <div className="flex-grow flex items-center justify-center px-4 py-20">
                <div className="max-w-md w-full text-center space-y-8">

                    {/* Illustration/Icon */}
                    <div className="relative">
                        <h1 className="text-9xl font-bold text-gray-200 font-sans">404</h1>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-6xl">🤔</span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-3xl font-bold text-gray-900 font-primary">Page Not Found</h2>
                        <p className="text-gray-600 font-secondary text-lg">
                            Oops! The page you are looking for doesn't exist or has been moved.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                        <button
                            onClick={() => navigate(-1)}
                            className="flex items-center justify-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5 mr-2" />
                            Go Back
                        </button>

                        <Link
                            to="/home"
                            className="flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-[#004DA6] hover:bg-[#003D85] shadow-lg hover:shadow-xl transition-all"
                        >
                            <Home className="w-5 h-5 mr-2" />
                            Back to Home
                        </Link>
                    </div>

                </div>
            </div>

            <Footer />
        </div>
    );
};

export default NotFoundPage;
