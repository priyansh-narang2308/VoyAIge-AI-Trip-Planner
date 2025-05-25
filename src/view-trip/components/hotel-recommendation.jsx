import React from 'react';
import { MapPin, Star } from 'lucide-react';
import HotelCardItem from './hotel-card-item';

const HotelRecommendation = ({ tripData }) => {
    const hotels = tripData?.tripData?.hotels || [];

    if (!hotels.length) return null;

    return (
        <div className="mt-10">
            <h2 className="text-3xl font-bold text-white mb-8">
                🏨 Hotel Recommendations{' '}
    
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {hotels.map((hotel, index) => (
                    <HotelCardItem hotel={hotel} key={index} />
                ))}
            </div>
        </div>
    );
};

export default HotelRecommendation;
