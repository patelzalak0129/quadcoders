"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const [userItems, setUserItems] = useState([])
  const [userSwaps, setUserSwaps] = useState([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/login")
      return
    }

    const parsedUser = JSON.parse(userData)
    setUser(parsedUser)
    fetchUserData(parsedUser.id)
  }, [router])

  const fetchUserData = async (userId) => {
    try {
      // Fetch user items
      const itemsResponse = await fetch(`/api/users/${userId}/items`)
      const itemsData = await itemsResponse.json()
      setUserItems(itemsData)

      // Fetch user swaps
      const swapsResponse = await fetch(`/api/users/${userId}/swaps`)
      const swapsData = await swapsResponse.json()
      setUserSwaps(swapsData)
    } catch (error) {
      console.error("Error fetching user data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/")
  }

  if (loading) {
    return <div className="loading">Loading...</div>
  }

  if (!user) {
    return null
  }

  return (
    <div className="dashboard">
      <style jsx>{`
        .dashboard {
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

        .logout-btn {
          background: #ef4444;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.3s;
        }

        .logout-btn:hover {
          background: #dc2626;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
        }

        .welcome-section {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 3rem;
          border-radius: 20px;
          margin-bottom: 2rem;
          text-align: center;
        }

        .welcome-section h1 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }

        .points-display {
          font-size: 1.5rem;
          background: rgba(255,255,255,0.2);
          padding: 1rem 2rem;
          border-radius: 50px;
          display: inline-block;
          margin-top: 1rem;
        }

        .dashboard-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
          margin-bottom: 2rem;
        }

        .dashboard-card {
          background: white;
          padding: 2rem;
          border-radius: 15px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }

        .card-header {
          display: flex;
          justify-content: between;
          align-items: center;
          margin-bottom: 1.5rem;
          border-bottom: 2px solid #f1f5f9;
          padding-bottom: 1rem;
        }

        .card-title {
          font-size: 1.5rem;
          font-weight: bold;
          color: #333;
        }

        .add-btn {
          background: #10b981;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          text-decoration: none;
          font-size: 0.9rem;
          transition: background 0.3s;
        }

        .add-btn:hover {
          background: #059669;
        }

        .item-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .item-card {
          display: flex;
          gap: 1rem;
          padding: 1rem;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          transition: transform 0.2s;
        }

        .item-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }

        .item-image {
          width: 80px;
          height: 80px;
          object-fit: cover;
          border-radius: 8px;
        }

        .item-info {
          flex: 1;
        }

        .item-title {
          font-weight: bold;
          color: #333;
          margin-bottom: 0.5rem;
        }

        .item-details {
          color: #666;
          font-size: 0.9rem;
        }

        .status-badge {
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: bold;
          text-transform: uppercase;
        }

        .status-available {
          background: #dcfce7;
          color: #166534;
        }

        .status-pending {
          background: #fef3c7;
          color: #92400e;
        }

        .status-swapped {
          background: #dbeafe;
          color: #1e40af;
        }

        .empty-state {
          text-align: center;
          color: #666;
          padding: 2rem;
        }

        .empty-state-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .swap-card {
          padding: 1rem;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          margin-bottom: 1rem;
        }

        .swap-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
        }

        .swap-title {
          font-weight: bold;
          color: #333;
        }

        .swap-details {
          color: #666;
          font-size: 0.9rem;
        }

        .loading {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          font-size: 1.2rem;
          color: #666;
        }

        @media (max-width: 768px) {
          .dashboard-grid {
            grid-template-columns: 1fr;
          }
          
          .welcome-section h1 {
            font-size: 2rem;
          }
          
          .container {
            padding: 1rem;
          }
        }
      `}</style>

      <header className="header">
        <div className="logo">ReWear</div>
        <nav className="nav-links">
          <Link href="/browse">Browse</Link>
          <Link href="/add-item">Add Item</Link>
          {user.isAdmin && <Link href="/admin">Admin</Link>}
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </nav>
      </header>

      <div className="container">
        <section className="welcome-section">
          <h1>Welcome back, {user.name}!</h1>
          <p>Ready to swap some amazing clothes today?</p>
          <div className="points-display">⭐ {user.points} Points Available</div>
        </section>

        <div className="dashboard-grid">
          <div className="dashboard-card">
            <div className="card-header">
              <h2 className="card-title">My Items ({userItems.length})</h2>
              <Link href="/add-item" className="add-btn">
                + Add Item
              </Link>
            </div>

            {userItems.length > 0 ? (
              <div className="item-list">
                {userItems.slice(0, 3).map((item) => (
                  <div key={item.id} className="item-card">
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
                      <div className="item-title">{item.title}</div>
                      <div className="item-details">
                        Size: {item.size} | Condition: {item.condition}
                      </div>
                      <div className={`status-badge status-${item.status}`}>{item.status}</div>
                    </div>
                  </div>
                ))}
                {userItems.length > 3 && (
                  <div style={{ textAlign: "center", marginTop: "1rem" }}>
                    <Link href="/my-items" style={{ color: "#667eea", textDecoration: "none" }}>
                      View all {userItems.length} items →
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-state-icon">👕</div>
                <p>No items listed yet</p>
                <Link href="/add-item" className="add-btn">
                  List your first item
                </Link>
              </div>
            )}
          </div>

          <div className="dashboard-card">
            <div className="card-header">
              <h2 className="card-title">Recent Swaps ({userSwaps.length})</h2>
            </div>

            {userSwaps.length > 0 ? (
              <div className="item-list">
                {userSwaps.slice(0, 3).map((swap) => (
                  <div key={swap.id} className="swap-card">
                    <div className="swap-header">
                      <div className="swap-title">Swap Request</div>
                      <div className={`status-badge status-${swap.status}`}>{swap.status}</div>
                    </div>
                    <div className="swap-details">Item: {swap.item_title || "Unknown Item"}</div>
                    <div className="swap-details">
                      {swap.points_offered > 0 ? `${swap.points_offered} points offered` : "Item swap"}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-state-icon">🔄</div>
                <p>No swaps yet</p>
                <Link href="/browse" className="add-btn">
                  Start browsing
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
