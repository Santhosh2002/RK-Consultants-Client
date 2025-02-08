import React, { useState } from 'react';

function NewProjectPopup({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    title: '',
    brochure: null,
    image: null,
    description: '',
    startDate: '',
    status: 'active',
    price: '',
    visible: false,
    bhk: '',
    carpetArea: '',
    transactionType: 'Rent',
    furnishingStatus: 'Unfurnished',
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

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      const file = files[0];
      if (file.size > 5 * 1024 * 1024) {
        alert('File size should not exceed 5MB.');
        return;
      }
      setFormData((prevState) => ({ ...prevState, [name]: file }));
    } else {
      setFormData((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const processedData = {
      ...formData,
      startDate: new Date().toISOString(),
      amenities: formData.amenities.split(',').map((amenity) => amenity.trim()),
    };

    console.log('Submitted Data:', processedData);
    await onSubmit(processedData);
    setIsLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-11/12 max-w-3xl max-h-[600px] overflow-y-scroll ">
        <h2 className="text-xl font-bold mb-4 text-black">Add New Project</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
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
            <div>
              <label className="block text-sm font-medium text-gray-600">BHK</label>
              <input
                type="text"
                name="bhk"
                value={formData.bhk}
                onChange={handleChange}
                className="w-full p-2 border rounded text-gray-600 bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Carpet Area</label>
              <input
                type="text"
                name="carpetArea"
                value={formData.carpetArea}
                onChange={handleChange}
                className="w-full p-2 border rounded text-gray-600 bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Transaction Type</label>
              <select
                name="transactionType"
                value={formData.transactionType}
                onChange={handleChange}
                className="w-full p-2 border rounded bg-white text-gray-600"
              >
                <option value="Rent">Rent</option>
                <option value="Sale">Sale</option>
                <option value="Lease">Lease</option>
                
              </select>
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
              <label className="block text-sm font-medium text-gray-600">Furnishing Status</label>
              <select
                name="furnishingStatus"
                value={formData.furnishingStatus}
                onChange={handleChange}
                className="w-full p-2 border rounded bg-white text-gray-600"
              >
                <option value="Unfurnished">Unfurnished</option>
                <option value="Furnished">Furnished</option>
                <option value="Semi-Furnished">Semi-Furnished</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Floor</label>
              <input
                type="text"
                name="floor"
                value={formData.floor}
                onChange={handleChange}
                className="w-full p-2 border rounded text-gray-600 bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Facing</label>
              <input
                type="text"
                name="facing"
                value={formData.facing}
                onChange={handleChange}
                className="w-full p-2 border rounded text-gray-600 bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Parking</label>
              <input
                type="text"
                name="parking"
                value={formData.parking}
                onChange={handleChange}
                className="w-full p-2 border rounded text-gray-600 bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Video</label>
              <input
                type="text"
                name="video"
                value={formData.video}
                onChange={handleChange}
                className="w-full p-2 border rounded text-gray-600 bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Ownership</label>
              <input
                type="text"
                name="ownership"
                value={formData.ownership}
                onChange={handleChange}
                className="w-full p-2 border rounded text-gray-600 bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Age</label>
              <input
                type="text"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="w-full p-2 border rounded text-gray-600 bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Landmark</label>
              <input
                type="text"
                name="landmark"
                value={formData.landmark}
                onChange={handleChange}
                className="w-full p-2 border rounded text-gray-600 bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Amenities</label>
              <input
                type="text"
                name="amenities"
                value={formData.amenities}
                onChange={handleChange}
                className="w-full p-2 border rounded text-gray-600 bg-white"
                placeholder="Enter amenities separated by commas"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Brochure (PDF only)</label>
              <input
                type="file"
                name="brochure"
                onChange={handleChange}
                className="w-full p-2 border rounded bg-white text-gray-600"
                accept=".pdf"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Image</label>
              <input
                type="file"
                name="image"
                onChange={handleChange}
                className="w-full p-2 border rounded bg-white text-gray-600"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border rounded text-gray-600 bg-white"
              required
            />
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
              {isLoading ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewProjectPopup;
