import { video } from 'framer-motion/client';
import React, { useState } from 'react';

function NewListingPopup({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    contact: '',
    price: '',
    images: [],
    visible: false,
    bhk: '',
    carpetArea: '',
    transactionType: '',
    furnishingStatus: '',
    floor: '',
    facing: '',
    status: '',
    parking: '',
    amenities: [],
    ownership: '',
    age: '',
    landmark: '',
    bedrooms: '',
    bathrooms: '',
    balcony: '',
    video:''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [previewImages, setPreviewImages] = useState([]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'images') {
      const fileArray = Array.from(files);
      setFormData((prevFormData) => ({
        ...prevFormData,
        images: [...prevFormData.images, ...fileArray]
      }));
      setPreviewImages((prevPreview) => [
        ...prevPreview,
        ...fileArray.map((file) => file.name)
      ]);
    } else if (name === 'amenities') {
      setFormData({
        ...formData,
        amenities: value.split(',').map((amenity) => amenity.trim())
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await onSubmit(formData);
    setIsLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4 text-black text-center">Add New Listing</h2>
        <form onSubmit={isLoading ? () => {} : handleSubmit} className="space-y-4">
          {/** Title */}
          <div>
            <label className="block text-sm font-medium text-gray-600">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 border rounded text-gray-600 bg-white"
              required
            />
          </div>

          {/** Description */}
          <div>
            <label className="block text-sm font-medium text-gray-600">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border rounded text-gray-600 bg-white"
              required
            />
          </div>

          {/** Contact */}
          <div>
            <label className="block text-sm font-medium text-gray-600">Contact Details</label>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              className="w-full p-2 border rounded text-gray-600 bg-white"
              required
            />
          </div>

          {/** Price */}
          <div>
            <label className="block text-sm font-medium text-gray-600">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full p-2 border rounded text-gray-600 bg-white"
              required
            />
          </div>

          {/** Remaining Fields */}
          <div className="grid grid-cols-2 gap-4">
            {['bhk', 'carpetArea', 'transactionType', 'furnishingStatus', 'floor', 'facing', 'status', 'parking', 'ownership', 'age', 'landmark', 'bedrooms', 'bathrooms', 'balcony',"video"].map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-600">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                <input
                  type="text"
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="w-full p-2 border rounded text-gray-600 bg-white"
                  required
                />
              </div>
            ))}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-600">Amenities (comma separated)</label>
              <input
                type="text"
                name="amenities"
                value={formData.amenities.join(', ')}
                onChange={handleChange}
                className="w-full p-2 border rounded text-gray-600 bg-white"
                required
              />
            </div>
          </div>

          {/** Images */}
          <div>
            <label className="block text-sm font-medium text-gray-600">Images</label>
            <input
              type="file"
              name="images"
              onChange={handleChange}
              className="w-full p-2 border rounded bg-white text-gray-600"
              accept="image/*"
              multiple
              required
            />
            <div className="mt-2">
              <p className="text-sm font-medium text-gray-600">Selected Files:</p>
              <ul className="list-disc pl-5 text-gray-600">
                {previewImages.map((file, index) => (
                  <li key={index}>{file}</li>
                ))}
              </ul>
            </div>
          </div>

          {/** Actions */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {isLoading ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewListingPopup;
