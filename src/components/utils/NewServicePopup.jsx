import React, { useState } from 'react';

const NewServicePopup = ({ isOpen, onClose, onSubmit }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [subServices, setSubservices] = useState([]);
  const [newSubservice, setNewSubservice] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!file) {
      setError('Please upload an image.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('File size should be less than 5MB.');
      return;
    }

    if (subServices.length === 0) {
      setError('Please add at least one subservice.');
      return;
    }

    setLoading(true);
    await onSubmit({ name, description, image: file, subServices });

    setName('');
    setDescription('');
    setFile(null);
    setSubservices([]);
    setLoading(false);
    onClose();
    setError(''); // Clear the error after successful submission
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > 5 * 1024 * 1024) {
        setError('File size should be less than 5MB.');
      } else {
        setError('');
        setFile(selectedFile);
      }
    }
  };

  const handleAddSubservice = () => {
    if (newSubservice.trim()) {
      setSubservices([...subServices, newSubservice]);
      setNewSubservice('');
      setError(''); // Clear any previous error
    }
  };

  const handleRemoveSubservice = (index) => {
    setSubservices(subServices.filter((_, i) => i !== index));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-3/6 max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4 text-black">New Service</h2>

        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter service name"
            className="w-full p-2 border rounded bg-white text-gray-700"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter service description"
            required
            className="w-full p-2 border rounded bg-white text-gray-700 min-h-36 max-h-32 overflow-y-auto"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">
            Image
          </label>
          <input
            id="image"
            type="file"
            onChange={handleFileChange}
            required
            className="w-full p-2 border rounded bg-white text-gray-700"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="subservices" className="block text-sm font-medium text-gray-700">
            Subservices
          </label>
          <div className="flex flex-wrap gap-2 mb-4 max-h-32 overflow-y-auto">
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
          <div className="mt-4 flex items-center space-x-2">
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

        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}

        <div className="flex justify-end space-x-2 mt-4">
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
            {isLoading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewServicePopup;
