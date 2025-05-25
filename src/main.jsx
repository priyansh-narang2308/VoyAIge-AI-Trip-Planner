import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router';
import CreateTripPage from './create-trip';
import Header from './components/landing/header';
import { Toaster } from "react-hot-toast";
import { ClerkProvider } from '@clerk/clerk-react';
import ViewTripDetails from './view-trip/[tripId]';
import Features from './features';
import Pricing from './pricing';
import MyTrips from './my-trips';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key');
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/create-trip",
    element: <CreateTripPage />
  },
  {
    path: "/view-trip/:tripId",
    element: <ViewTripDetails />
  },
  {
    path: "/my-trips",
    element: <MyTrips />
  },
  {
    path: "/features",
    element: <Features />
  },
  {
    path: "/pricing",
    element: <Pricing />
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl='/'>
      <Header />
      <RouterProvider router={router} />
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </ClerkProvider>
  </StrictMode>,
);
