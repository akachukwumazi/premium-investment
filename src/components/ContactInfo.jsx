// components/ContactInfo.jsx
'use client';

export default function ContactInfo() {
  const contactInfo = [
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 20 20"><path fill="currentColor" d="M19 14.5v-9c0-.83-.67-1.5-1.5-1.5H3.49c-.83 0-1.5.67-1.5 1.5v9c0 .83.67 1.5 1.5 1.5H17.5c.83 0 1.5-.67 1.5-1.5m-1.31-9.11c.33.33.15.67-.03.84L13.6 9.95l3.9 4.06c.12.14.2.36.06.51c-.13.16-.43.15-.56.05l-4.37-3.73l-2.14 1.95l-2.13-1.95l-4.37 3.73c-.13.1-.43.11-.56-.05c-.14-.15-.06-.37.06-.51l3.9-4.06l-4.06-3.72c-.18-.17-.36-.51-.03-.84s.67-.17.95.07l6.24 5.04l6.25-5.04c.28-.24.62-.4.95-.07"/></svg>,
      title: 'Email',
      info: 'support@example.com',
      action: () => window.location.href = 'mailto:support@example.com',
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24"><path fill="currentColor" d="M19.95 21q-3.125 0-6.175-1.362t-5.55-3.863t-3.862-5.55T3 4.05q0-.45.3-.75t.75-.3H8.1q.35 0 .625.238t.325.562l.65 3.5q.05.4-.025.675T9.4 8.45L6.975 10.9q.5.925 1.187 1.787t1.513 1.663q.775.775 1.625 1.438T13.1 17l2.35-2.35q.225-.225.588-.337t.712-.063l3.45.7q.35.1.575.363T21 15.9v4.05q0 .45-.3.75t-.75.3"/></svg>,
      title: 'Phone',
      info: '+1 (555) 123-4567',
      action: () => window.location.href = 'tel:+15551234567',
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24"><g fill="none"><path d="M12 2a8 8 0 0 1 8 8c0 6.5-8 12-8 12s-8-5.5-8-12a8 8 0 0 1 8-8m0 5a3 3 0 1 0 0 6a3 3 0 0 0 0-6" clip-rule="evenodd"/><path stroke="currentColor" stroke-width="2" d="M20 10c0 6.5-8 12-8 12s-8-5.5-8-12a8 8 0 1 1 16 0Z"/><path stroke="currentColor" stroke-width="2" d="M15 10a3 3 0 1 1-6 0a3 3 0 0 1 6 0Z"/></g></svg>,
      title: 'Address',
      info: '123 Tech Street, San Francisco, CA',
      action: () => window.open('https://maps.google.com', '_blank'),
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M145.61 464h220.78c19.8 0 35.55-16.29 33.42-35.06C386.06 308 304 310 304 256s83.11-51 95.8-172.94c2-18.78-13.61-35.06-33.41-35.06H145.61c-19.8 0-35.37 16.28-33.41 35.06C124.89 205 208 201 208 256s-82.06 52-95.8 172.94c-2.14 18.77 13.61 35.06 33.41 35.06"/><path fill="currentColor" d="M343.3 432H169.13c-15.6 0-20-18-9.06-29.16C186.55 376 240 356.78 240 326V224c0-19.85-38-35-61.51-67.2c-3.88-5.31-3.49-12.8 6.37-12.8h142.73c8.41 0 10.23 7.43 6.4 12.75C310.82 189 272 204.05 272 224v102c0 30.53 55.71 47 80.4 76.87c9.95 12.04 6.47 29.13-9.1 29.13"/></svg>,
      title: 'Hours',
      info: 'Mon-Fri: 9AM-6PM PST',
      action: null,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6">Contact Information</h3>
        
        <div className="space-y-4">
          {contactInfo.map((item, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="text-2xl">{item.icon}</div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800">{item.title}</h4>
                <p className="text-gray-600">{item.info}</p>
                {item.action && (
                  <button
                    onClick={item.action}
                    className="mt-1 text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    {item.title === 'Email' ? 'Send email' : 
                     item.title === 'Phone' ? 'Call now' : 
                     'Get directions'}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t">
          <h4 className="font-semibold text-gray-800 mb-3">Follow Us</h4>
          <div className="flex space-x-4">
            {['Twitter', 'LinkedIn', 'GitHub', 'Instagram'].map((social) => (
              <a
                key={social}
                href="#"
                className="text-gray-600 hover:text-blue-600 transition"
                aria-label={`Follow on ${social}`}
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h4 className="font-bold text-gray-800 mb-2">Quick Response</h4>
        <p className="text-gray-600 text-sm">
          We typically respond to all inquiries within 24 hours during business days.
        </p>
      </div>
    </div>
  );
}