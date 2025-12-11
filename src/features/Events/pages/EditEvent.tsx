import React, { useState, useEffect, type ChangeEvent, type FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AuthNav from '../../../components/AuthNavigation';
import { Upload, Type, Tag, FileText, User, Image as ImageIcon, ArrowLeft } from 'lucide-react';

interface FormData {
  title: string;
  category: string;
  content: string;
  author: string;
  image: File | null;
}

const EditEvent: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState<boolean>(true);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    category: '',
    content: '',
    author: '',
    image: null
  });
  const [imagePreview, setImagePreview] = useState<string>('');

  useEffect(() => {
    // Simulate loading event data
    const fetchEvent = () => {
      // Mock data
      const mockEvent = {
        id: 1,
        title: "Technological Innovation Conference",
        category: "Technological Innovation",
        content: "Discover the latest technological innovations at this exceptional conference bringing together the greatest experts in the field.",
        author: "Tech Vision",
        image: "event1.jpg"
      };

      setFormData({
        title: mockEvent.title,
        category: mockEvent.category,
        content: mockEvent.content,
        author: mockEvent.author,
        image: null
      });
      setImagePreview(mockEvent.image); // In a real case, this would be a URL
      setLoading(false);
    };

    setTimeout(fetchEvent, 500);
  }, [id]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file
      }));

      // Image preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Implement event update
    console.log('Event updated:', formData);
    alert('Event successfully modified!');
    navigate('/event');
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#004DA6]"></div>
    </div>
  );

  return (
    <>
      <AuthNav />
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-6">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-gray-600 hover:text-[#004DA6] transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-[#004DA6] to-[#003D85] px-8 py-6">
              <h2 className="text-3xl font-bold text-white">Edit Event</h2>
              <p className="text-blue-100 mt-2 text-base">Update your event information.</p>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6" encType="multipart/form-data">
              <div className="space-y-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Event Title
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Type className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                      className="focus:ring-[#004DA6] focus:border-[#004DA6] block w-full pl-10 sm:text-sm border-gray-300 rounded-lg py-3 text-gray-900"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Tag className="h-5 w-5 text-gray-400" />
                    </div>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                      className="focus:ring-[#004DA6] focus:border-[#004DA6] block w-full pl-10 sm:text-sm border-gray-300 rounded-lg py-3 text-gray-900"
                    >
                      <option value="">Select a category</option>
                      <option value="Technological Innovation">Technological Innovation</option>
                      <option value="Scientific Foundation">Scientific Foundation</option>
                      <option value="Event Communication">Event Communication</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Event Image
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-[#004DA6] transition-colors">
                    <div className="space-y-1 text-center">
                      {imagePreview ? (
                        <div className="relative">
                          <img src={imagePreview} alt="Preview" className="mx-auto h-48 object-cover rounded-lg" />
                          <button
                            type="button"
                            onClick={() => {
                              setImagePreview('');
                              setFormData(prev => ({ ...prev, image: null }));
                            }}
                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                          >
                            <Upload className="h-4 w-4" />
                          </button>
                        </div>
                      ) : (
                        <>
                          <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                          <div className="flex text-sm text-gray-600 justify-center">
                            <label htmlFor="image" className="relative cursor-pointer bg-white rounded-md font-medium text-[#004DA6] hover:text-[#003D85] focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[#004DA6]">
                              <span>Upload a file</span>
                              <input
                                id="image"
                                name="image"
                                type="file"
                                accept="image/*"
                                className="sr-only"
                                onChange={handleImageChange}
                              />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500">
                            PNG, JPG, GIF up to 10MB
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute top-3 left-3 pointer-events-none">
                      <FileText className="h-5 w-5 text-gray-400" />
                    </div>
                    <textarea
                      id="content"
                      name="content"
                      rows={6}
                      value={formData.content}
                      onChange={handleInputChange}
                      required
                      className="focus:ring-[#004DA6] focus:border-[#004DA6] block w-full pl-10 sm:text-sm border-gray-300 rounded-lg py-3 text-gray-900"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="author"
                      name="author"
                      value={formData.author}
                      onChange={handleInputChange}
                      required
                      className="focus:ring-[#004DA6] focus:border-[#004DA6] block w-full pl-10 sm:text-sm border-gray-300 rounded-lg py-3 text-gray-900"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-5 flex gap-4">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="flex-1 py-3 px-4 border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#004DA6] transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-[#004DA6] to-[#003D85] hover:from-[#003D85] hover:to-[#002c61] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#004DA6] transition-all transform hover:-translate-y-0.5"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditEvent;