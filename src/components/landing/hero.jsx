import React from 'react';
import { Button } from '../ui/button';
import { Plane, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SignInButton, useUser } from '@clerk/clerk-react';

const Hero = () => {

    const { user } = useUser();

    return (
        <section className="bg-black text-white min-h-screen py-20 px-6 md:px-24 lg:px-48 flex flex-col items-center text-center gap-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
                <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-transparent bg-clip-text drop-shadow-[0_0_25px_#a855f7]">
                    AI-Powered Travel Planning
                </span>
                <br />
                <span className="text-[#ff4ecd] drop-shadow-[0_0_10px_#ff4ecd]">
                    Curated Itineraries for Your Dream Trips
                </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-400 max-w-3xl">
                Say goodbye to generic travel plans. Voyaige crafts unique, smart, and budget-friendly itineraries — designed just for you. Powered by cutting-edge AI.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-4">
                {user ? (
                    <Link to="/create-trip">
                        <Button
                            className="bg-gradient-to-r cursor-pointer from-purple-500 to-pink-500 text-white text-xl font-bold px-10 py-5 rounded-2xl shadow-[0_0_20px_rgba(236,72,153,0.6)] 
          flex items-center justify-center gap-3 transition-all duration-300 hover:brightness-110 hover:scale-105"
                        >
                            <Plane className="w-6 h-6" />
                            Start Planning
                        </Button>
                    </Link>
                ) : (
                    <SignInButton mode="modal">
                        <Button
                            className="bg-gradient-to-r cursor-pointer from-purple-500 to-pink-500 text-white text-xl font-bold px-10 py-5 rounded-2xl shadow-[0_0_20px_rgba(236,72,153,0.6)] 
          flex items-center justify-center gap-3 transition-all duration-300 hover:brightness-110 hover:scale-105"
                        >
                            Get Started
                        </Button>
                    </SignInButton>
                )}
            </div>

            <img
                src="/hero.avif"
                alt="Travel illustration"
                className="mt-10 w-full max-w-5xl rounded-2xl border-2 border-[#4effbe] shadow-[0_0_20px_#4effbe] hover:scale-[1.015] transition-transform duration-300"
            />
        </section>
    );
};

export default Hero;
