-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    name TEXT NOT NULL,
    points INTEGER DEFAULT 100,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create items table
CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    type TEXT NOT NULL,
    size TEXT NOT NULL,
    condition TEXT NOT NULL,
    tags TEXT,
    images TEXT, -- JSON array of image URLs
    status TEXT DEFAULT 'available', -- available, swapped, pending
    approved BOOLEAN DEFAULT FALSE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id)
);

-- Create swaps table
CREATE TABLE IF NOT EXISTS swaps (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    requester_id INTEGER NOT NULL,
    owner_id INTEGER NOT NULL,
    item_id INTEGER NOT NULL,
    offered_item_id INTEGER,
    points_offered INTEGER DEFAULT 0,
    status TEXT DEFAULT 'pending', -- pending, accepted, rejected, completed
    message TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (requester_id) REFERENCES users (id),
    FOREIGN KEY (owner_id) REFERENCES users (id),
    FOREIGN KEY (item_id) REFERENCES items (id),
    FOREIGN KEY (offered_item_id) REFERENCES items (id)
);

-- Insert sample admin user
INSERT OR IGNORE INTO users (email, password, name, points) 
VALUES ('admin@rewear.com', 'admin123', 'Admin User', 1000);

-- Insert sample users
INSERT OR IGNORE INTO users (email, password, name, points) 
VALUES 
('john@example.com', 'password123', 'John Doe', 150),
('jane@example.com', 'password123', 'Jane Smith', 200),
('mike@example.com', 'password123', 'Mike Johnson', 120);

-- Insert sample items
INSERT OR IGNORE INTO items (user_id, title, description, category, type, size, condition, tags, images, approved) 
VALUES 
(2, 'Vintage Denim Jacket', 'Classic blue denim jacket in excellent condition. Perfect for casual wear.', 'Outerwear', 'Jacket', 'M', 'Excellent', 'vintage,denim,casual', '["https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400", "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400"]', TRUE),
(3, 'Floral Summer Dress', 'Beautiful floral print dress, perfect for summer occasions. Worn only twice.', 'Dresses', 'Dress', 'S', 'Like New', 'floral,summer,dress', '["https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400", "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400"]', TRUE),
(4, 'Designer Sneakers', 'Limited edition sneakers in great condition. Only worn a few times.', 'Footwear', 'Sneakers', '10', 'Good', 'designer,sneakers,limited', '["https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400", "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=400"]', TRUE),
(2, 'Wool Winter Coat', 'Warm wool coat perfect for winter. Classic black color goes with everything.', 'Outerwear', 'Coat', 'L', 'Good', 'wool,winter,coat', '["https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400", "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400"]', TRUE);
