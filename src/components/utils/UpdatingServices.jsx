import React, { useState, useEffect } from 'react';

const UpdateServicePopup = ({ isOpen, onClose, onSubmit, serviceData, id }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [file, setImage] = useState(null);
  const [subServices, setSubservices] = useState([]);
  const [newSubservice, setNewSubservice] = useState('');
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (serviceData) {
      setName(serviceData.name || '');
      setDescription(serviceData.description || '');
      setSubservices(serviceData.subServices || []);
    }
  }, [serviceData]);

  const handleAddSubservice = () => {
    if (newSubservice.trim()) {
      setSubservices([...subServices, newSubservice]);
      setNewSubservice('');
    }
  };

  const handleRemoveSubservice = (index) => {
    setSubservices(subServices.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    setLoading(true);
    await onSubmit({ id, name, description, image: file, subServices }, id);
    setName('');
    setDescription('');
    setImage(null);
    setSubservices([]);
    setLoading(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-300 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-3/6 max-h-[100vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4 text-black">Update Service</h2>

        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter service name"
            className="w-full p-2 border rounded bg-white text-gray-700"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 ">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter service description"
            className="w-full p-2 border rounded bg-white text-gray-700  [&::-webkit-scrollbar-track]:bg-gray-100 min-h-32 max-h-32 overflow-y-auto
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">
            Image
          </label>
          <input
            id="image"
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full p-2 border rounded bg-white text-gray-700"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="subservices" className="block text-sm font-medium text-gray-700 ">
            Subservices
          </label>
          <div className="flex flex-wrap gap-2 mb-4 max-h-36 [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 overflow-y-auto">
            {subServices.map((subservice, index) => (
              <div
                key={index}
                className="flex items-center px-3 py-1 bg-gray-200 rounded-full text-xs text-gray-700 hover:bg-gray-300 hover:cursor-pointer"
              >
                {subservice}
                <button
                  onClick={() => handleRemoveSubservice(index)}
                  className="ml-1 text-gray-500 hover:text-gray-800"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={newSubservice}
              onChange={(e) => setNewSubservice(e.target.value)}
              placeholder="Add new subservice"
              className="flex-1 p-2 border rounded bg-white text-gray-700"
            />
            <button
              onClick={handleAddSubservice}
              className="px-4 py-2 bg-blue-300 rounded hover:bg-blue-400"
            >
              Add
            </button>
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-red-300 rounded hover:bg-red-400"
          >
            Cancel
          </button>
          <button
            onClick={isLoading ? () => {} : handleSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {isLoading ? 'Updating...' : 'Update'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateServicePopup;
