import React, { useState, useEffect } from 'react';

function UpdateListingPopup({ isOpen, onClose, onSubmit, listingData, id }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    contact: '',
    price: '',
    images: [],
    newImages: [],
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
    video: ''
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (listingData) {
      setFormData((prevData) => ({
        ...prevData,
        ...listingData,
        amenities: listingData.amenities || [],
        visible: listingData.visible || false
      }));
    }
  }, [listingData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    console.log(name, value, files);
    if (name === 'newImages' && files) {
      setFormData((prevData) => ({
        ...prevData,
        newImages: [...prevData.newImages, ...Array.from(files)],
      }));
    } else if (name === 'amenities') {
      setFormData((prevData) => ({
        ...prevData,
        amenities: value.split(',').map((amenity) => amenity.trim()),
      }));
    } 
    else if(name === 'visible') {
      setFormData((prevData) => ({
        ...prevData,
        visible: value === 'true',
      }));
    }
    
    else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleRemoveNewImage = (index) => {
    setFormData((prevData) => {
      const updatedImages = [...prevData.newImages];
      updatedImages.splice(index, 1);
      return { ...prevData, newImages: updatedImages };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const { newImages, ...rest } = formData;
    await onSubmit({ ...rest, newImages }, id);
    setIsLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4 text-black text-center">Update Listing</h2>
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
          {/** Visibility */}
          <div>
            <label className="block text-sm font-medium text-gray-600">Visibility</label>
            <select
              name="visible"
              value={formData.visible}
              onChange={handleChange}
              className="w-full p-2 border rounded text-gray-600 bg-white"
              required
            >
              <option value={true}>Visible</option>
              <option value={false}>Hidden</option>
            </select>
          </div>
          {/** Remaining Fields */}
          <div className="grid grid-cols-2 gap-4">
            {['bhk', 'carpetArea', 'transactionType', 'furnishingStatus', 'floor', 'facing', 'status', 'parking', 'ownership', 'age', 'landmark', 'bedrooms', 'bathrooms', 'balcony','video'].map((field) => (
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

          {/** Existing Images */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Existing Images:</label>
            <div className="flex gap-2 overflow-x-auto mb-2">
              {formData.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Existing image ${index + 1}`}
                  className="w-20 h-20 object-cover rounded-md border"
                />
              ))}
            </div>
          </div>

          {/** Upload New Images */}
          <div>
            <label className="block text-sm font-medium text-gray-600">Upload New Images:</label>
            <input
              type="file"
              name="newImages"
              onChange={handleChange}
              className="w-full p-2 border rounded bg-white text-gray-600"
              multiple
            />
            <div className="flex gap-2 overflow-x-auto mt-2">
              {formData.newImages.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`New image ${index + 1}`}
                    className="w-20 h-20 object-cover rounded-md border"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveNewImage(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full px-2 py-1 text-xs"
                  >
                    ×
                  </button>
                </div>
              ))}
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
              {isLoading ? 'Updating...' : 'Update'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateListingPopup;
