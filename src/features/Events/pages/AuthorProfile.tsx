import React, { useState, useEffect, type ChangeEvent, type FormEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Camera, User, Mail, MapPin, Building2, Hash, Globe, ArrowLeft, Check } from 'lucide-react';
import Navbar from '../components/Navbar';
import { fetchUserProfile, updateProfile, uploadPhoto, clearError } from '../../Profile/ProfileSlice';
import type { RootState, AppDispatch } from '../../../store';

const COUNTRIES = [
    'France', 'United States', 'United Kingdom', 'Germany', 'Spain', 'Italy',
    'Canada', 'Australia', 'Japan', 'China', 'India', 'Brazil', 'Mexico',
    'Netherlands', 'Belgium', 'Switzerland', 'Sweden', 'Norway', 'Denmark',
    'Portugal', 'Greece', 'Poland', 'Austria', 'Ireland', 'Bangladesh'
];

const AuthorProfile: React.FC = () => {
    const { authorId } = useParams<{ authorId: string }>();
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const { viewedUser, loading, error, uploadingPhoto, updatingProfile } = useSelector(
        (state: RootState) => state.profile
    );

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'France'
    });

    const [photoPreview, setPhotoPreview] = useState<string>('');
    const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null);
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});
    const [successMessage, setSuccessMessage] = useState<string>('');

    // Load user profile
    useEffect(() => {
        if (authorId) {
            dispatch(fetchUserProfile(authorId));
        }
    }, [authorId, dispatch]);

    // Update form when user data loads
    useEffect(() => {
        if (viewedUser) {
            setFormData({
                fullName: viewedUser.fullName,
                email: viewedUser.email,
                address: viewedUser.address,
                city: viewedUser.city,
                state: viewedUser.state,
                zipCode: viewedUser.zipCode,
                country: viewedUser.country
            });
            setPhotoPreview(viewedUser.profilePhoto || '');
        }
    }, [viewedUser]);

    // Clear success message after 3 seconds
    useEffect(() => {
        if (successMessage) {
            const timer = setTimeout(() => setSuccessMessage(''), 3000);
            return () => clearTimeout(timer);
        }
    }, [successMessage]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error for this field
        if (formErrors[name]) {
            setFormErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedPhoto(file);

            // Create preview
            const reader = new FileReader();
            reader.onload = () => {
                setPhotoPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handlePhotoUpload = async () => {
        if (!selectedPhoto || !authorId) return;

        try {
            await dispatch(uploadPhoto({ userId: authorId, photo: selectedPhoto })).unwrap();
            setSuccessMessage('Photo updated successfully!');
            setSelectedPhoto(null);
        } catch (err) {
            console.error('Photo upload failed:', err);
        }
    };

    const validateForm = (): boolean => {
        const errors: Record<string, string> = {};

        if (!formData.fullName.trim() || formData.fullName.length < 2) {
            errors.fullName = 'Full name must be at least 2 characters';
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim() || !emailRegex.test(formData.email)) {
            errors.email = 'Please enter a valid email address';
        }

        if (!formData.address.trim()) {
            errors.address = 'Address is required';
        }

        if (!formData.city.trim()) {
            errors.city = 'City is required';
        }

        if (!formData.state.trim()) {
            errors.state = 'State/Province is required';
        }

        if (!formData.zipCode.trim()) {
            errors.zipCode = 'Zip code is required';
        }

        if (!formData.country) {
            errors.country = 'Country is required';
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!validateForm() || !authorId) return;

        try {
            await dispatch(updateProfile({ userId: authorId, data: formData })).unwrap();
            setSuccessMessage('Profile updated successfully!');
        } catch (err) {
            console.error('Profile update failed:', err);
        }
    };

    if (loading && !viewedUser) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen flex items-center justify-center bg-gray-50">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4F46E5]"></div>
                </div>
            </>
        );
    }

    if (!viewedUser && !loading) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen flex items-center justify-center bg-gray-50">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">User not found</h2>
                        <button
                            onClick={() => navigate(-1)}
                            className="text-[#4F46E5] hover:underline"
                        >
                            Go back
                        </button>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 mt-16">
                <div className="max-w-3xl mx-auto">
                    {/* Back Button */}
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Back
                    </button>

                    {/* Success Message */}
                    {successMessage && (
                        <div className="mb-6 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg flex items-center">
                            <Check className="w-5 h-5 mr-2" />
                            {successMessage}
                        </div>
                    )}

                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
                            {error}
                        </div>
                    )}

                    {/* Profile Photo Section */}
                    <div className="bg-white rounded-2xl shadow-sm p-8 mb-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-6">
                                <div className="relative">
                                    {photoPreview ? (
                                        <img
                                            src={photoPreview}
                                            alt="Profile"
                                            className="w-24 h-24 rounded-full object-cover border-4 border-gray-100"
                                        />
                                    ) : (
                                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] flex items-center justify-center text-white text-3xl font-bold">
                                            {viewedUser?.fullName.charAt(0).toUpperCase()}
                                        </div>
                                    )}
                                    <label
                                        htmlFor="photo-upload"
                                        className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg cursor-pointer hover:bg-gray-50 transition-colors"
                                    >
                                        <Camera className="w-4 h-4 text-gray-600" />
                                        <input
                                            id="photo-upload"
                                            type="file"
                                            accept="image/*"
                                            onChange={handlePhotoChange}
                                            className="hidden"
                                        />
                                    </label>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">Upload a New Photo</h3>
                                    <p className="text-sm text-gray-500">Profile-pic.jpg</p>
                                </div>
                            </div>
                            <button
                                onClick={handlePhotoUpload}
                                disabled={!selectedPhoto || uploadingPhoto}
                                className="px-6 py-2 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {uploadingPhoto ? 'Uploading...' : 'Update'}
                            </button>
                        </div>
                    </div>

                    {/* User Information Form */}
                    <div className="bg-white rounded-2xl shadow-sm p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-8">Change User Information here</h2>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Full Name and Email */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                                        Full Name*
                                    </label>
                                    <input
                                        type="text"
                                        id="fullName"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-3 border ${formErrors.fullName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent transition-all`}
                                        placeholder="Tonmoy karmaker"
                                    />
                                    {formErrors.fullName && (
                                        <p className="mt-1 text-sm text-red-500">{formErrors.fullName}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                        Email Address*
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-3 border ${formErrors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent transition-all`}
                                        placeholder="tonmoyedesigner@gmail.com"
                                    />
                                    {formErrors.email && (
                                        <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>
                                    )}
                                </div>
                            </div>

                            {/* Address */}
                            <div>
                                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                                    Address*
                                </label>
                                <input
                                    type="text"
                                    id="address"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    className={`w-full px-4 py-3 border ${formErrors.address ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent transition-all`}
                                    placeholder="190 Upor Bazar, Natore Sadar, Natore"
                                />
                                {formErrors.address && (
                                    <p className="mt-1 text-sm text-red-500">{formErrors.address}</p>
                                )}
                            </div>

                            {/* City and State */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                                        City
                                    </label>
                                    <input
                                        type="text"
                                        id="city"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-3 border ${formErrors.city ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent transition-all`}
                                        placeholder="Natore"
                                    />
                                    {formErrors.city && (
                                        <p className="mt-1 text-sm text-red-500">{formErrors.city}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
                                        State/Province
                                    </label>
                                    <input
                                        type="text"
                                        id="state"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-3 border ${formErrors.state ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent transition-all`}
                                        placeholder="Rajshahi"
                                    />
                                    {formErrors.state && (
                                        <p className="mt-1 text-sm text-red-500">{formErrors.state}</p>
                                    )}
                                </div>
                            </div>

                            {/* Zip Code and Country */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-2">
                                        Zip Code
                                    </label>
                                    <input
                                        type="text"
                                        id="zipCode"
                                        name="zipCode"
                                        value={formData.zipCode}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-3 border ${formErrors.zipCode ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent transition-all`}
                                        placeholder="6400"
                                    />
                                    {formErrors.zipCode && (
                                        <p className="mt-1 text-sm text-red-500">{formErrors.zipCode}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
                                        Country
                                    </label>
                                    <select
                                        id="country"
                                        name="country"
                                        value={formData.country}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-3 border ${formErrors.country ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent transition-all appearance-none bg-white`}
                                    >
                                        {COUNTRIES.map(country => (
                                            <option key={country} value={country}>{country}</option>
                                        ))}
                                    </select>
                                    {formErrors.country && (
                                        <p className="mt-1 text-sm text-red-500">{formErrors.country}</p>
                                    )}
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={updatingProfile}
                                className="w-full bg-[#4F46E5] text-white py-4 rounded-lg font-semibold hover:bg-[#4338CA] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#4F46E5]/20"
                            >
                                {updatingProfile ? 'Updating...' : 'Update Information'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AuthorProfile;
