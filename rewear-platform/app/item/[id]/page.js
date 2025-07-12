"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function ItemDetailPage({ params }) {
  const [item, setItem] = useState(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [user, setUser] = useState(null)
  const [showSwapModal, setShowSwapModal] = useState(false)
  const [swapType, setSwapType] = useState("points") // 'points' or 'item'
  const [pointsOffer, setPointsOffer] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    }
    fetchItem()
  }, [params.id])

  const fetchItem = async () => {
    try {
      const response = await fetch(`/api/items/${params.id}`)
      const data = await response.json()
      setItem(data)
    } catch (error) {
      console.error("Error fetching item:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSwapRequest = async () => {
    if (!user) {
      router.push("/login")
      return
    }

    try {
      const response = await fetch("/api/swaps", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          requester_id: user.id,
          owner_id: item.user_id,
          item_id: item.id,
          points_offered: swapType === "points" ? Number.parseInt(pointsOffer) : 0,
          message: message,
        }),
      })

      if (response.ok) {
        alert("Swap request sent successfully!")
        setShowSwapModal(false)
      } else {
        alert("Failed to send swap request")
      }
    } catch (error) {
      console.error("Error sending swap request:", error)
      alert("Error sending swap request")
    }
  }

  if (loading) {
    return <div className="loading">Loading item...</div>
  }

  if (!item) {
    return <div className="error">Item not found</div>
  }

  const images = JSON.parse(item.images || '["https://images.unsplash.com/photo-1445205170230-053b83016050?w=400"]')

  return (
    <div className="item-detail-page">
      <style jsx>{`
        .item-detail-page {
          min-height: 100vh;
          background: #f8fafc;
          font-family: Arial, sans-serif;
        }

        .header {
          background: white;
          padding: 1rem 2rem;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo {
          font-size: 1.8rem;
          font-weight: bold;
          color: #667eea;
          text-decoration: none;
        }

        .nav-links {
          display: flex;
          gap: 2rem;
          align-items: center;
        }

        .nav-links a {
          color: #333;
          text-decoration: none;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          transition: background 0.3s;
        }

        .nav-links a:hover {
          background: #f1f5f9;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
        }

        .back-link {
          margin-bottom: 2rem;
        }

        .back-link a {
          color: #667eea;
          text-decoration: none;
          font-weight: 500;
        }

        .back-link a:hover {
          text-decoration: underline;
        }

        .item-detail {
          background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }

        .item-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          padding: 3rem;
        }

        .image-gallery {
          position: relative;
        }

        .main-image {
          width: 100%;
          height: 500px;
          object-fit: cover;
          border-radius: 15px;
          margin-bottom: 1rem;
        }

        .thumbnail-list {
          display: flex;
          gap: 0.5rem;
          overflow-x: auto;
        }

        .thumbnail {
          width: 80px;
          height: 80px;
          object-fit: cover;
          border-radius: 8px;
          cursor: pointer;
          opacity: 0.7;
          transition: opacity 0.3s;
        }

        .thumbnail.active {
          opacity: 1;
          border: 3px solid #667eea;
        }

        .thumbnail:hover {
          opacity: 1;
        }

        .item-info {
          display: flex;
          flex-direction: column;
        }

        .item-title {
          font-size: 2.5rem;
          font-weight: bold;
          color: #333;
          margin-bottom: 1rem;
        }

        .item-description {
          font-size: 1.1rem;
          color: #666;
          line-height: 1.6;
          margin-bottom: 2rem;
        }

        .item-details-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .detail-item {
          background: #f8fafc;
          padding: 1rem;
          border-radius: 10px;
        }

        .detail-label {
          font-weight: bold;
          color: #333;
          margin-bottom: 0.5rem;
        }

        .detail-value {
          color: #666;
        }

        .item-tags {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
          margin-bottom: 2rem;
        }

        .tag {
          background: #e0e7ff;
          color: #3730a3;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.9rem;
        }

        .action-buttons {
          display: flex;
          gap: 1rem;
          margin-top: auto;
        }

        .action-btn {
          flex: 1;
          padding: 1rem 2rem;
          border: none;
          border-radius: 10px;
          font-size: 1.1rem;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s;
          text-decoration: none;
          text-align: center;
        }

        .swap-btn {
          background: #10b981;
          color: white;
        }

        .swap-btn:hover {
          background: #059669;
          transform: translateY(-2px);
        }

        .points-btn {
          background: #f59e0b;
          color: white;
        }

        .points-btn:hover {
          background: #d97706;
          transform: translateY(-2px);
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .modal {
          background: white;
          padding: 2rem;
          border-radius: 15px;
          width: 90%;
          max-width: 500px;
          max-height: 90vh;
          overflow-y: auto;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .modal-title {
          font-size: 1.5rem;
          font-weight: bold;
          color: #333;
        }

        .close-btn {
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          color: #666;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
          color: #333;
        }

        .form-group input,
        .form-group textarea,
        .form-group select {
          width: 100%;
          padding: 0.75rem;
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          font-size: 1rem;
          transition: border-color 0.3s;
          box-sizing: border-box;
        }

        .form-group input:focus,
        .form-group textarea:focus,
        .form-group select:focus {
          outline: none;
          border-color: #667eea;
        }

        .form-group textarea {
          resize: vertical;
          min-height: 100px;
        }

        .radio-group {
          display: flex;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .radio-option {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .submit-btn {
          width: 100%;
          padding: 1rem;
          background: #667eea;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1.1rem;
          font-weight: bold;
          cursor: pointer;
          transition: background 0.3s;
        }

        .submit-btn:hover {
          background: #5a67d8;
        }

        .loading, .error {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 50vh;
          font-size: 1.2rem;
          color: #666;
        }

        @media (max-width: 768px) {
          .item-content {
            grid-template-columns: 1fr;
            gap: 2rem;
            padding: 2rem;
          }
          
          .item-title {
            font-size: 2rem;
          }
          
          .action-buttons {
            flex-direction: column;
          }
          
          .container {
            padding: 1rem;
          }
        }
      `}</style>

      <header className="header">
        <Link href="/" className="logo">
          ReWear
        </Link>
        <nav className="nav-links">
          <Link href="/browse">Browse</Link>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/add-item">Add Item</Link>
        </nav>
      </header>

      <div className="container">
        <div className="back-link">
          <Link href="/browse">← Back to Browse</Link>
        </div>

        <div className="item-detail">
          <div className="item-content">
            <div className="image-gallery">
              <img src={images[currentImageIndex] || "/placeholder.svg"} alt={item.title} className="main-image" />
              {images.length > 1 && (
                <div className="thumbnail-list">
                  {images.map((image, index) => (
                    <img
                      key={index}
                      src={image || "/placeholder.svg"}
                      alt={`${item.title} ${index + 1}`}
                      className={`thumbnail ${index === currentImageIndex ? "active" : ""}`}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="item-info">
              <h1 className="item-title">{item.title}</h1>
              <p className="item-description">{item.description}</p>

              <div className="item-details-grid">
                <div className="detail-item">
                  <div className="detail-label">Category</div>
                  <div className="detail-value">{item.category}</div>
                </div>
                <div className="detail-item">
                  <div className="detail-label">Size</div>
                  <div className="detail-value">{item.size}</div>
                </div>
                <div className="detail-item">
                  <div className="detail-label">Condition</div>
                  <div className="detail-value">{item.condition}</div>
                </div>
                <div className="detail-item">
                  <div className="detail-label">Type</div>
                  <div className="detail-value">{item.type}</div>
                </div>
              </div>

              {item.tags && (
                <div className="item-tags">
                  {item.tags.split(",").map((tag, index) => (
                    <span key={index} className="tag">
                      {tag.trim()}
                    </span>
                  ))}
                </div>
              )}

              <div className="action-buttons">
                <button
                  className="action-btn swap-btn"
                  onClick={() => {
                    setSwapType("item")
                    setShowSwapModal(true)
                  }}
                >
                  Request Swap
                </button>
                <button
                  className="action-btn points-btn"
                  onClick={() => {
                    setSwapType("points")
                    setShowSwapModal(true)
                  }}
                >
                  Use Points
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showSwapModal && (
        <div className="modal-overlay" onClick={() => setShowSwapModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">{swapType === "points" ? "Redeem with Points" : "Request Item Swap"}</h2>
              <button className="close-btn" onClick={() => setShowSwapModal(false)}>
                ×
              </button>
            </div>

            <div className="form-group">
              <label>Swap Type</label>
              <div className="radio-group">
                <div className="radio-option">
                  <input
                    type="radio"
                    id="points"
                    name="swapType"
                    value="points"
                    checked={swapType === "points"}
                    onChange={(e) => setSwapType(e.target.value)}
                  />
                  <label htmlFor="points">Use Points</label>
                </div>
                <div className="radio-option">
                  <input
                    type="radio"
                    id="item"
                    name="swapType"
                    value="item"
                    checked={swapType === "item"}
                    onChange={(e) => setSwapType(e.target.value)}
                  />
                  <label htmlFor="item">Item Exchange</label>
                </div>
              </div>
            </div>

            {swapType === "points" && (
              <div className="form-group">
                <label htmlFor="pointsOffer">Points to Offer</label>
                <input
                  type="number"
                  id="pointsOffer"
                  value={pointsOffer}
                  onChange={(e) => setPointsOffer(e.target.value)}
                  placeholder="Enter points amount"
                  min="1"
                  max={user?.points || 0}
                />
                <small>You have {user?.points || 0} points available</small>
              </div>
            )}

            <div className="form-group">
              <label htmlFor="message">Message (Optional)</label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Add a message to the owner..."
              />
            </div>

            <button className="submit-btn" onClick={handleSwapRequest}>
              Send Request
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
