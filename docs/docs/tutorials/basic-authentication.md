---
sidebar_position: 2
---

# Authentication System

In this tutorial, you’ll learn how to implement a **basic authentication system** using **File Express Router**. We’ll cover user registration, login, and protected routes using JSON Web Tokens (JWT). By the end, you’ll have a working authentication system integrated into your API.

## Prerequisites

Before starting, ensure you have the following installed:

- Node.js (v16 or higher)
- npm or yarn
- TypeScript (optional but recommended)
- Basic understanding of **File Express Router** (from the previous tutorial)

### Step 1: Install Additional Dependencies

We’ll use the following packages for authentication:

1. **jsonwebtoken**: For generating and verifying JWTs.
2. **bcrypt**: For hashing passwords.
3. **dotenv**: For managing environment variables.

Install them using npm or yarn:

```bash
npm install jsonwebtoken bcrypt dotenv
npm install --save-dev @types/jsonwebtoken @types/bcrypt
```

### Step 2: Set Up Environment Variables

Create a `.env` file in the root of your project to store sensitive information:

```env
# .env
JWT_SECRET=your_jwt_secret_key
PORT=3000
```

### Step 3: Update Project Structure

Update your project structure to include authentication-related files:

```
basic-api-server/
├── routes/
│   ├── auth/
│   │   ├── register.ts
│   │   ├── login.ts
│   ├── users/
│   │   └── [id].ts
│   ├── index.ts
│   └── _error.ts
├── middlewares/
│   └── authMiddleware.ts
├── utils/
│   └── authUtils.ts
├── app.ts
├── .env
├── package.json
└── tsconfig.json (if using TypeScript)
```

### Step 4: Create Utility Functions

In the `utils/authUtils.ts` file, add helper functions for hashing passwords and generating JWTs:

```typescript title="utils/authUtils.ts"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

// Hash a password
export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

// Compare a password with its hash
export const comparePassword = async (
  password: string,
  hash: string,
): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};

// Generate a JWT
export const generateToken = (userId: string): string => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1h' });
};

// Verify a JWT
export const verifyToken = (token: string): { userId: string } | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: string };
  } catch (error) {
    return null;
  }
};
```

### Step 5: Create Authentication Middleware

```typescript title="middlewares/authMiddleware.ts"
import { RequestHandler } from 'express';
import { verifyToken } from '../utils/authUtils';

export const authMiddleware: RequestHandler = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    return res.status(401).json({ error: 'Invalid token' });
  }

  // Attach the user ID to the request object
  req.userId = decoded.userId;
  next();
};
```

### Step 6: Create Authentication Routes

```typescript title="routes/auth/register.ts"
import { RequestHandler } from 'express';
import { hashPassword } from '../../utils/authUtils';

// In-memory "database" for demonstration purposes
const users: { [key: string]: { password: string } } = {};

export const post: RequestHandler = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: 'Username and password are required' });
  }

  if (users[username]) {
    return res.status(400).json({ error: 'Username already exists' });
  }

  const hashedPassword = await hashPassword(password);
  users[username] = { password: hashedPassword };

  res.status(201).json({ message: 'User registered successfully' });
};
```

```typescript title="routes/auth/login.ts"
import { RequestHandler } from 'express';
import { comparePassword, generateToken } from '../../utils/authUtils';

const users: { [key: string]: { password: string } } = {
  // Example user for testing
  admin: { password: '$2b$10$...' }, // Replace with a real hashed password
};

export const post: RequestHandler = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: 'Username and password are required' });
  }

  const user = users[username];

  if (!user || !(await comparePassword(password, user.password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = generateToken(username);
  res.json({ token });
};
```

### Step 7: Protect Routes

To protect a route, use the `authMiddleware`. For example, update the `routes/users/[id].ts` file:

```typescript title="routes/users/[id].ts"
import { RequestHandler } from 'express';
import { authMiddleware } from '../../middlewares/authMiddleware';

export const middleware = authMiddleware;

export const get: RequestHandler = (req, res) => {
  res.json({ userId: req.params.id, currentUser: req.userId });
};
```

### Step 8: Update app.ts

Update your `app.ts` file to use JSON body parsing and environment variables:

```typescript title="app.ts"
import express from 'express';
import { Router } from 'file-express-router';
import dotenv from 'dotenv';

dotenv.config();

const startServer = async () => {
  const app = express();

  // highlight-start
  // Middleware for JSON body parsing
  app.use(express.json());
  // highlight-end

  const routesDir = `${__dirname}/routes`;
  const router = await Router({ dir: routesDir });
  app.use('/api', router);

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};

startServer();
```

### Step 9: Test Your Authentication System

1. Start the server:

   ```bash
   npx ts-node app.ts
   ```

2. Register a new user:

   ```bash
   curl -X POST http://localhost:3000/api/auth/register \
   -H "Content-Type: application/json" \
   -d '{"username": "admin", "password": "password123"}'
   ```

3. Log in to get a token:

   ```bash
   curl -X POST http://localhost:3000/api/auth/login \
   -H "Content-Type: application/json" \
   -d '{"username": "admin", "password": "password123"}'
   ```

4. Access a protected route using the token:

   ```bash
   curl http://localhost:3000/api/users/123 \
   -H "Authorization: Bearer <your_token>"
   ```

## Final Project Structure

```
basic-api-server/
├── routes/
│   ├── auth/
│   │   ├── register.ts
│   │   ├── login.ts
│   ├── users/
│   │   └── [id].ts
│   ├── index.ts
│   └── _error.ts
├── middlewares/
│   └── authMiddleware.ts
├── utils/
│   └── authUtils.ts
├── app.ts
├── .env
├── package.json
└── tsconfig.json (if using TypeScript)
```

You’ve now built a **basic authentication system** using **File Express Router**!
