
// footer.js


n
import React from 'react';

const Footer = () => {
  return (

    <footer className="bg-gray-800 text-gray-400 py-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <h1 className="text-lg font-semibold text-gray-100">Khaana Khajana</h1>
          <p className="text-sm">© 2024 All rights reserved.</p>
        </div>
        <div className="flex space-x-4">
          <a href="#" className="hover:text-gray-300">About Us</a>
          <a href="#" className="hover:text-gray-300">Contact</a>
          <a href="#" className="hover:text-gray-300">Privacy Policy</a>
        </div>
      </div>

    <footer style={{ height: '30vh', backgroundColor: '#f8f9fa', padding: '20px', textAlign: 'center' }}>
      <h2>Recipe Sharing Footer</h2>
      <p>Connect with us on social media!</p>
      <p>&copy; {new Date().getFullYear()} Recipe Sharing Website</p>

    </footer>
  );
};



export default Footer;

