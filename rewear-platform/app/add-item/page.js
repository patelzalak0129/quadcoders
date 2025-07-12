"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function AddItemPage() {
  const [user, setUser] = useState(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    type: "",
    size: "",
    condition: "",
    tags: "",
  })
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/login")
      return
    }
    setUser(JSON.parse(userData))
  }, [router])

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    if (files.length + images.length > 5) {
      setError("Maximum 5 images allowed")
      return
    }

    // In a real app, you'd upload to a cloud service
    // For demo, we'll use placeholder URLs
    const newImages = files.map(
      (file, index) => `https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&sig=${Date.now()}-${index}`,
    )

    setImages([...images, ...newImages])
    setError("")
  }

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    if (images.length === 0) {
      setError("Please add at least one image")
      setLoading(false)
      return
    }

    try {
      const response = await fetch("/api/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          user_id: user.id,
          images: JSON.stringify(images),
        }),
      })

      if (response.ok) {
        alert("Item submitted for approval!")
        router.push("/dashboard")
      } else {
        const data = await response.json()
        setError(data.error || "Failed to add item")
      }
    } catch (error) {
      setError("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return null
  }

  return (
    <div className="add-item-page">
      <style jsx>{`
        .add-item-page {
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
          max-width: 800px;
          margin: 0 auto;
          padding: 2rem;
        }

        .page-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .page-title {
          font-size: 2.5rem;
          color: #333;
          margin-bottom: 1rem;
        }

        .page-subtitle {
          font-size: 1.1rem;
          color: #666;
        }

        .form-container {
          background: white;
          padding: 3rem;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          margin-bottom: 2rem;
        }

        .form-group {
          margin-bottom: 2rem;
        }

        .form-group.full-width {
          grid-column: 1 / -1;
        }

        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 600;
          color: #333;
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
          width: 100%;
          padding: 1rem;
          border: 2px solid #e2e8f0;
          border-radius: 10px;
          font-size: 1rem;
          transition: border-color 0.3s;
          box-sizing: border-box;
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #667eea;
        }

        .form-group textarea {
          resize: vertical;
          min-height: 120px;
        }

        .image-upload-section {
          margin-bottom: 2rem;
        }

        .image-upload-area {
          border: 2px dashed #cbd5e0;
          border-radius: 10px;
          padding: 2rem;
          text-align: center;
          cursor: pointer;
          transition: border-color 0.3s;
          margin-bottom: 1rem;
        }

        .image-upload-area:hover {
          border-color: #667eea;
        }

        .image-upload-area.dragover {
          border-color: #667eea;
          background: #f7fafc;
        }

        .upload-icon {
          font-size: 3rem;
          color: #a0aec0;
          margin-bottom: 1rem;
        }

        .upload-text {
          color: #4a5568;
          margin-bottom: 0.5rem;
        }

        .upload-subtext {
          color: #a0aec0;
          font-size: 0.9rem;
        }

        .image-preview-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
          gap: 1rem;
          margin-top: 1rem;
        }

        .image-preview {
          position: relative;
          aspect-ratio: 1;
          border-radius: 10px;
          overflow: hidden;
        }

        .preview-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .remove-image {
          position: absolute;
          top: 0.5rem;
          right: 0.5rem;
          background: rgba(239, 68, 68, 0.9);
          color: white;
          border: none;
          border-radius: 50%;
          width: 30px;
          height: 30px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
        }

        .submit-section {
          border-top: 1px solid #e2e8f0;
          padding-top: 2rem;
          display: flex;
          gap: 1rem;
          justify-content: flex-end;
        }

        .submit-btn {
          background: #667eea;
          color: white;
          border: none;
          padding: 1rem 2rem;
          border-radius: 10px;
          font-size: 1.1rem;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s;
        }

        .submit-btn:hover:not(:disabled) {
          background: #5a67d8;
          transform: translateY(-2px);
        }

        .submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .cancel-btn {
          background: #e2e8f0;
          color: #4a5568;
          border: none;
          padding: 1rem 2rem;
          border-radius: 10px;
          font-size: 1.1rem;
          font-weight: bold;
          cursor: pointer;
          transition: background 0.3s;
          text-decoration: none;
        }

        .cancel-btn:hover {
          background: #cbd5e0;
        }

        .error {
          background: #fed7d7;
          color: #c53030;
          padding: 1rem;
          border-radius: 10px;
          margin-bottom: 2rem;
          text-align: center;
        }

        .required {
          color: #e53e3e;
        }

        @media (max-width: 768px) {
          .form-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
          
          .container {
            padding: 1rem;
          }
          
          .form-container {
            padding: 2rem;
          }
          
          .page-title {
            font-size: 2rem;
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
        </nav>
      </header>

      <div className="container">
        <div className="page-header">
          <h1 className="page-title">List New Item</h1>
          <p className="page-subtitle">Share your pre-loved clothing with the community</p>
        </div>

        <div className="form-container">
          <form onSubmit={handleSubmit}>
            {error && <div className="error">{error}</div>}

            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="title">
                  Item Title <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g., Vintage Denim Jacket"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="category">
                  Category <span className="required">*</span>
                </label>
                <select id="category" name="category" value={formData.category} onChange={handleInputChange} required>
                  <option value="">Select Category</option>
                  <option value="Outerwear">Outerwear</option>
                  <option value="Dresses">Dresses</option>
                  <option value="Tops">Tops</option>
                  <option value="Bottoms">Bottoms</option>
                  <option value="Footwear">Footwear</option>
                  <option value="Accessories">Accessories</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="type">
                  Type <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  placeholder="e.g., Jacket, T-Shirt, Sneakers"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="size">
                  Size <span className="required">*</span>
                </label>
                <select id="size" name="size" value={formData.size} onChange={handleInputChange} required>
                  <option value="">Select Size</option>
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
                  <option value="One Size">One Size</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="condition">
                  Condition <span className="required">*</span>
                </label>
                <select
                  id="condition"
                  name="condition"
                  value={formData.condition}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Condition</option>
                  <option value="Like New">Like New</option>
                  <option value="Excellent">Excellent</option>
                  <option value="Good">Good</option>
                  <option value="Fair">Fair</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="tags">Tags</label>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                  placeholder="e.g., vintage, casual, summer (comma separated)"
                />
              </div>
            </div>

            <div className="form-group full-width">
              <label htmlFor="description">
                Description <span className="required">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe the item's condition, style, and any other relevant details..."
                required
              />
            </div>

            <div className="image-upload-section">
              <label>
                Images <span className="required">*</span> (Max 5)
              </label>
              <div className="image-upload-area">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: "none" }}
                  id="image-upload"
                />
                <label htmlFor="image-upload" style={{ cursor: "pointer" }}>
                  <div className="upload-icon">📷</div>
                  <div className="upload-text">Click to upload images</div>
                  <div className="upload-subtext">PNG, JPG up to 10MB each</div>
                </label>
              </div>

              {images.length > 0 && (
                <div className="image-preview-grid">
                  {images.map((image, index) => (
                    <div key={index} className="image-preview">
                      <img src={image || "/placeholder.svg"} alt={`Preview ${index + 1}`} className="preview-image" />
                      <button type="button" className="remove-image" onClick={() => removeImage(index)}>
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="submit-section">
              <Link href="/dashboard" className="cancel-btn">
                Cancel
              </Link>
              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? "Submitting..." : "Submit for Approval"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
