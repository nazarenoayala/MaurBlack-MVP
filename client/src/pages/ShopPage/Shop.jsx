import React from 'react';
import './shop.css';

const Shop = () => {
  const categories = [
    {
      id: 1,
      name: "BOOKS",
      image: "https://res.cloudinary.com/ddzvaugox/image/upload/v1772262314/PIN---7_bzms5w.jpg",
      url: "https://maurblack.bigcartel.com/category/books"
    },
    {
      id: 2,
      name: "PRINTS",
      image: "https://res.cloudinary.com/ddzvaugox/image/upload/v1772262313/DSC08802_pqhmvr.jpg",
      url: "https://maurblack.bigcartel.com/category/prints"
    },
    {
      id: 3,
      name: "ORIGINALS",
      image: "https://res.cloudinary.com/ddzvaugox/image/upload/v1772262314/IMG_5834_arex0r.jpg",
      url: "https://maurblack.bigcartel.com/products"
    }
  ];

  return (
    <main className="shop-page">
      <div className="shop-header">
        <span className="shop-subtitle">CURATED GOODS</span>
        <h1 className="shop-title">OFFICIAL SHOP</h1>
      </div>

      <div className="shop-grid">
        {categories.map(cat => (
          <a 
            key={cat.id} 
            href={cat.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="shop-card"
          >
            <div className="shop-card-image" style={{ backgroundImage: `url(${cat.image})` }}>
              <div className="shop-card-overlay">
                <h2>{cat.name}</h2>
                <span className="shop-link-text">VIEW COLLECTION —</span>
              </div>
            </div>
          </a>
        ))}
      </div>

      <p className="shop-footer-notice">
        SECURE CHECKOUT POWERED BY BIG CARTEL
      </p>
    </main>
  );
};

export default Shop;