import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import AuthNav from '../../../components/AuthNavigation';
import Footer from '../../../components/landing/Footer';

const EventsLayout: React.FC = () => {
    const location = useLocation();

    // Helper to determine if a sub-nav link is active
    const isActive = (path: string) => location.pathname === path;

    return (
        <div className="min-h-screen bg-[#F2F4F8] font-sans">
            {/* Main Application Navbar */}
            <AuthNav />

            {/* Content Container */}
            <div className="w-full px-4 sm:px-6 lg:px-8 pt-24 pb-12">

                {/* Events Sub-Navbar - Styled as a filter bar */}
                <div className="w-full mb-8 border-b border-gray-200 pb-4">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <h2 className="text-3xl font-bold text-gray-800">Events</h2>

                        <div className="flex space-x-2">
                            <Link
                                to="/events"
                                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${isActive('/events')
                                    ? 'bg-[#004DA6] text-white shadow-md'
                                    : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                            >
                                All Events
                            </Link>
                            <Link
                                to="/calendar"
                                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${isActive('/calendar')
                                    ? 'bg-[#004DA6] text-white shadow-md'
                                    : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                            >
                                Calendar
                            </Link>
                            <Link
                                to="/add-event"
                                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${isActive('/add-event')
                                    ? 'bg-[#004DA6] text-white shadow-md'
                                    : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                            >
                                Add Event
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <main className="w-full">
                    <Outlet />
                </main>
            </div>

            {/* Global Footer */}
            <Footer />
        </div>
    );
};

export default EventsLayout;
