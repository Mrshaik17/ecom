import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';

import adminRoutes from './routes/adminRoutes.js';

dotenv.config();

const app = express();

app.use(helmet());
app.use(express.json());

// Use ALLOWED_ORIGIN from env or fallback to localhost for development
const allowedOrigin = process.env.ALLOWED_ORIGIN || 'http://localhost:3000'; // React default port

app.use(cors({
  origin: allowedOrigin,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: false  // Change to true if using cookies for auth
}));

app.get('/', (req, res) => {
  res.json({ status: 'OK', service: 'ecom-backend' });
});

app.use('/api/admin', adminRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
});
