"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

export default function LandingPage() {
  const [featuredItems, setFeaturedItems] = useState([])
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    fetchFeaturedItems()
  }, [])

  const fetchFeaturedItems = async () => {
    try {
      const response = await fetch("/api/items/featured")
      const data = await response.json()
      setFeaturedItems(data)
    } catch (error) {
      console.error("Error fetching featured items:", error)
    }
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredItems.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredItems.length) % featuredItems.length)
  }

  useEffect(() => {
    if (featuredItems.length > 0) {
      const interval = setInterval(nextSlide, 5000)
      return () => clearInterval(interval)
    }
  }, [featuredItems])

  return (
    <div className="landing-page">
      <style jsx>{`
        .landing-page {
          font-family: 'Arial', sans-serif;
          margin: 0;
          padding: 0;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
        }

        .header {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          padding: 1rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .logo {
          font-size: 2rem;
          font-weight: bold;
          color: white;
          text-decoration: none;
        }

        .nav-links {
          display: flex;
          gap: 2rem;
        }

        .nav-links a {
          color: white;
          text-decoration: none;
          padding: 0.5rem 1rem;
          border-radius: 25px;
          transition: background 0.3s;
        }

        .nav-links a:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        .hero {
          text-align: center;
          padding: 4rem 2rem;
          color: white;
        }

        .hero h1 {
          font-size: 3.5rem;
          margin-bottom: 1rem;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }

        .hero p {
          font-size: 1.2rem;
          margin-bottom: 2rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .cta-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .cta-button {
          padding: 1rem 2rem;
          border: none;
          border-radius: 50px;
          font-size: 1.1rem;
          font-weight: bold;
          text-decoration: none;
          transition: transform 0.3s, box-shadow 0.3s;
          cursor: pointer;
        }

        .cta-button.primary {
          background: #ff6b6b;
          color: white;
        }

        .cta-button.secondary {
          background: white;
          color: #667eea;
        }

        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.2);
        }

        .featured-section {
          background: white;
          padding: 4rem 2rem;
          margin-top: 2rem;
        }

        .featured-title {
          text-align: center;
          font-size: 2.5rem;
          color: #333;
          margin-bottom: 3rem;
        }

        .carousel-container {
          position: relative;
          max-width: 1200px;
          margin: 0 auto;
          overflow: hidden;
          border-radius: 20px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }

        .carousel {
          display: flex;
          transition: transform 0.5s ease;
          transform: translateX(-${currentSlide * 100}%);
        }

        .carousel-item {
          min-width: 100%;
          display: flex;
          background: linear-gradient(45deg, #f093fb 0%, #f5576c 100%);
          color: white;
          padding: 3rem;
          align-items: center;
          gap: 3rem;
        }

        .carousel-item:nth-child(even) {
          background: linear-gradient(45deg, #4facfe 0%, #00f2fe 100%);
        }

        .item-image {
          width: 300px;
          height: 300px;
          object-fit: cover;
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }

        .item-info h3 {
          font-size: 2rem;
          margin-bottom: 1rem;
        }

        .item-info p {
          font-size: 1.1rem;
          line-height: 1.6;
          margin-bottom: 1rem;
        }

        .item-tags {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
          margin-bottom: 1rem;
        }

        .tag {
          background: rgba(255,255,255,0.2);
          padding: 0.3rem 0.8rem;
          border-radius: 15px;
          font-size: 0.9rem;
        }

        .carousel-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255,255,255,0.8);
          border: none;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          cursor: pointer;
          font-size: 1.5rem;
          transition: background 0.3s;
        }

        .carousel-nav:hover {
          background: white;
        }

        .carousel-nav.prev {
          left: 20px;
        }

        .carousel-nav.next {
          right: 20px;
        }

        .carousel-dots {
          display: flex;
          justify-content: center;
          gap: 0.5rem;
          margin-top: 2rem;
        }

        .dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #ddd;
          cursor: pointer;
          transition: background 0.3s;
        }

        .dot.active {
          background: #667eea;
        }

        .features {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          max-width: 1200px;
          margin: 4rem auto;
          padding: 0 2rem;
        }

        .feature-card {
          background: white;
          padding: 2rem;
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          text-align: center;
          transition: transform 0.3s;
        }

        .feature-card:hover {
          transform: translateY(-5px);
        }

        .feature-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .feature-card h3 {
          color: #333;
          margin-bottom: 1rem;
        }

        .feature-card p {
          color: #666;
          line-height: 1.6;
        }

        @media (max-width: 768px) {
          .hero h1 {
            font-size: 2.5rem;
          }
          
          .cta-buttons {
            flex-direction: column;
            align-items: center;
          }
          
          .carousel-item {
            flex-direction: column;
            text-align: center;
            padding: 2rem;
          }
          
          .item-image {
            width: 250px;
            height: 250px;
          }
        }
      `}</style>

      <header className="header">
        <Link href="/" className="logo">
          ReWear
        </Link>
        <nav className="nav-links">
          <Link href="/browse">Browse</Link>
          <Link href="/login">Login</Link>
          <Link href="/signup">Sign Up</Link>
        </nav>
      </header>

      <section className="hero">
        <h1>Sustainable Fashion Starts Here</h1>
        <p>
          Join our community of eco-conscious fashion lovers. Exchange, swap, and discover pre-loved clothing while
          reducing textile waste.
        </p>
        <div className="cta-buttons">
          <Link href="/signup" className="cta-button primary">
            Start Swapping
          </Link>
          <Link href="/browse" className="cta-button secondary">
            Browse Items
          </Link>
          <Link href="/add-item" className="cta-button secondary">
            List an Item
          </Link>
        </div>
      </section>

      <section className="featured-section">
        <h2 className="featured-title">Featured Items</h2>

        {featuredItems.length > 0 && (
          <div className="carousel-container">
            <div className="carousel">
              {featuredItems.map((item, index) => (
                <div key={item.id} className="carousel-item">
                  <img
                    src={
                      JSON.parse(
                        item.images || '["https://images.unsplash.com/photo-1445205170230-053b83016050?w=400"]',
                      )[0]
                    }
                    alt={item.title}
                    className="item-image"
                  />
                  <div className="item-info">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <div className="item-tags">
                      {item.tags &&
                        item.tags.split(",").map((tag, i) => (
                          <span key={i} className="tag">
                            {tag.trim()}
                          </span>
                        ))}
                    </div>
                    <p>
                      <strong>Size:</strong> {item.size} | <strong>Condition:</strong> {item.condition}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {featuredItems.length > 1 && (
              <>
                <button className="carousel-nav prev" onClick={prevSlide}>
                  ‹
                </button>
                <button className="carousel-nav next" onClick={nextSlide}>
                  ›
                </button>

                <div className="carousel-dots">
                  {featuredItems.map((_, index) => (
                    <div
                      key={index}
                      className={`dot ${index === currentSlide ? "active" : ""}`}
                      onClick={() => setCurrentSlide(index)}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </section>

      <section className="features">
        <div className="feature-card">
          <div className="feature-icon">🔄</div>
          <h3>Easy Swapping</h3>
          <p>Exchange your unused clothes directly with other community members through our simple swap system.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">⭐</div>
          <h3>Points System</h3>
          <p>Earn points by listing items and use them to redeem clothes you love. Fair and transparent.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🌱</div>
          <h3>Eco-Friendly</h3>
          <p>Reduce textile waste and promote sustainable fashion by giving clothes a second life.</p>
        </div>
      </section>
    </div>
  )
}
