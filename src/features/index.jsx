import React from "react";
import { Sparkles, Map, CalendarDays, Compass, Users, Stars } from "lucide-react";

const features = [
    {
        icon: <Sparkles size={24} className="text-purple-400" />,
        title: "AI-Powered Itineraries",
        description: "Tell us where and how long — our AI builds your perfect trip with places to visit, stay, and eat.",
    },
    {
        icon: <CalendarDays size={24} className="text-pink-400" />,
        title: "Smart Trip Scheduler",
        description: "Balanced daily plans tailored to your pace, preferences, and priorities.",
    },
    {
        icon: <Map size={24} className="text-blue-400" />,
        title: "Interactive Map Integration",
        description: "Explore your destinations with embedded maps and real-time route planning.",
    },
    {
        icon: <Users size={24} className="text-yellow-300" />,
        title: "Group Travel Ready",
        description: "Built-in support for travelers of all types – families, couples, or solo explorers.",
    },
    {
        icon: <Compass size={24} className="text-emerald-400" />,
        title: "Location Intelligence",
        description: "Discover hidden gems using Google Places data and smart local insights.",
    },
    {
        icon: <Stars size={24} className="text-cyan-300" />,
        title: "Seamless UX",
        description: "Lightning-fast, mobile-optimized experience with modern design and smooth transitions.",
    },
];

const Features = () => {
    return (
        <section className="relative bg-gradient-to-br from-[#0f0f0f] via-[#111] to-[#1a1a1a] py-20 px-6 md:px-12 text-white">
            <div className="max-w-7xl mx-auto text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text mb-4">
                    Why Choose Our Voyaige?
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                    Smart, personalized, and lightning-fast travel planning. Skip the hassle. Just explore.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {features.map((feature, idx) => (
                    <div
                        key={idx}
                        className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-6 flex flex-col gap-4 hover:shadow-lg transition-shadow duration-300 hover:border-purple-400/20"
                    >
                        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/10">
                            {feature.icon}
                        </div>
                        <h3 className="text-xl font-semibold">{feature.title}</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Features;
