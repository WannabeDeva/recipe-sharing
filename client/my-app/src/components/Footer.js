import React from 'react';

const Footer = () => {
  return (
    <footer style={{ height: '30vh', backgroundColor: '#f8f9fa', padding: '20px', textAlign: 'center' }}>
      <h2>Recipe Sharing Footer</h2>
      <p>Connect with us on social media!</p>
      <p>&copy; {new Date().getFullYear()} Recipe Sharing Website</p>
    </footer>
  );
};

export default Footer;