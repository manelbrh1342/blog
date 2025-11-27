import React, { useState } from 'react';
import ProfileSidebar from '../components/profile/ProfileSidebar';
import ProfileMainContent from '../components/profile/ProfileMainContent';
import StatsHighlights from '../components/profile/StatsHighlights';
import UserContent from '../components/profile/UserContent';
import Settings from '../components/profile/Settings';
import AuthNav from '../components/AuthNavigation';
import ActivityFeed from '../components/profile/ActivityFeed';
import ProfileActivityFeed from '../components/profile/ProfileActivityFeed';

export default function ProfileDetails() {
  const [activeTab, setActiveTab] = useState('profile-details');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [expertiseTags, setExpertiseTags] = useState(['Tech', 'Beauty', 'Design', 'Lifestyle', 'Business']);
  const [profilePicture, setProfilePicture] = useState('');
  const allCategories = ['Tech', 'Beauty', 'Design', 'Lifestyle', 'Business', 'Science', 'Health', 'Sports'];

  const removeTag = (tagToRemove: string) => {
    setExpertiseTags(expertiseTags.filter(tag => tag !== tagToRemove));
  };

  const renderMainContent = () => {
    switch (activeTab) {
      case 'profile-details':
        return (
          <ProfileMainContent
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            bio={bio}
            setBio={setBio}
            profilePicture={profilePicture}
            setProfilePicture={setProfilePicture}
            allCategories={allCategories}
            expertiseTags={expertiseTags}
            setExpertiseTags={setExpertiseTags}
            removeTag={removeTag}
          />
        );
      case 'stats-highlights':
        return <StatsHighlights />;
      case 'user-content':
        return <UserContent />;
      case 'activity-feed':
        return <ProfileActivityFeed />;
      case 'settings':
        return <Settings />;
      default:
        return (
          <ProfileMainContent
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            bio={bio}
            setBio={setBio}
            profilePicture={profilePicture}
            setProfilePicture={setProfilePicture}
            allCategories={allCategories}
            expertiseTags={expertiseTags}
            setExpertiseTags={setExpertiseTags}
            removeTag={removeTag}
          />
        );
    }
  };

  return (
    <>
    <AuthNav />
    <div className="min-h-screen bg-gray-50 flex">
      <ProfileSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      {renderMainContent()}
    </div></>
  );
}
