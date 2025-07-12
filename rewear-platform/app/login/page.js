"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(data.user))
        router.push("/dashboard")
      } else {
        setError(data.error || "Login failed")
      }
    } catch (error) {
      setError("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="login-page">
      <style jsx>{`
        .login-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: Arial, sans-serif;
          padding: 2rem;
        }

        .login-container {
          background: white;
          padding: 3rem;
          border-radius: 20px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
          width: 100%;
          max-width: 400px;
        }

        .logo {
          text-align: center;
          font-size: 2.5rem;
          font-weight: bold;
          color: #667eea;
          margin-bottom: 2rem;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          color: #333;
          font-weight: 500;
        }

        .form-group input {
          width: 100%;
          padding: 1rem;
          border: 2px solid #e1e5e9;
          border-radius: 10px;
          font-size: 1rem;
          transition: border-color 0.3s;
          box-sizing: border-box;
        }

        .form-group input:focus {
          outline: none;
          border-color: #667eea;
        }

        .submit-button {
          width: 100%;
          padding: 1rem;
          background: #667eea;
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 1.1rem;
          font-weight: bold;
          cursor: pointer;
          transition: background 0.3s;
          margin-bottom: 1rem;
        }

        .submit-button:hover:not(:disabled) {
          background: #5a67d8;
        }

        .submit-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .error {
          background: #fed7d7;
          color: #c53030;
          padding: 1rem;
          border-radius: 10px;
          margin-bottom: 1rem;
          text-align: center;
        }

        .signup-link {
          text-align: center;
          color: #666;
        }

        .signup-link a {
          color: #667eea;
          text-decoration: none;
          font-weight: bold;
        }

        .signup-link a:hover {
          text-decoration: underline;
        }

        .back-link {
          text-align: center;
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
      `}</style>

      <div className="login-container">
        <div className="back-link">
          <Link href="/">← Back to Home</Link>
        </div>

        <div className="logo">ReWear</div>

        <form onSubmit={handleSubmit}>
          {error && <div className="error">{error}</div>}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="signup-link">
          Don't have an account? <Link href="/signup">Sign up here</Link>
        </div>
      </div>
    </div>
  )
}
