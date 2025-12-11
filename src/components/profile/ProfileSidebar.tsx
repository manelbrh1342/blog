import React from 'react';
import { User, BarChart3, FileText, Activity, Settings } from 'lucide-react';

interface ProfileSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function ProfileSidebar({ activeTab, setActiveTab }: ProfileSidebarProps) {
  const tabs = [
    { id: 'profile-details', label: 'Profile Details', icon: User },
    { id: 'stats-highlights', label: 'Stats & Highlights', icon: BarChart3 },
    { id: 'user-content', label: "User's Content", icon: FileText },
    { id: 'activity-feed', label: 'Activity Feed', icon: Activity },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-full md:w-64 bg-gradient-to-br from-[#004DA6] to-[#003D85] rounded-3xl m-4 md:m-6 p-4 md:p-6 shadow-xl">
      <nav className="flex flex-row md:flex-col space-x-2 md:space-x-0 md:space-y-2 overflow-x-auto pb-0 hide-scrollbar">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-shrink-0 flex items-center space-x-2 px-4 py-2 md:py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeTab === tab.id
                ? 'bg-blue-700 text-white'
                : 'text-white hover:bg-blue-700'
                }`}
            >
              <Icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
