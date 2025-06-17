
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  MapPin, 
  Clock, 
  Shield, 
  Star, 
  Car, 
  Users, 
  Smartphone,
  ArrowRight
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const features = [
    {
      icon: <Search className="h-8 w-8" />,
      title: "Easy Search",
      description: "Find parking spots near you with our intuitive search and filter system"
    },
    {
      icon: <MapPin className="h-8 w-8" />,
      title: "Real-time Availability",
      description: "See live availability updates and book spots that are actually available"
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "24/7 Booking",
      description: "Book parking spaces anytime, anywhere with our round-the-clock service"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Secure Payments",
      description: "Safe and secure payment processing with multiple payment options"
    }
  ];

  const stats = [
    { number: "10K+", label: "Parking Spots" },
    { number: "50K+", label: "Happy Customers" },
    { number: "100+", label: "Cities" },
    { number: "4.8", label: "Average Rating" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Find Perfect
                <span className="text-blue-200"> Parking</span>
                <br />Spots Instantly
              </h1>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Discover, book, and pay for parking spaces in advance. 
                Save time, avoid stress, and never circle the block again.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/app/home"
                  className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-colors shadow-lg"
                >
                  Start Parking
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  to="/login"
                  className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-blue-600 transition-colors"
                >
                  List Your Space
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 text-blue-100">
                    <MapPin className="h-5 w-5" />
                    <span>Downtown Plaza Parking</span>
                  </div>
                  <div className="flex items-center space-x-3 text-blue-100">
                    <Clock className="h-5 w-5" />
                    <span>Available now - $5/hour</span>
                  </div>
                  <div className="flex items-center space-x-3 text-blue-100">
                    <Car className="h-5 w-5" />
                    <span>45/50 spots available</span>
                  </div>
                  <div className="flex items-center space-x-3 text-blue-100">
                    <Star className="h-5 w-5 fill-current" />
                    <span>4.8 rating (120 reviews)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose ParkEasy?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We make parking simple, convenient, and stress-free with features designed for modern urban life.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Get started in just 3 simple steps
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Search & Find
              </h3>
              <p className="text-gray-600">
                Search for parking spots near your destination using our smart filters
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Book & Pay
              </h3>
              <p className="text-gray-600">
                Reserve your spot instantly and pay securely through our platform
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Park & Go
              </h3>
              <p className="text-gray-600">
                Use your QR code to access the parking spot and enjoy your day
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Never Search for Parking Again?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of satisfied customers who have made parking hassle-free
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/app/home"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-colors"
            >
              <Users className="mr-2 h-5 w-5" />
              Find Parking Now
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-blue-600 transition-colors"
            >
              <Smartphone className="mr-2 h-5 w-5" />
              List Your Space
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">ParkEasy</h3>
              <p className="text-gray-400">
                Making parking simple and convenient for everyone, everywhere.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">For Drivers</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="#" className="hover:text-white">Find Parking</Link></li>
                <li><Link to="#" className="hover:text-white">How It Works</Link></li>
                <li><Link to="#" className="hover:text-white">Pricing</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">For Owners</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="#" className="hover:text-white">List Your Space</Link></li>
                <li><Link to="#" className="hover:text-white">Owner Dashboard</Link></li>
                <li><Link to="#" className="hover:text-white">Earnings</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="#" className="hover:text-white">Help Center</Link></li>
                <li><Link to="#" className="hover:text-white">Contact Us</Link></li>
                <li><Link to="#" className="hover:text-white">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 ParkEasy. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
