import jwt from 'jsonwebtoken';

export const loginAdmin = (req, res) => {
  const { username, password } = req.body || {};
  const envUser = process.env.ADMIN_USERNAME;
  const envPass = process.env.ADMIN_PASSWORD;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password required' });
  }

  if (username !== envUser || password !== envPass) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const payload = { role: 'admin', username };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '2h'
  });

  return res.json({
    token,
    user: { username, role: 'admin' }
  });
};

export const verifyToken = (req, res) => {
  // If we reached here, middleware validated the token
  return res.json({ valid: true, user: req.user });
};
