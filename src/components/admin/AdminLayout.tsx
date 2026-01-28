import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, FileText, MessageSquare, LogOut } from 'lucide-react';

export default function AdminLayout() {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    const menuItems = [
        { path: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
        { path: '/admin/users', icon: Users, label: 'Users' },
        { path: '/admin/articles', icon: FileText, label: 'Articles' },
        { path: '/admin/comments', icon: MessageSquare, label: 'Comments' },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 fixed h-full z-10">
                <div className="h-20 flex items-center px-8 border-b border-gray-100">
                    <div className="w-8 h-8 bg-[#004DA6] rounded-full flex items-center justify-center mr-3">
                        <span className="text-white font-bold text-lg" style={{ fontFamily: "'Cormorant Infant', serif" }}>B</span>
                    </div>
                    <span className="text-xl font-bold text-gray-800" style={{ fontFamily: "'Cormorant Infant', serif" }}>Admin Panel</span>
                </div>

                <nav className="p-4 space-y-1">
                    {menuItems.map((item) => (
                        <button
                            key={item.path}
                            onClick={() => navigate(item.path)}
                            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${isActive(item.path)
                                ? 'bg-[#004DA6]/10 text-[#004DA6]'
                                : 'text-gray-600 hover:bg-gray-50'
                                }`}
                        >
                            <item.icon className="w-5 h-5" />
                            <span className="font-medium" style={{ fontFamily: "'Poppins', sans-serif" }}>{item.label}</span>
                        </button>
                    ))}
                </nav>

                <div className="absolute bottom-0 w-full p-4 border-t border-gray-100">
                    <button
                        onClick={() => navigate('/login')}
                        className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium" style={{ fontFamily: "'Poppins', sans-serif" }}>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64">
                {/* Header */}
                <header className="h-20 bg-white border-b border-gray-200 px-8 flex items-center justify-between sticky top-0 z-10">
                    <h1 className="text-2xl font-bold text-gray-800" style={{ fontFamily: "'Cormorant Infant', serif" }}>
                        {menuItems.find(item => item.path === location.pathname)?.label || 'Dashboard'}
                    </h1>
                    <div className="flex items-center space-x-4">
                        <div className="text-right">
                            <p className="text-sm font-medium text-gray-900">Admin User</p>
                            <p className="text-xs text-gray-500">admin@example.com</p>
                        </div>
                        <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden">
                            <img src="https://ui-avatars.com/api/?name=Admin+User&background=004DA6&color=fff" alt="Admin" />
                        </div>
                    </div>
                </header>

                <div className="p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
