import React, { useState, type ChangeEvent, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Upload, Type, Tag, FileText, User, Image as ImageIcon } from 'lucide-react';

interface FormData {
  title: string;
  category: string;
  content: string;
  author: string;
  image: File | null;
}

const AddEvent: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    title: '',
    category: '',
    content: '',
    author: '',
    image: null
  });
  const [imagePreview, setImagePreview] = useState<string>('');

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

      // Aperçu de l'image
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Implémenter la soumission du formulaire
    console.log('Nouvel événement:', formData);
    alert('Événement créé avec succès!');
    navigate('/');
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-[#004DA6] to-[#003D85] px-8 py-6">
              <h2 className="text-3xl font-bold text-white">Partager un nouvel événement</h2>
              <p className="text-blue-100 mt-2 text-base">Remplissez les informations ci-dessous pour publier votre événement.</p>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6" encType="multipart/form-data">
              <div className="space-y-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Titre de l'événement
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
                      placeholder="Ex: Conférence sur l'IA"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                    Catégorie
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
                      <option value="">Sélectionnez une catégorie</option>
                      <option value="Innovation technologique">Innovation technologique</option>
                      <option value="Fondement scientifique">Fondement scientifique</option>
                      <option value="Communication événementielle">Communication événementielle</option>
                      <option value="Autre">Autre</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Image de l'événement
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-[#004DA6] transition-colors">
                    <div className="space-y-1 text-center">
                      {imagePreview ? (
                        <div className="relative">
                          <img src={imagePreview} alt="Aperçu" className="mx-auto h-48 object-cover rounded-lg" />
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
                              <span>Télécharger un fichier</span>
                              <input
                                id="image"
                                name="image"
                                type="file"
                                accept="image/*"
                                className="sr-only"
                                onChange={handleImageChange}
                              />
                            </label>
                            <p className="pl-1">ou glisser-déposer</p>
                          </div>
                          <p className="text-xs text-gray-500">
                            PNG, JPG, GIF jusqu'à 10MB
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
                      placeholder="Décrivez votre événement en détail..."
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
                    Votre nom
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
                      placeholder="John Doe"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-5">
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-[#004DA6] to-[#003D85] hover:from-[#003D85] hover:to-[#002c61] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#004DA6] transition-all transform hover:-translate-y-0.5"
                >
                  Publier l'événement
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddEvent;