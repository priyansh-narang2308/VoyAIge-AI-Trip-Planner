import { db } from '@/services/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import InformationSection from '../components/information-section';
import HotelRecommendation from '../components/hotel-recommendation';
import DailyPlan from '../components/daily-plan';
import Footer from '../components/footer';

const ViewTripDetails = () => {
    const { tripId } = useParams();
    const [tripData, setTripData] = useState(null);

    useEffect(() => {
        tripId && getTripData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tripId]);

    console.log("tripData", tripData);
    console.log("tripData.hotels", tripData?.hotels);

    const getTripData = async () => {
        const docRef = doc(db, "AITrips", tripId);
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
            console.log("Document: ", docSnapshot.data());
            setTripData(docSnapshot.data());
        } else {
            console.log("No such document");
            toast.error("No trip found");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] text-white px-6 md:px-20 lg:px-44 xl:px-56 py-10">
            <div className="space-y-10">
                {/* Information Section */}
                <InformationSection tripData={tripData} />

                {/* Recommended hotels */}
                <HotelRecommendation tripData={tripData} />

                {/* Daily plan */}
                <DailyPlan tripData={tripData} />

                {/* Footer */}
                <Footer/>
            </div>
        </div>
    );
};

export default ViewTripDetails;
