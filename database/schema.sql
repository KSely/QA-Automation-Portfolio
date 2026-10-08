-- ==================== MESSAGES TABLE ====================
-- Stores messages submitted through the contact form

CREATE TABLE IF NOT EXISTS messages (

  id SERIAL PRIMARY KEY,

  name VARCHAR(255) NOT NULL,

  email VARCHAR(255) NOT NULL,

  message TEXT NOT NULL,

  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP

);

-- ==================== USERS TABLE ====================
-- Stores authentication credentials and authorization roles

CREATE TABLE IF NOT EXISTS users (

  id SERIAL PRIMARY KEY,

  email VARCHAR(320) NOT NULL UNIQUE,

  password_hash VARCHAR(255) NOT NULL,

  role VARCHAR(20) NOT NULL DEFAULT 'user'
    CHECK (role IN ('user', 'admin')),

  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP

);
