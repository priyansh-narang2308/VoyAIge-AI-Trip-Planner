import { Facebook, Twitter, Instagram, Mail, Phone } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="mt-20 border-t border-white/10 text-gray-300 text-sm ">
            <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                <div>
                    <h3 className="text-white font-bold text-lg mb-4">Voyaige</h3>
                    <p className="text-gray-400">
                        Explore curated travel experiences with personalized recommendations.
                    </p>
                </div>

                <div>
                    <h4 className="text-white font-semibold mb-3">Quick Links</h4>
                    <ul className="space-y-2">
                        <li><a href="/" className="hover:text-white transition">Home</a></li>
                        <li><a href="/about" className="hover:text-white transition">About Us</a></li>
                        <li><a href="/destinations" className="hover:text-white transition">Destinations</a></li>
                        <li><a href="/contact" className="hover:text-white transition">Contact</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-white font-semibold mb-3">Contact</h4>
                    <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                            <Mail size={16} className="text-emerald-400" />
                            <a href="mailto:hello@voyaige.com" className="hover:text-white transition">voyaige.com</a>
                        </li>
                        <li className="flex items-center gap-2">
                            <Phone size={16} className="text-emerald-400" />
                            <a href="tel:+1234567890" className="hover:text-white transition">+91 1234567890</a>
                        </li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-white font-semibold mb-3">Follow Us</h4>
                    <div className="flex gap-4">
                        <a href="#" className="hover:text-white transition">
                            <Facebook size={20} />
                        </a>
                        <a href="#" className="hover:text-white transition">
                            <Twitter size={20} />
                        </a>
                        <a href="#" className="hover:text-white transition">
                            <Instagram size={20} />
                        </a>
                    </div>
                </div>
            </div>

            <div className="border-t border-white/10 py-6 text-center text-gray-500 text-xs">
                &copy; {new Date().getFullYear()} <span className="text-white font-semibold">Voyaige</span>. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
