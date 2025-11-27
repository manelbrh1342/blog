import React, { useState } from 'react';
import {  Bell, Eye,  Shield} from 'lucide-react';

export default function SettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(false);
  const [collaboratorRequests, setCollaboratorRequests] = useState(true);
  const [newFollowers, setNewFollowers] = useState(true);
  const [articleComments, setArticleComments] = useState(true);
  
  const [profileVisibility, setProfileVisibility] = useState('public');
  const [showEmail, setShowEmail] = useState(false);
  const [allowMessages, setAllowMessages] = useState(true);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);

  const ToggleSwitch = ({ checked, onChange }) => (
    <button
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        checked ? 'bg-blue-600' : 'bg-gray-300'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          checked ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );

  return (
    
      <main className="flex-1 p-8">
        <div className="bg-white rounded-2xl shadow-md p-8 max-w-4xl">
          <h1 className="text-3xl font-bold text-blue-600 mb-8">Settings</h1>

          {/* Notifications Section */}
          <div className="mb-10">
            <div className="flex items-center space-x-2 mb-6">
              <Bell className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-900">Notifications</h2>
            </div>
            
            <div className="space-y-5 ml-8">
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div>
                  <p className="font-medium text-gray-900">Email Notifications</p>
                  <p className="text-sm text-gray-500">Receive notifications via email</p>
                </div>
                <ToggleSwitch checked={emailNotifications} onChange={setEmailNotifications} />
              </div>

              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div>
                  <p className="font-medium text-gray-900">Push Notifications</p>
                  <p className="text-sm text-gray-500">Receive push notifications on your device</p>
                </div>
                <ToggleSwitch checked={pushNotifications} onChange={setPushNotifications} />
              </div>

              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div>
                  <p className="font-medium text-gray-900">Weekly Digest</p>
                  <p className="text-sm text-gray-500">Get a weekly summary of your activity</p>
                </div>
                <ToggleSwitch checked={weeklyDigest} onChange={setWeeklyDigest} />
              </div>

              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div>
                  <p className="font-medium text-gray-900">Collaborator Requests</p>
                  <p className="text-sm text-gray-500">Notify when someone requests to collaborate</p>
                </div>
                <ToggleSwitch checked={collaboratorRequests} onChange={setCollaboratorRequests} />
              </div>

              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div>
                  <p className="font-medium text-gray-900">New Followers</p>
                  <p className="text-sm text-gray-500">Notify when someone follows you</p>
                </div>
                <ToggleSwitch checked={newFollowers} onChange={setNewFollowers} />
              </div>

              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="font-medium text-gray-900">Article Comments</p>
                  <p className="text-sm text-gray-500">Notify when someone comments on your articles</p>
                </div>
                <ToggleSwitch checked={articleComments} onChange={setArticleComments} />
              </div>
            </div>
          </div>

          {/* Privacy Section */}
          <div className="mb-10">
            <div className="flex items-center space-x-2 mb-6">
              <Eye className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-900">Privacy</h2>
            </div>
            
            <div className="space-y-5 ml-8">
              <div className="py-3 border-b border-gray-100">
                <p className="font-medium text-gray-900 mb-3">Profile Visibility</p>
                <div className="space-y-2">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="visibility"
                      value="public"
                      checked={profileVisibility === 'public'}
                      onChange={(e) => setProfileVisibility(e.target.value)}
                      className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                    />
                    <div>
                      <p className="text-gray-900">Public</p>
                      <p className="text-sm text-gray-500">Anyone can view your profile</p>
                    </div>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="visibility"
                      value="followers"
                      checked={profileVisibility === 'followers'}
                      onChange={(e) => setProfileVisibility(e.target.value)}
                      className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                    />
                    <div>
                      <p className="text-gray-900">Followers Only</p>
                      <p className="text-sm text-gray-500">Only your followers can view your profile</p>
                    </div>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="visibility"
                      value="private"
                      checked={profileVisibility === 'private'}
                      onChange={(e) => setProfileVisibility(e.target.value)}
                      className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                    />
                    <div>
                      <p className="text-gray-900">Private</p>
                      <p className="text-sm text-gray-500">Only you can view your profile</p>
                    </div>
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div>
                  <p className="font-medium text-gray-900">Show Email Address</p>
                  <p className="text-sm text-gray-500">Display email on your public profile</p>
                </div>
                <ToggleSwitch checked={showEmail} onChange={setShowEmail} />
              </div>

              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="font-medium text-gray-900">Allow Direct Messages</p>
                  <p className="text-sm text-gray-500">Let others send you direct messages</p>
                </div>
                <ToggleSwitch checked={allowMessages} onChange={setAllowMessages} />
              </div>
            </div>
          </div>

          {/* Security Section */}
          <div className="mb-10">
            <div className="flex items-center space-x-2 mb-6">
              <Shield className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-900">Security</h2>
            </div>
            
            <div className="space-y-5 ml-8">
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div>
                  <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                  <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                </div>
                <ToggleSwitch checked={twoFactorAuth} onChange={setTwoFactorAuth} />
              </div>

              <div className="py-3 border-b border-gray-100">
                <button className="text-blue-600 font-medium hover:text-blue-700">
                  Change Password
                </button>
              </div>

              <div className="py-3">
                <button className="text-blue-600 font-medium hover:text-blue-700">
                  View Active Sessions
                </button>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="border-t border-gray-200 pt-8">
            <h2 className="text-xl font-semibold text-red-600 mb-6">Danger Zone</h2>
            <div className="space-y-4 ml-8">
              <button className="px-6 py-2.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium">
                Deactivate Account
              </button>
              <div className="text-sm text-gray-500">
                Temporarily disable your account. You can reactivate it anytime.
              </div>
              
              <button className="px-6 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium mt-4">
                Delete Account
              </button>
              <div className="text-sm text-gray-500">
                Permanently delete your account and all associated data. This action cannot be undone.
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="mt-10 flex justify-end">
            <button className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Save Changes
            </button>
          </div>
        </div>
      </main>
  );
}