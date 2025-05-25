import { db } from '../services/firebaseConfig';
import { useUser } from '@clerk/clerk-react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserTripCard from './components/user-trip-card';
import { Skeleton } from "@/components/ui/skeleton";

const UserTripCardSkeleton = () => (
  <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
    <Skeleton className="h-48 w-full rounded-t-2xl" />
    <div className="p-4 space-y-2">
      <Skeleton className="h-6 w-3/4 rounded-full" />
      <div className="space-y-1">
        <Skeleton className="h-4 w-1/2 rounded-full" />
        <Skeleton className="h-4 w-1/3 rounded-full" />
      </div>
    </div>
  </div>
);

const MyTrips = () => {
  const [userTrips, setUserTrips] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoaded) return;

    if (!user) {
      navigate("/");
      return;
    }

    getUserTrips();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded, user]);

  const getUserTrips = async () => {
    try {
      setIsLoading(true);
      setUserTrips([]);
      const q = query(
        collection(db, "AITrips"),
        where("userEmail", "==", user?.primaryEmailAddress?.emailAddress)
      );
      const querySnapshot = await getDocs(q);
      const trips = [];
      querySnapshot.forEach((doc) => {
        trips.push(doc.data());
      });
      setUserTrips(trips);
    } catch (error) {
      console.error("Error fetching trips:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-black text-white px-4 py-20 sm:px-8 md:px-16 lg:px-32">
        <div className="max-w-7xl mx-auto">
          <Skeleton className="h-10 w-48 mb-10 mx-auto sm:mx-0" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, index) => (
              <UserTripCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-4 py-20 sm:px-8 md:px-16 lg:px-32">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-extrabold mb-10 text-center sm:text-left">
          My Trips
        </h2>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, index) => (
              <UserTripCardSkeleton key={index} />
            ))}
          </div>
        ) : userTrips.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {userTrips.map((trip, index) => (
              <UserTripCard key={index} trip={trip} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center mt-20 text-gray-400">
            <img
              src="/empty.png"
              alt="No trips illustration"
              className="w-48 mb-6 opacity-70"
            />
            <p className="text-lg">No trips found.</p>
            <p className="text-sm">Click "Create Trip" to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTrips;