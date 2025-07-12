"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function AdminPage() {
  const [user, setUser] = useState(null)
  const [pendingItems, setPendingItems] = useState([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/login")
      return
    }

    const parsedUser = JSON.parse(userData)
    if (!parsedUser.isAdmin) {
      router.push("/dashboard")
      return
    }

    setUser(parsedUser)
    fetchPendingItems()
  }, [router])

  const fetchPendingItems = async () => {
    try {
      const response = await fetch("/api/admin/pending-items")
      const data = await response.json()
      setPendingItems(data)
    } catch (error) {
      console.error("Error fetching pending items:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleApproval = async (itemId, approved) => {
    try {
      const response = await fetch(`/api/admin/items/${itemId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ approved }),
      })

      if (response.ok) {
        setPendingItems(pendingItems.filter((item) => item.id !== itemId))
        alert(`Item ${approved ? "approved" : "rejected"} successfully`)
      }
    } catch (error) {
      console.error("Error updating item:", error)
      alert("Error updating item")
    }
  }

  if (loading) {
    return <div className="loading">Loading...</div>
  }

  if (!user || !user.isAdmin) {
    return null
  }

  return (
    <div className="admin-page">
      <style jsx>{`
        .admin-page {
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

        .page-header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 3rem;
          border-radius: 20px;
          margin-bottom: 2rem;
          text-align: center;
        }

        .page-title {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
          margin-bottom: 3rem;
        }

        .stat-card {
          background: white;
          padding: 2rem;
          border-radius: 15px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          text-align: center;
        }

        .stat-number {
          font-size: 2.5rem;
          font-weight: bold;
          color: #667eea;
          margin-bottom: 0.5rem;
        }

        .stat-label {
          color: #666;
          font-weight: 500;
        }

        .section-title {
          font-size: 1.8rem;
          color: #333;
          margin-bottom: 2rem;
        }

        .items-grid {
          display: grid;
          gap: 2rem;
        }

        .item-card {
          background: white;
          border-radius: 15px;
          padding: 2rem;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          display: grid;
          grid-template-columns: 150px 1fr auto;
          gap: 2rem;
          align-items: center;
        }

        .item-image {
          width: 150px;
          height: 150px;
          object-fit: cover;
          border-radius: 10px;
        }

        .item-info h3 {
          font-size: 1.3rem;
          color: #333;
          margin-bottom: 0.5rem;
        }

        .item-info p {
          color: #666;
          margin-bottom: 1rem;
          line-height: 1.5;
        }

        .item-details {
          display: flex;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .detail-badge {
          background: #f1f5f9;
          color: #4a5568;
          padding: 0.25rem 0.75rem;
          border-radius: 15px;
          font-size: 0.8rem;
        }

        .item-actions {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .action-btn {
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 8px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s;
          font-size: 0.9rem;
        }

        .approve-btn {
          background: #10b981;
          color: white;
        }

        .approve-btn:hover {
          background: #059669;
        }

        .reject-btn {
          background: #ef4444;
          color: white;
        }

        .reject-btn:hover {
          background: #dc2626;
        }

        .empty-state {
          text-align: center;
          padding: 4rem 2rem;
          color: #666;
        }

        .empty-state-icon {
          font-size: 4rem;
          margin-bottom: 1rem;
        }

        .loading {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 50vh;
          font-size: 1.2rem;
          color: #666;
        }

        @media (max-width: 768px) {
          .item-card {
            grid-template-columns: 1fr;
            text-align: center;
          }
          
          .item-actions {
            flex-direction: row;
            justify-content: center;
          }
          
          .container {
            padding: 1rem;
          }
        }
      `}</style>

      <header className="header">
        <Link href="/" className="logo">
          ReWear Admin
        </Link>
        <nav className="nav-links">
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/browse">Browse</Link>
        </nav>
      </header>

      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Admin Panel</h1>
          <p>Manage and moderate community listings</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">{pendingItems.length}</div>
            <div className="stat-label">Pending Approval</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">24</div>
            <div className="stat-label">Total Items</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">156</div>
            <div className="stat-label">Active Users</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">89</div>
            <div className="stat-label">Completed Swaps</div>
          </div>
        </div>

        <h2 className="section-title">Items Pending Approval</h2>

        {pendingItems.length > 0 ? (
          <div className="items-grid">
            {pendingItems.map((item) => (
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
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <div className="item-details">
                    <span className="detail-badge">{item.category}</span>
                    <span className="detail-badge">Size: {item.size}</span>
                    <span className="detail-badge">{item.condition}</span>
                  </div>
                  {item.tags && (
                    <div className="item-details">
                      {item.tags.split(",").map((tag, index) => (
                        <span key={index} className="detail-badge">
                          {tag.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="item-actions">
                  <button className="action-btn approve-btn" onClick={() => handleApproval(item.id, true)}>
                    ✓ Approve
                  </button>
                  <button className="action-btn reject-btn" onClick={() => handleApproval(item.id, false)}>
                    ✗ Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon">✅</div>
            <h3>All caught up!</h3>
            <p>No items pending approval at the moment.</p>
          </div>
        )}
      </div>
    </div>
  )
}
