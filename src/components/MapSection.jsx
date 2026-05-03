// components/MapSection.jsx
'use client';

export default function MapSection() {
  const openMap = () => {
    window.open('https://maps.google.com/?q=123+Tech+Street+San+Francisco+CA', '_blank');
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-6 border-b">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Our Location</h2>
        <p className="text-gray-600">123 Tech Street, San Francisco, CA</p>
      </div>
      
      {/* Map Placeholder */}
      <div className="relative h-64 bg-gray-100">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl mb-2 align-center flex justify-center "><svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24"><g fill="none"><path d="M12 2a8 8 0 0 1 8 8c0 6.5-8 12-8 12s-8-5.5-8-12a8 8 0 0 1 8-8m0 5a3 3 0 1 0 0 6a3 3 0 0 0 0-6" clip-rule="evenodd"/><path stroke="currentColor" stroke-width="2" d="M20 10c0 6.5-8 12-8 12s-8-5.5-8-12a8 8 0 1 1 16 0Z"/><path stroke="currentColor" stroke-width="2" d="M15 10a3 3 0 1 1-6 0a3 3 0 0 1 6 0Z"/></g></svg> </div>
            <p className="text-gray-700 font-medium">San Francisco Office</p>
            <p className="text-gray-600 text-sm">123 Tech Street</p>
          </div>
        </div>
        
        {/* Map Controls */}
        <div className="absolute bottom-4 right-4">
          <button
            onClick={openMap}
            className="bg-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition"
          >
            Open Map
          </button>
        </div>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl mb-2">🅿️</div>
            <p className="text-sm text-gray-600">Free Parking</p>
          </div>
          <div>
            <div className="text-2xl mb-2">🚇</div>
            <p className="text-sm text-gray-600">Near Metro</p>
          </div>
          <div>
            <div className="text-2xl mb-2">♿</div>
            <p className="text-sm text-gray-600">Accessible</p>
          </div>
        </div>
      </div>
    </div>
  );
}