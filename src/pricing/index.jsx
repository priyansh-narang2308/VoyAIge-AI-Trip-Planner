import React from "react";
import { CheckCircle2 } from "lucide-react";

const plans = [
    {
        name: "Free",
        price: "$0",
        description: "Perfect for casual travelers and quick plans.",
        features: [
            "Basic itinerary generation",
            "Google Maps integration",
            "Single trip storage",
            "Explore places & hotels",
        ],
        highlighted: false,
    },
    {
        name: "Pro",
        price: "$9/month",
        description: "For frequent travelers who want smart and rich planning features.",
        features: [
            "Unlimited AI trip plans",
            "Daily smart scheduling",
            "Save & edit multiple trips",
            "Group travel support",
            "Priority image fetching",
        ],
        highlighted: true,
    },
    {
        name: "Premium",
        price: "$19/month",
        description: "Power users and travel enthusiasts who want it all.",
        features: [
            "Everything in Pro",
            "AI hotel & flight suggestions",
            "Offline PDF export",
            "Early access to new features",
            "Dedicated support",
        ],
        highlighted: false,
    },
];

const Pricing = () => {
    return (
        <section className="bg-gradient-to-br from-[#0f0f0f] via-[#111] to-[#1a1a1a] py-20 px-6 md:px-12 text-white">
            <div className="max-w-6xl mx-auto text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text mb-4">
                    Flexible Pricing for Every Traveler
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                    Choose a plan that fits your travel style — from casual explorers to full-time nomads.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {plans.map((plan, idx) => (
                    <div
                        key={idx}
                        className={`rounded-2xl border border-white/10 p-8 backdrop-blur-md shadow-md transition-all duration-300 relative ${plan.highlighted
                                ? "bg-gradient-to-br from-purple-700/30 to-pink-700/20 border-purple-400/30 shadow-purple-500/30"
                                : "bg-white/5"
                            }`}
                    >
                        {plan.highlighted && (
                            <div className="absolute top-4 right-4 px-3 py-1 text-xs rounded-full bg-pink-500 text-white font-semibold shadow">
                                Most Popular
                            </div>
                        )}

                        <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                        <p className="text-4xl font-extrabold mb-2">{plan.price}</p>
                        <p className="text-gray-400 text-sm mb-6">{plan.description}</p>

                        <ul className="space-y-4 text-sm">
                            {plan.features.map((feature, i) => (
                                <li key={i} className="flex items-center gap-2 text-white/90">
                                    <CheckCircle2 className="text-emerald-400" size={18} />
                                    {feature}
                                </li>
                            ))}
                        </ul>

                        <button
                            className={`mt-8 w-full py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 ${plan.highlighted
                                    ? "bg-white text-black hover:bg-gray-200"
                                    : "bg-white/10 text-white hover:bg-white/20"
                                }`}
                        >
                            {plan.highlighted ? "Start with Pro" : "Choose Plan"}
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Pricing;
