import { getPlaceDetails } from '../../services/global-api';
import { MapPin, Star } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const HotelCardItem = ({ hotel }) => {
    const [photoUrl, setPhotoUrl] = useState(null);
    const [imageError, setImageError] = useState(false);

    useEffect(() => {
        if (hotel) {
            getPlacePhoto();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hotel]);

    const getPlacePhoto = async () => {
        try {
            const data = {
                textQuery: hotel?.hotelName
            };

            const resp = await getPlaceDetails(data);

            if (resp.data?.places?.length > 0 && resp.data.places[0].photos?.length > 0) {
                const photoReference = resp.data.places[0].photos[0].name;
                const photoUrl = `https://places.googleapis.com/v1/${photoReference}/media?key=${import.meta.env.VITE_GOOGLE_API_KEY}&maxWidthPx=400`;
                setPhotoUrl(photoUrl);
            }
        } catch (error) {
            console.error("Error fetching place photo:", error);
            setImageError(true);
        }
    };

    const handleImageError = (e) => {
        // Only try to fallback if we haven't already
        if (!imageError) {
            setImageError(true);
            e.target.src = 'https://placehold.co/400x250?text=Hotel+Image';
        }
    };

    return (
        <div className="rounded-2xl bg-[#1A1A1A] text-white p-6 shadow-lg border border-white/10 flex flex-col">
            <div className="w-full hover:scale-105 transition-all mb-4">
                <img
                    src={imageError
                        ? 'https://placehold.co/400x250?text=Hotel+Image'
                        : photoUrl || 'https://placehold.co/400x250?text=Loading...'}
                    alt={hotel.hotelName}
                    className="w-full h-52 object-cover rounded-xl border border-white/10"
                    onError={handleImageError}
                />
            </div>

            <div className="flex flex-col gap-4 flex-grow">
                <div>
                    <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel.hotelName + ', ' + hotel.address)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-xl font-semibold transition-all hover:underline"
                    >
                        {hotel.hotelName}
                        <span className="text-sm text-blue-300 font-normal hover:text-blue-400">
                            🗺 View on Map
                        </span>
                    </a>

                    <p className="text-sm text-gray-400 mt-1 flex items-center gap-2">
                        <MapPin size={16} className="text-emerald-400" />
                        {hotel.address}
                    </p>
                </div>

                <p className="text-gray-300 text-sm">{hotel.description}</p>

                <div className="grid grid-cols-2 gap-3 mt-2">
                    <div className="bg-white/10 p-3 rounded-xl backdrop-blur-sm border border-white/10">
                        <p className="text-xs text-gray-400">💸 Price Range</p>
                        <p className="font-medium text-base">{hotel.price}</p>
                    </div>

                    <div className="bg-white/10 p-3 rounded-xl backdrop-blur-sm border border-white/10">
                        <p className="text-xs text-gray-400 flex items-center gap-1">⭐ Rating</p>
                        <p className="font-medium text-base flex items-center gap-1">
                            <Star size={16} className="text-yellow-400" />
                            {hotel.rating} / 5
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HotelCardItem;