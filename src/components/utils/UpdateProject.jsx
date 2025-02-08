import React, { useState, useEffect } from 'react';

function UpdateProjectPopup({ isOpen, onClose, onSubmit, projectData, id }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    status: '',
    brochure: null,
    image: null,
    price: '',
    visible: false,
    bhk: '',
    carpetArea: '',
    transactionType: '',
    furnishingStatus: '',
    floor: '',
    facing: '',
    parking: '',
    amenities: '',
    ownership: '',
    age: '',
    landmark: '',
    bedrooms: '',
    bathrooms: '',
    balcony: '',
    video:""
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (projectData) {
      setFormData({
        ...projectData,
        amenities: projectData.amenities ? projectData.amenities.join(', ') : '',
      });
    }
  }, [projectData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      const file = files[0];
      if (file.size > 5 * 1024 * 1024) {
        alert('File size should not exceed 5MB.');
        return;
      }
      setFormData({
        ...formData,
        [name]: file,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const updatedData = {
      ...formData,
      amenities: formData.amenities.split(',').map((item) => item.trim()),
    };

    await onSubmit(updatedData, id);
    setIsLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-[90%] max-w-4xl max-h-[600px] overflow-y-scroll"  >
        <h2 className="text-xl font-bold mb-4 text-black">Update Project</h2>
        <form onSubmit={isLoading ? () => {} : handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-black">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-2 border rounded bg-white text-gray-600"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-2 border rounded bg-white text-gray-600"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black">Price</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full p-2 border rounded bg-white text-gray-600"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black">BHK</label>
              <input
                type="text"
                name="bhk"
                value={formData.bhk}
                onChange={handleChange}
                className="w-full p-2 border rounded bg-white text-gray-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black">Carpet Area</label>
              <input
                type="text"
                name="carpetArea"
                value={formData.carpetArea}
                onChange={handleChange}
                className="w-full p-2 border rounded bg-white text-gray-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black">Transaction Type</label>
              <select
                name="transactionType"
                value={formData.transactionType}
                onChange={handleChange}
                className="w-full p-2 border rounded bg-white text-gray-600"
              >
                <option value="Rent">Rent</option>
                <option value="Sale">Sale</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-black">Furnishing Status</label>
              <select
                name="furnishingStatus"
                value={formData.furnishingStatus}
                onChange={handleChange}
                className="w-full p-2 border rounded bg-white text-gray-600"
              >
                <option value="Unfurnished">Unfurnished</option>
                <option value="Semi-Furnished">Semi-Furnished</option>
                <option value="Furnished">Furnished</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-black">Floor</label>
              <input
                type="number"
                name="floor"
                value={formData.floor}
                onChange={handleChange}
                className="w-full p-2 border rounded bg-white text-gray-600"
              />
            </div>
            <div>
              {/* facing */}
              <label className="block text-sm font-medium text-black">Facing</label>
              <input
                type="text"
                name="facing"
                value={formData.facing}
                onChange={handleChange}
                className="w-full p-2 border rounded bg-white text-gray-600" /> 
            </div>
            {/* Parking */}
            <div>
              <label className="block text-sm font-medium text-black">Parking</label>
              <input
                type="text"
                name="parking"
                value={formData.parking}
                onChange={handleChange}
                className="w-full p-2 border rounded bg-white text-gray-600"/>
                </div>
                <div>
              <label className="block text-sm font-medium text-black">Video</label>
              <input
                type="text"
                name="video"
                value={formData.video}
                onChange={handleChange}
                className="w-full p-2 border rounded bg-white text-gray-600"/>
                </div>
                
            <div>
              <label className="block text-sm font-medium text-black">Amenities</label>
              <input
                type="text"
                name="amenities"
                value={formData.amenities}
                onChange={handleChange}
                className="w-full p-2 border rounded bg-white text-gray-600"
                placeholder="Comma-separated list"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black">Landmark</label>
              <input
                type="text"
                name="landmark"
                value={formData.landmark}
                onChange={handleChange}
                className="w-full p-2 border rounded bg-white text-gray-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Bedrooms</label>
              <input
                type="text"
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handleChange}
                className="w-full p-2 border rounded text-gray-600 bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Bathrooms</label>
              <input
                type="text"
                name="bathrooms"
                value={formData.bathrooms}
                onChange={handleChange}
                className="w-full p-2 border rounded text-gray-600 bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Balcony</label>
              <input
                type="text"
                name="balcony"
                value={formData.balcony}
                onChange={handleChange}
                className="w-full p-2 border rounded text-gray-600 bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full p-2 border rounded bg-white text-gray-600"
              >
                <option value="active">Active</option>
                <option value="closed">Closed</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-black">Ownership</label>
              <input
                type="text"
                name="ownership"
                value={formData.ownership}
                onChange={handleChange}
                className="w-full p-2 border rounded bg-white text-gray-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black">Brochure</label>
              <input
                type="file"
                name="brochure"
                onChange={handleChange}
                className="w-full p-2 border rounded bg-white text-gray-600"
                accept=".pdf"
              />
              {projectData.brochure && (
                <p className="text-sm text-blue-500 mt-1">
                  <a href={projectData.brochure} target="_blank" rel="noopener noreferrer">
                    View existing brochure
                  </a>
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-black">Image</label>
              <input
                type="file"
                name="image"
                onChange={handleChange}
                className="w-full p-2 border rounded bg-white text-gray-600"
              />
              {projectData.image && (
                <p className="text-sm text-blue-500 mt-1">
                  <a href={projectData.image} target="_blank" rel="noopener noreferrer">
                    View existing image
                  </a>
                </p>
              )}
            </div>
          </div>
          <div className="flex justify-end mt-4 gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-red-300"
            >
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
              {isLoading ? 'Updating...' : 'Update'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateProjectPopup;
