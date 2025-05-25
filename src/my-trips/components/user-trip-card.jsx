import React, { useState, useEffect, useCallback } from 'react';
import { getPlaceDetails } from '../../services/global-api';
import { Link } from 'react-router-dom';

const UserTripCard = ({ trip }) => {
    const location = trip?.userSelection?.location?.label || "Unknown Location";
    const [photoUrl, setPhotoUrl] = useState("");
    const [imageLoading, setImageLoading] = useState(true);
    const [imageError, setImageError] = useState(false);

    const handleFallbackImage = useCallback(() => {
        setImageError(true);
        setImageLoading(false);
        setPhotoUrl('./placeholder.png');
    }, []);

    const getPlacePhoto = useCallback(async () => {
        if (!location || location === "Unknown Location") {
            handleFallbackImage();
            return;
        }

        setImageLoading(true);
        setImageError(false);

        try {
            const data = { textQuery: location };
            const resp = await getPlaceDetails(data);

            if (resp?.data?.places?.[0]?.photos?.length > 0) {
                const photoRef = resp.data.places[0].photos[0].name;
                const url = `https://places.googleapis.com/v1/${photoRef}/media?key=${import.meta.env.VITE_GOOGLE_API_KEY}&maxWidthPx=800`;

                const img = new Image();
                img.onload = () => {
                    setPhotoUrl(url);
                    setImageLoading(false);
                };
                img.onerror = handleFallbackImage;
                img.src = url;
            } else {
                handleFallbackImage();
            }
        } catch (error) {
            console.error("Error fetching place photo:", error);
            handleFallbackImage();
        }
    }, [location, handleFallbackImage]);

    useEffect(() => {
        getPlacePhoto();
    }, [getPlacePhoto]);

    return (

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl hover:scale-[1.02] transition-all duration-300 group cursor-pointer text-black">
            <Link to={`/view-trip/${trip?.id}`}>
                <div className="h-48 w-full relative bg-gray-100">
                    {imageLoading ? (
                        <div className="h-full w-full flex items-center justify-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-400"></div>
                        </div>
                    ) : imageError ? (
                        <img
                            className="h-full w-full object-cover"
                            src="./placeholder.png"
                            alt="Trip Destination"
                        />
                    ) : (
                        <img
                            className="h-full w-full object-cover group-hover:brightness-90 transition-all duration-300"
                            src={photoUrl}
                            alt={location}
                            onError={handleFallbackImage}
                            loading="lazy"
                        />
                    )}
                </div>
                <div className="p-4">
                    <h2 className="font-bold text-xl mb-1 truncate">{location}</h2>
                    <div className="text-sm text-gray-600 space-y-1">
                        <p>🗓 {trip?.userSelection?.numberOfDays || 0} Days</p>
                        <p>💰 Budget: {trip?.userSelection?.budget || 'N/A'}</p>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default UserTripCard;