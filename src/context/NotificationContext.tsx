import { createContext, useState, useContext, type ReactNode, useCallback } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

export type NotificationType = 'success' | 'error' | 'info';

interface Notification {
    id: string;
    message: string;
    type: NotificationType;
}

interface NotificationContextType {
    showNotification: (message: string, type: NotificationType) => void;
    notifications: Notification[];
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotification must be used within a NotificationProvider');
    }
    return context;
};

// Toast Component
const Toast = ({ notification, onClose }: { notification: Notification; onClose: (id: string) => void }) => {
    const bgColor =
        notification.type === 'success' ? 'bg-green-500' :
            notification.type === 'error' ? 'bg-red-500' : 'bg-blue-500';

    const Icon =
        notification.type === 'success' ? CheckCircle :
            notification.type === 'error' ? AlertCircle : Info;

    return (
        <div className={`${bgColor} text-white px-6 py-4 rounded-lg shadow-lg mb-3 flex items-center min-w-[300px] animate-fade-in-down transition-all duration-300`}>
            <Icon className="w-5 h-5 mr-3" />
            <span className="flex-grow font-medium">{notification.message}</span>
            <button onClick={() => onClose(notification.id)} className="ml-4 hover:opacity-75">
                <X className="w-4 h-4" />
            </button>
        </div>
    );
};

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    const showNotification = useCallback((message: string, type: NotificationType) => {
        const id = Date.now().toString();
        setNotifications((prev) => [...prev, { id, message, type }]);

        // Auto dismiss after 3 seconds
        setTimeout(() => {
            setNotifications((prev) => prev.filter((n) => n.id !== id));
        }, 3000);
    }, []);

    const removeNotification = (id: string) => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
    };

    return (
        <NotificationContext.Provider value={{ showNotification, notifications }}>
            {children}
            {/* Toast Container - Top Center */}
            <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 flex flex-col items-center">
                {notifications.map((notification) => (
                    <Toast key={notification.id} notification={notification} onClose={removeNotification} />
                ))}
            </div>
        </NotificationContext.Provider>
    );
};
