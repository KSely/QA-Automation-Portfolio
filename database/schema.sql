-- ==================== MESSAGES TABLE ====================
-- Stores messages submitted through the contact form

CREATE TABLE messages (

  id SERIAL PRIMARY KEY,

  name VARCHAR(255) NOT NULL,

  email VARCHAR(255) NOT NULL,

  message TEXT NOT NULL,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);