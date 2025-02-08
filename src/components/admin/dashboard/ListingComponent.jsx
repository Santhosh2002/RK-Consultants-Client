import axios from 'axios';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NewListingPopup from '../../utils/NewListingPopUp';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import UpdateListingPopup from '../../utils/UpdateListingPopUp';

function ListingComponent() {
    const [listings, setListings] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [buttonLoading, setButtonLoading] = useState(false);
    const [isNewPopupOpen, setIsNewPopupOpen] = useState(false);
    const [isUpdatePopupOpen, setIsUpdatePopupOpen] = useState(false);
    const [selectedListing, setSelectedListing] = useState(null);

    useEffect(() => {
        getAllListings();
    }, []);

    const getAllListings = async () => {
        setLoading(true);
        try {
            const url = import.meta.env.VITE_BASE_URL + "/api/listing/all";
            const token = localStorage.getItem('authToken');
            const response = await axios.get(url, {
                headers: {
                    Authorization: token,
                },
            });
            setListings(response.data.listings);
        } catch (error) {
            toast.error(`Failed to fetch listings: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleUploadImage = async (file) => {
        const url = import.meta.env.VITE_UPLOAD_URL;
        const apiKey = import.meta.env.VITE_API_KEY;
        if (!file) return null;

        const formData = new FormData();
        formData.append('fileToUpload', file);
        try {
            const response = await axios.post(url, formData, {
                headers: {
                    'X-API-KEY': apiKey,
                    'Content-Type': 'multipart/form-data',
                },
            });
            // console.log(response.data.url); 
            return response.data.url;
        } catch (error) {
            toast.error(`Image upload failed: ${error.message}`);
            return null;
        }
    };
    const handleDeleteListing = async (id) => {
        try {
            const url = `${import.meta.env.VITE_BASE_URL}/api/listing/delete/${id}`;
            const token = localStorage.getItem('authToken');
            const response = await axios.delete(url, {
                headers: {
                    Authorization: token,
                },
            });
            toast.success(response.data.message);
            getAllListings();
        } catch (error) {
            toast.error(`Failed to delete listing: ${error.message}`);
        } finally {
            setButtonLoading(false); 
        }
    }
    const handleAddListing = async (formData) => {
        try {
            const url = import.meta.env.VITE_BASE_URL + "/api/listing/create";
            const token = localStorage.getItem('authToken');

            const images = formData.images;
            const imageUrls = [];
            for (let i = 0; i < images.length; i++) {
                const imageUrl = await handleUploadImage(images[i]);
                imageUrls.push(imageUrl);
            }

            formData.images = imageUrls;
            // print the form data fields and values
            console.log(formData);

            const response = await axios.post(url, formData, {
                headers: {
                    Authorization: token,
                },
            });


            toast.success("Listing added successfully!");
            setIsNewPopupOpen(false);
            getAllListings();
        } catch (error) {
            toast.error(`Failed to add listing: ${error.message}`);
        }
    };

    const handleUpdateListing = async (formData, id) => {
        try {
            const url = `${import.meta.env.VITE_BASE_URL}/api/listing/update/${id}`;
            const token = localStorage.getItem('authToken');

            let  images = formData.images;
            // console.log(formData); 
            if(formData.newImages.length > 0){
                const newImageUrls = [];
                for (let i = 0; i < formData.newImages.length; i++) {
                    const imageUrl = await handleUploadImage(formData.newImages[i]);
                    newImageUrls.push(imageUrl);
                }
                images = [...images, ...newImageUrls];
            }

            formData.images = images;

           
            console.log(formData);
             const res =await axios.put(url, formData, {
                headers: {
                    Authorization: token,
                },
            });
            console.log(res.data);

            toast.success("Listing updated successfully!");
            setIsUpdatePopupOpen(false);
            getAllListings();
        } catch (error) {
            toast.error(`Failed to update listing: ${error.message}`);
        }
    };

    if (loading)
        return ( <div className="flex justify-center items-center min-h-screen bg-gray-100"> <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-6 w-full max-w-screen-xl"> {Array.from({ length: 8 }).map((_, index) => ( <div key={index} className="animate-pulse bg-white p-4 rounded-lg shadow-md" > <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div> <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div> <div className="h-4 bg-gray-300 rounded w-5/6 mb-2"></div> <div className="h-20 bg-gray-300 rounded mb-4"></div> <div className="flex justify-between"> <div className="h-6 bg-gray-300 rounded w-16"></div> <div className="h-6 bg-gray-300 rounded w-16"></div> </div> </div> ))} </div> </div> );

    return (
        <>
            <ToastContainer />
            <section className="bg-white p-4">
                <h1 className="text-2xl font-bold mb-4 text-black text-center">
                    Admin Panel: Listings
                </h1>
                <div
                    onClick={() => setIsNewPopupOpen(true)}
                    className="cursor-pointer max-w-56 p-1 bg-blue-400 border border-blue-300 rounded-lg shadow hover:bg-blue-500 hover:shadow-lg duration-150 flex justify-center items-center"
                >
                    <p className="text-sm font-bold text-white p-1">Add New Listings</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
                    {listings.map((listing) => (
                        <div
                            key={listing._id}
                            className="block max-w-md p-4 bg-white border border-gray-300 rounded-lg shadow hover:shadow-lg"
                        >
                            {listing.images && listing.images.length > 0 ? (
                                <Swiper navigation modules={[Navigation]} className="w-full h mb-4 rounded-md">
                                    {listing.images.map((image, index) => (
                                        <SwiperSlide key={index}>
                                            <img
                                                src={image}
                                                alt={`${listing.title} image ${index + 1}`}
                                                className="w-full h-48 object-cover rounded-md"
                                            />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            ) : (
                                <div className="w-full h-48 flex justify-center items-center bg-gray-200 text-gray-500 rounded-md mb-4">
                                    No Image Available
                                </div>
                            )}

                            <h5 className="text-lg font-bold text-black">{listing.title}</h5>
                            <p className="text-sm text-gray-700 mb-2">
                                {listing.description.length > 40
                                    ? `${listing.description.substring(0, 40)}...`
                                    : listing.description}
                            </p>
                            <p className="text-xs text-gray-500">Visible: {listing.visible ? "Yes" : "No"}</p>
                            <p className="text-xs text-gray-500">
                                Created at: {new Date(listing.createdAt).toLocaleString()}
                            </p>
                            <div className="flex justify-end mt-4 gap-2">
                                <button
                                    className="text-sm rounded-lg bg-blue-500 text-white py-1 px-3"
                                    onClick={() => {
                                        setSelectedListing(listing);
                                        setIsUpdatePopupOpen(true);
                                    }}
                                >
                                    Update
                                </button>
                                <button
                                    className="text-sm rounded-lg bg-red-500 text-white py-1 px-3"
                                    onClick={buttonLoading ? () => {} : ()=>handleDeleteListing(listing._id) }
                                >
                                    {buttonLoading ? 'Deleting...' : 'Delete'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <NewListingPopup
                isOpen={isNewPopupOpen}
                onClose={() => setIsNewPopupOpen(false)}
                onSubmit={handleAddListing}
            />

            <UpdateListingPopup
                isOpen={isUpdatePopupOpen}
                onClose={() => setIsUpdatePopupOpen(false)}
                onSubmit={handleUpdateListing}
                listingData={selectedListing}
                id={selectedListing?._id}
            />
        </>
    );
}

export default ListingComponent;
