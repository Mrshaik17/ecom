import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';

import adminRoutes from './routes/adminRoutes.js';
dotenv.config();

const app = express();

app.use(helmet());
app.use(express.json());

const allowedOrigin = process.env.ALLOWED_ORIGIN || 'http://localhost:8080';
app.use(cors({
  origin: allowedOrigin,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: false
}));

app.get('/', (req, res) => {
  res.json({ status: 'OK', service: 'ecom-backend' });
});

app.use('/api/admin', adminRoutes);


const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Backend running on http://localhost:${8080}`);
});
