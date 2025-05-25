import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Menu, X, LogIn, Plus, PlusCircle, Plane } from 'lucide-react';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';


const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="bg-black text-white shadow-lg px-6 py-4 w-full">
            <div className="flex justify-between items-center">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 text-transparent bg-clip-text tracking-widest">

                    VoyAIge
                </div>

                <nav className="hidden md:flex gap-8 items-center">
                    <a
                        href="/"
                        className="text-white border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-900 transition-colors"
                    >
                        Home
                    </a>

                    <a
                        href="/features"
                        className="text-white border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-900 transition-colors"
                    >
                        Features
                    </a>

                    <a
                        href="/pricing"
                        className="text-white border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-900 transition-colors"
                    >
                        Pricing
                    </a>



                    <div className="flex gap-2">
                        <SignedOut>
                            <SignInButton mode="modal">
                                <Button
                                    className="bg-pink-600 text-white cursor-pointer hover:bg-pink-700"
                                >
                                    <LogIn className="mr-2 w-4 h-4" /> Sign In
                                </Button>
                            </SignInButton>
                        </SignedOut>
                        <SignedIn>
                            <a
                                href="/my-trips"
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-md font-medium text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
                            >
                                <Plane className="w-4 h-4" />
                                My Trips
                            </a>

                            <a
                                href="/create-trip"
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-200 shadow-md"
                            >
                                <PlusCircle className="w-4 h-4" />
                                Create Trip
                            </a>

                            <UserButton />
                        </SignedIn>

                    </div>
                </nav>



                <div className="md:hidden">
                    <Button variant="ghost" size="icon" onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </Button>
                </div>
            </div>

            {menuOpen && (
                <div className="md:hidden mt-4 flex flex-col gap-4 bg-black border-t border-gray-800 pt-4">
                    <a href="/" className="text-gray-300 hover:text-neonPink px-4">Home</a>
                    <a href="/features" className="text-gray-300 hover:text-neonBlue px-4">Features</a>
                    <a href="/pricing" className="text-gray-300 hover:text-neonGreen px-4">Pricing</a>
                    <a href="/create-trip" className="text-gray-300 hover:text-neonGreen px-4">+ Create Trip</a>
                    <a href="/my-trips" className="text-gray-300 hover:text-neonGreen px-4">My Trips</a>
                    <div className="flex flex-col gap-2 px-4">
                        <Button className="bg-pink-600 text-white hover:bg-pink-700">
                            <LogIn className="mr-2 w-4 h-4" /> Sign In
                        </Button>

                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
