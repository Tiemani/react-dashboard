import React, { useState, useEffect } from 'react';
import { 
  Search, 
  FileText, 
  PlusCircle, 
  Menu, 
  MapPin, 
  AlertCircle, 
  Users, 
  Settings, 
  LogOut 
} from 'lucide-react';

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [map, setMap] = useState(null);
  const [activeSearches, setActiveSearches] = useState([
    { id: 1, lat: 40.712776, lng: -74.005974, title: "Search Area 1" },
    { id: 2, lat: 40.730610, lng: -73.935242, title: "Search Area 2" },
    { id: 3, lat: 40.758896, lng: -73.985130, title: "Search Area 3" }
  ]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    // Trigger map resize after sidebar toggle to ensure proper display
    setTimeout(() => {
      window.google?.maps?.event?.trigger(map, 'resize');
    }, 300);
  };

  useEffect(() => {
    // Load Google Maps API script
    const loadGoogleMapsApi = () => {
      const googleMapsApiKey = 'YOUR_GOOGLE_MAPS_API_KEY'; // Replace with your API key
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = initMap;
      document.head.appendChild(script);
      return () => {
        document.head.removeChild(script);
      };
    };

    // Initialize the map
    const initMap = () => {
      if (!mapLoaded && window.google) {
        const mapInstance = new window.google.maps.Map(document.getElementById('map'), {
          center: { lat: 40.7128, lng: -74.0060 }, // New York City center
          zoom: 12,
          styles: [
            {
              featureType: "poi",
              elementType: "labels",
              stylers: [{ visibility: "off" }]
            }
          ]
        });
        
        setMap(mapInstance);
        
        // Add markers for active searches
        activeSearches.forEach(search => {
          const marker = new window.google.maps.Marker({
            position: { lat: search.lat, lng: search.lng },
            map: mapInstance,
            title: search.title,
            icon: {
              path: window.google.maps.SymbolPath.CIRCLE,
              fillColor: '#4285F4',
              fillOpacity: 1,
              strokeColor: '#FFFFFF',
              strokeWeight: 2,
              scale: 8
            }
          });

          // Add click event to marker
          const infoWindow = new window.google.maps.InfoWindow({
            content: `<div>
              <h3 style="font-weight: bold; margin-bottom: 5px;">${search.title}</h3>
              <p>Status: Active</p>
              <p>Team: Alpha</p>
              <button style="background-color: #3b82f6; color: white; padding: 5px 10px; border: none; border-radius: 4px; margin-top: 5px;">View Details</button>
            </div>`
          });
          
          marker.addListener('click', () => {
            infoWindow.open(mapInstance, marker);
          });
        });
        
        setMapLoaded(true);
      }
    };

    if (!mapLoaded) {
      loadGoogleMapsApi();
    }

    return () => {
      // Cleanup function
    };
  }, [mapLoaded, activeSearches]);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div 
        className={`bg-blue-800 text-white transition-all duration-300 ease-in-out ${
          sidebarOpen ? 'w-64' : 'w-16'
        } flex flex-col shadow-lg z-10`}
      >
        {/* Logo and toggle */}
        <div className="flex items-center justify-between p-4 border-b border-blue-700">
          {sidebarOpen && <h1 className="text-xl font-bold">Search Ops</h1>}
          <button onClick={toggleSidebar} className="p-1 rounded hover:bg-blue-700">
            <Menu size={20} />
          </button>
        </div>

        {/* Quick Actions Section */}
        <div className="p-4">
          {sidebarOpen && <h2 className="text-sm uppercase text-blue-300 mb-2">Quick Actions</h2>}
          
          <div className="space-y-2">
            <QuickActionButton 
              icon={<Search />} 
              text="Start a new search" 
              isOpen={sidebarOpen} 
              isPrimary={true}
            />
            <QuickActionButton 
              icon={<FileText />} 
              text="Access reports pending" 
              isOpen={sidebarOpen} 
            />
            <QuickActionButton 
              icon={<PlusCircle />} 
              text="Add an incident or object" 
              isOpen={sidebarOpen} 
            />
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="mt-6 flex-grow">
          {sidebarOpen && <h2 className="text-sm uppercase text-blue-300 mb-2 px-4">Navigation</h2>}
          
          <nav className="space-y-1">
            <NavItem icon={<MapPin />} text="Operations Map" isOpen={sidebarOpen} isActive={true} />
            <NavItem icon={<AlertCircle />} text="Incidents" isOpen={sidebarOpen} />
            <NavItem icon={<Users />} text="Team Members" isOpen={sidebarOpen} />
            <NavItem icon={<Settings />} text="Settings" isOpen={sidebarOpen} />
          </nav>
        </div>

        {/* Logout Option */}
        <div className="p-4 border-t border-blue-700">
          <NavItem icon={<LogOut />} text="Logout" isOpen={sidebarOpen} />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col">
        {/* Top Navigation Bar */}
        <header className="bg-white shadow-md p-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold text-gray-800">Monitored Search System</h1>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="pl-8 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="absolute left-2 top-2.5 text-gray-400" size={16} />
              </div>
              <button className="p-2 bg-gray-100 rounded-full">
                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
                  <span>UI</span>
                </div>
              </button>
            </div>
          </div>
        </header>

        {/* Map Area */}
        <main className="flex-grow p-6">
          <div className="bg-white rounded-lg shadow-md h-full overflow-hidden">
            {/* Map Container */}
            <div className="relative h-full">
              {/* Google Maps will load here */}
              <div id="map" className="h-full w-full"></div>
              
              {/* Map Controls */}
              <div className="absolute top-4 right-4 bg-white rounded-md shadow-md p-2 z-10">
                <div className="flex flex-col space-y-2">
                  <button className="p-2 hover:bg-gray-100 rounded" title="Zoom In">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"></path>
                      <path d="M12 8v8"></path>
                      <path d="M8 12h8"></path>
                    </svg>
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded" title="Zoom Out">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"></path>
                      <path d="M8 12h8"></path>
                    </svg>
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded" title="Toggle Map View">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="3" y1="9" x2="21" y2="9"></line>
                      <line x1="3" y1="15" x2="21" y2="15"></line>
                      <line x1="9" y1="3" x2="9" y2="21"></line>
                      <line x1="15" y1="3" x2="15" y2="21"></line>
                    </svg>
                  </button>
                </div>
              </div>
              
              {/* Search Areas Legend */}
              <div className="absolute bottom-4 left-4 bg-white rounded-md shadow-md p-3 z-10">
                <h3 className="font-semibold text-sm mb-2">Active Search Areas</h3>
                <div className="space-y-2">
                  {activeSearches.map(search => (
                    <div key={search.id} className="flex items-center text-sm">
                      <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                      <span>{search.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Status Bar */}
        <footer className="bg-white border-t border-gray-200 p-3 text-sm text-gray-600">
          <div className="flex justify-between items-center">
            <span>3 active searches • 2 pending reports • Last updated: 14:32</span>
            <span>System status: Online</span>
          </div>
        </footer>
      </div>
    </div>
  );
}

// Component for quick action buttons
function QuickActionButton({ icon, text, isOpen, isPrimary = false }) {
  return (
    <button 
      className={`flex items-center w-full p-2 rounded-md transition-colors ${
        isPrimary 
          ? 'bg-blue-600 hover:bg-blue-500' 
          : 'hover:bg-blue-700'
      }`}
    >
      <span className="flex-shrink-0">{icon}</span>
      {isOpen && <span className="ml-3">{text}</span>}
    </button>
  );
}

// Component for navigation items
function NavItem({ icon, text, isOpen, isActive = false }) {
  return (
    <a 
      href="#" 
      className={`flex items-center px-4 py-3 transition-colors ${
        isActive 
          ? 'bg-blue-700 text-white' 
          : 'text-blue-100 hover:bg-blue-700'
      }`}
    >
      <span className="flex-shrink-0">{icon}</span>
      {isOpen && <span className="ml-3">{text}</span>}
    </a>
  );
}

export default Dashboard;