const express = require('express');
const crypto = require('crypto');
const { createUser, getUser } = require('../lib/users');

const router = express.Router();

const ITERATIONS = 100000;
const KEYLEN = 64;
const DIGEST = 'sha512';

router.post('/register', async (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) return res.status(400).json({ error: 'username and password required' });
  const existingUser = await getUser(username);
  if (existingUser) return res.status(409).json({ error: 'user already exists' });

  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, ITERATIONS, KEYLEN, DIGEST).toString('hex');

  const ok = await createUser({ username, salt, hash, iterations: ITERATIONS, keylen: KEYLEN, digest: DIGEST });
  if (!ok) return res.status(500).json({ error: 'could not create user' });
  return res.status(201).json({ message: 'user created' });
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) return res.status(400).json({ error: 'username and password required' });

  const user = await getUser(username);
  if (!user) return res.status(401).json({ error: 'invalid credentials' });

  const computedHash = crypto.pbkdf2Sync(password, user.salt, user.iterations, user.keylen, user.digest);
  const storedHash = Buffer.from(user.hash, 'hex');
  if (storedHash.length !== computedHash.length) return res.status(401).json({ error: 'invalid credentials' });

  const match = crypto.timingSafeEqual(storedHash, computedHash);
  if (!match) return res.status(401).json({ error: 'invalid credentials' });

  return res.json({ message: 'login successful', user: username });
});

module.exports = router;
