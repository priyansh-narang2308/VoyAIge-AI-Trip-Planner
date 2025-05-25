import React, { useEffect, useState, useCallback } from 'react';
import { Clock, MapPin, CalendarDays } from 'lucide-react';
import { getPlaceDetails } from '../../services/global-api';

const DailyPlan = ({ tripData }) => {
    const [placePhotos, setPlacePhotos] = useState({});
    const [imageErrors, setImageErrors] = useState({});
    const itinerary = tripData?.tripData?.itinerary || [];

    // Memoize the photo fetching function
    const getPlacePhoto = useCallback(async (placeName) => {
        try {
            const data = { textQuery: placeName };
            const resp = await getPlaceDetails(data);

            if (resp.data?.places?.length > 0 && resp.data.places[0].photos?.length > 0) {
                const photoReference = resp.data.places[0].photos[0].name;
                return `https://places.googleapis.com/v1/${photoReference}/media?key=${import.meta.env.VITE_GOOGLE_API_KEY}&maxWidthPx=400`;
            }
            return null;
        } catch (error) {
            console.error("Error fetching place photo:", error);
            return null;
        }
    }, []);

    // Track which places we've already processed
    const [processedPlaces, setProcessedPlaces] = useState(new Set());

    // Load all place photos only when itinerary changes
    useEffect(() => {
        if (itinerary.length === 0) return;

        const loadAllPlacePhotos = async () => {
            const newPhotos = {};
            const newProcessed = new Set(processedPlaces);

            for (const dayPlan of itinerary) {
                for (const place of dayPlan.places) {
                    if (!newProcessed.has(place.placeName) && !imageErrors[place.placeName]) {
                        const photoUrl = await getPlacePhoto(place.placeName);
                        if (photoUrl) {
                            newPhotos[place.placeName] = photoUrl;
                        }
                        newProcessed.add(place.placeName);
                    }
                }
            }

            if (Object.keys(newPhotos).length > 0) {
                setPlacePhotos(prev => ({ ...prev, ...newPhotos }));
            }
            if (newProcessed.size !== processedPlaces.size) {
                setProcessedPlaces(newProcessed);
            }
        };

        loadAllPlacePhotos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [itinerary, getPlacePhoto, imageErrors]); // Removed placePhotos and processedPlaces from dependencies

    const handleImageError = useCallback((placeName, e) => {
        setImageErrors(prev => {
            const newErrors = { ...prev, [placeName]: true };
            return newErrors;
        });
        e.target.src = 'https://placehold.co/400x250?text=Place+Image+Not+Available';
    }, []);

    if (!itinerary.length) return null;

    return (
        <div className="mt-10 space-y-10">
            <h2 className="text-3xl font-bold text-white">
                🗓️ Your Travel Itinerary{' '}
                <span className="text-gray-300 text-sm font-semibold">
                    (Plan by Day)
                </span>
            </h2>

            {itinerary.map((dayPlan, dayIndex) => (
                <div key={dayIndex} className="space-y-6">
                    <h3 className="text-2xl font-semibold text-white bg-gradient-to-r from-emerald-600 to-teal-500 px-4 py-2 rounded-xl shadow-md w-fit">
                        <CalendarDays className="inline mr-2 text-white" size={20} />
                        {dayPlan.day}
                    </h3>

                    {dayPlan.places.map((place, index) => {
                        const imageUrl = imageErrors[place.placeName]
                            ? 'https://placehold.co/400x250?text=Place+Image'
                            : placePhotos[place.placeName] || place.geoCoordinates?.imageUrl || 'https://placehold.co/400x250?text=Loading...';

                        return (
                            <div
                                key={index}
                                className="rounded-2xl bg-gradient-to-br from-[#1F1F1F] to-[#2B2B2B] text-white p-6 shadow-lg border border-white/10"
                            >
                                <div className="flex flex-col lg:flex-row gap-6">
                                    <div className="flex-shrink-0 w-full lg:w-1/3 hover:scale-105 transition-transform duration-300">
                                        <img
                                            src={imageUrl}
                                            alt={place.placeName}
                                            className="w-full h-64 object-cover rounded-xl border border-white/10"
                                            onError={(e) => handleImageError(place.placeName, e)}
                                        />
                                    </div>

                                    <div className="flex flex-col gap-4 w-full">
                                        <div>
                                            <a
                                                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.placeName)}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 text-xl font-semibold transition-all hover:underline"
                                            >
                                                <h4 className="text-2xl font-bold text-blue-300 mb-1">
                                                    {place.placeName}
                                                </h4>
                                            </a>
                                            <p className="text-sm text-gray-300 italic">
                                                {place.placeDetails}
                                            </p>
                                            <p className="text-sm text-gray-400 mt-2 flex items-center gap-2">
                                                <MapPin size={16} className="text-pink-400" />
                                                <span>
                                                    Latitude: {place.geoCoordinates.latitude} | Longitude: {place.geoCoordinates.longitude}
                                                </span>
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                                            <div className="bg-emerald-700/20 p-4 rounded-xl backdrop-blur-sm border border-emerald-400/20">
                                                <p className="text-sm text-emerald-300">🕒 Best Time to Visit</p>
                                                <p className="font-semibold text-lg text-white">{place.bestTimeToVisit}</p>
                                            </div>

                                            <div className="bg-violet-700/20 p-4 rounded-xl backdrop-blur-sm border border-violet-400/20">
                                                <p className="text-sm text-violet-300">🎟️ Ticket Pricing</p>
                                                <p className="font-semibold text-lg text-white">{place.ticketPricing}</p>
                                            </div>

                                            <div className="bg-pink-700/20 p-4 rounded-xl backdrop-blur-sm border border-pink-400/20">
                                                <p className="text-sm text-pink-300">🚗 Travel Time</p>
                                                <p className="font-semibold text-lg text-white">{place.travelTime}</p>
                                            </div>

                                            <div className="bg-pink-700/20 p-4 rounded-xl backdrop-blur-sm border border-pink-400/20">
                                                <p className="text-sm text-pink-300">🚗 Time</p>
                                                <p className="font-semibold text-lg text-white">{place.time}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
};

export default DailyPlan;