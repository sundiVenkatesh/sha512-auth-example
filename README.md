# SHA-512 Auth Example

Minimal Node.js example providing two endpoints:

- POST `/api/auth/register` — register a new user (uses PBKDF2 with `sha512`)
- POST `/api/auth/login` — verify credentials

Install & run:

```
npm install
npm start
```

Examples:

Register:
```
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"alice","password":"s3cret"}'
```

Login:
```
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"alice","password":"s3cret"}'
```

Notes:
- Passwords are hashed with `crypto.pbkdf2` using `sha512`, 100000 iterations, 64-byte key.
- This example uses an in-memory store; replace `lib/users.js` with a persistent DB for production.
