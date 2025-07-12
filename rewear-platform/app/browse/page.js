"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

export default function BrowsePage() {
  const [items, setItems] = useState([])
  const [filteredItems, setFilteredItems] = useState([])
  const [filters, setFilters] = useState({
    category: "",
    size: "",
    condition: "",
    search: "",
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchItems()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [items, filters])

  const fetchItems = async () => {
    try {
      const response = await fetch("/api/items")
      const data = await response.json()
      setItems(data)
    } catch (error) {
      console.error("Error fetching items:", error)
    } finally {
      setLoading(false)
    }
  }

  const applyFilters = () => {
    let filtered = items

    if (filters.search) {
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(filters.search.toLowerCase()) ||
          item.description.toLowerCase().includes(filters.search.toLowerCase()) ||
          (item.tags && item.tags.toLowerCase().includes(filters.search.toLowerCase())),
      )
    }

    if (filters.category) {
      filtered = filtered.filter((item) => item.category === filters.category)
    }

    if (filters.size) {
      filtered = filtered.filter((item) => item.size === filters.size)
    }

    if (filters.condition) {
      filtered = filtered.filter((item) => item.condition === filters.condition)
    }

    setFilteredItems(filtered)
  }

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const clearFilters = () => {
    setFilters({
      category: "",
      size: "",
      condition: "",
      search: "",
    })
  }

  if (loading) {
    return <div className="loading">Loading items...</div>
  }

  return (
    <div className="browse-page">
      <style jsx>{`
        .browse-page {
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
          max-width: 1400px;
          margin: 0 auto;
          padding: 2rem;
        }

        .page-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .page-title {
          font-size: 3rem;
          color: #333;
          margin-bottom: 1rem;
        }

        .page-subtitle {
          font-size: 1.2rem;
          color: #666;
        }

        .filters-section {
          background: white;
          padding: 2rem;
          border-radius: 15px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          margin-bottom: 2rem;
        }

        .filters-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr auto;
          gap: 1rem;
          align-items: end;
        }

        .filter-group {
          display: flex;
          flex-direction: column;
        }

        .filter-group label {
          margin-bottom: 0.5rem;
          font-weight: 500;
          color: #333;
        }

        .filter-group input,
        .filter-group select {
          padding: 0.75rem;
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          font-size: 1rem;
          transition: border-color 0.3s;
        }

        .filter-group input:focus,
        .filter-group select:focus {
          outline: none;
          border-color: #667eea;
        }

        .clear-filters-btn {
          background: #ef4444;
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          cursor: pointer;
          font-size: 1rem;
          transition: background 0.3s;
        }

        .clear-filters-btn:hover {
          background: #dc2626;
        }

        .results-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .results-count {
          font-size: 1.1rem;
          color: #666;
        }

        .items-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2rem;
        }

        .item-card {
          background: white;
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          transition: transform 0.3s, box-shadow 0.3s;
          cursor: pointer;
        }

        .item-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.15);
        }

        .item-image {
          width: 100%;
          height: 250px;
          object-fit: cover;
        }

        .item-content {
          padding: 1.5rem;
        }

        .item-title {
          font-size: 1.3rem;
          font-weight: bold;
          color: #333;
          margin-bottom: 0.5rem;
        }

        .item-description {
          color: #666;
          margin-bottom: 1rem;
          line-height: 1.5;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .item-details {
          display: flex;
          justify-content: space-between;
          margin-bottom: 1rem;
          font-size: 0.9rem;
          color: #666;
        }

        .item-tags {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
          margin-bottom: 1rem;
        }

        .tag {
          background: #e0e7ff;
          color: #3730a3;
          padding: 0.25rem 0.75rem;
          border-radius: 15px;
          font-size: 0.8rem;
        }

        .item-actions {
          display: flex;
          gap: 0.5rem;
        }

        .action-btn {
          flex: 1;
          padding: 0.75rem;
          border: none;
          border-radius: 8px;
          font-weight: bold;
          cursor: pointer;
          transition: background 0.3s;
          text-decoration: none;
          text-align: center;
          font-size: 0.9rem;
        }

        .swap-btn {
          background: #10b981;
          color: white;
        }

        .swap-btn:hover {
          background: #059669;
        }

        .points-btn {
          background: #f59e0b;
          color: white;
        }

        .points-btn:hover {
          background: #d97706;
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
          .filters-grid {
            grid-template-columns: 1fr;
          }
          
          .items-grid {
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 1rem;
          }
          
          .page-title {
            font-size: 2rem;
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
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/add-item">Add Item</Link>
          <Link href="/login">Login</Link>
        </nav>
      </header>

      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Browse Items</h1>
          <p className="page-subtitle">Discover amazing pre-loved clothing from our community</p>
        </div>

        <div className="filters-section">
          <div className="filters-grid">
            <div className="filter-group">
              <label>Search</label>
              <input
                type="text"
                placeholder="Search items..."
                value={filters.search}
                onChange={(e) => handleFilterChange("search", e.target.value)}
              />
            </div>

            <div className="filter-group">
              <label>Category</label>
              <select value={filters.category} onChange={(e) => handleFilterChange("category", e.target.value)}>
                <option value="">All Categories</option>
                <option value="Outerwear">Outerwear</option>
                <option value="Dresses">Dresses</option>
                <option value="Footwear">Footwear</option>
                <option value="Accessories">Accessories</option>
                <option value="Tops">Tops</option>
                <option value="Bottoms">Bottoms</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Size</label>
              <select value={filters.size} onChange={(e) => handleFilterChange("size", e.target.value)}>
                <option value="">All Sizes</option>
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="XXL">XXL</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Condition</label>
              <select value={filters.condition} onChange={(e) => handleFilterChange("condition", e.target.value)}>
                <option value="">All Conditions</option>
                <option value="Like New">Like New</option>
                <option value="Excellent">Excellent</option>
                <option value="Good">Good</option>
                <option value="Fair">Fair</option>
              </select>
            </div>

            <button onClick={clearFilters} className="clear-filters-btn">
              Clear Filters
            </button>
          </div>
        </div>

        <div className="results-header">
          <div className="results-count">
            {filteredItems.length} item{filteredItems.length !== 1 ? "s" : ""} found
          </div>
        </div>

        {filteredItems.length > 0 ? (
          <div className="items-grid">
            {filteredItems.map((item) => (
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
                <div className="item-content">
                  <h3 className="item-title">{item.title}</h3>
                  <p className="item-description">{item.description}</p>

                  <div className="item-details">
                    <span>Size: {item.size}</span>
                    <span>Condition: {item.condition}</span>
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

                  <div className="item-actions">
                    <Link href={`/item/${item.id}`} className="action-btn swap-btn">
                      View Details
                    </Link>
                    <Link href={`/item/${item.id}?action=points`} className="action-btn points-btn">
                      Use Points
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon">🔍</div>
            <h3>No items found</h3>
            <p>Try adjusting your filters or search terms</p>
          </div>
        )}
      </div>
    </div>
  )
}
