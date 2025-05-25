import React, { useEffect, useState, useCallback } from 'react';
import { CalendarDays, DollarSign, Users, Send, ImageIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { getPlaceDetails } from '../../services/global-api';

const InformationSection = ({ tripData }) => {
    const location = tripData?.userSelection?.location?.label || "Unknown Location";
    const days = tripData?.userSelection?.numberOfDays || "--";
    const budget = tripData?.userSelection?.budget || "--";
    const travelers = tripData?.userSelection?.travelerType || "--";

    const [photoUrl, setPhotoUrl] = useState("");
    const [imageLoading, setImageLoading] = useState(true);
    const [imageError, setImageError] = useState(false);

    // Memoized fallback image handler
    const handleFallbackImage = useCallback(() => {
        setImageError(true);
        setImageLoading(false);
        setPhotoUrl(`https://source.unsplash.com/1600x900/?travel,${encodeURIComponent(location)}`);
    }, [location]);

    // Memoized photo fetching function
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
                const url = `https://places.googleapis.com/v1/${photoRef}/media?key=${import.meta.env.VITE_GOOGLE_API_KEY}&maxWidthPx=1000`;

                // Preload image to verify it works before setting state
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
        <div className="text-white">
            <div className="relative h-[340px] w-full rounded-xl overflow-hidden shadow-lg bg-gray-800">
                {imageLoading ? (
                    <div className="h-full w-full flex items-center justify-center bg-gray-700">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                    </div>
                ) : imageError ? (
                    <div className="h-full w-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 to-purple-900">
                        <ImageIcon size={48} className="text-white/70 mb-2" />
                        <p className="text-white/70 text-sm">Image not available</p>
                    </div>
                ) : (
                    <img
                        src={photoUrl}
                        alt={`${location} destination`}
                        className="h-full w-full object-cover"
                        crossOrigin="anonymous"
                        onError={handleFallbackImage}
                        loading="lazy"
                    />
                )}
            </div>

            <div className="mt-6 space-y-4">
                <h2 className="text-3xl font-extrabold tracking-tight">{location}</h2>

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex flex-wrap gap-4">
                        <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/10">
                            <CalendarDays size={18} className="text-emerald-400" />
                            <span>{days} Days</span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/10">
                            <DollarSign size={18} className="text-yellow-400" />
                            <span>Budget: {budget}</span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/10">
                            <Users size={18} className="text-blue-400" />
                            <span>Travellers: {travelers}</span>
                        </div>
                    </div>

            
                </div>
            </div>
        </div>
    );
};

export default InformationSection;