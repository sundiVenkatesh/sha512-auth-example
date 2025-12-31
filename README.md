# SHA-512 Auth Example

Minimal Node.js example providing authentication with SHA-512 hashing, SQLite database, and HTML frontend.

## Features

- **Registration and Login APIs**:
  - POST `/api/auth/register` — register a new user (uses PBKDF2 with `sha512`)
  - POST `/api/auth/login` — verify credentials and return welcome message

- **Database**: Uses SQLite (`users.db`) for persistent storage of user credentials.

- **Frontend**: HTML forms for register and login, styled with CSS, using fetch API to call the endpoints.

- **Security**: Passwords hashed with `crypto.pbkdf2` using `sha512`, 100000 iterations, 64-byte key, with random salt.

## Installation & Run

```
npm install
npm start
```

Server runs on `http://localhost:3001`.

Access the frontend:
- Register: http://localhost:3001/register.html
- Login: http://localhost:3001/login.html

## API Examples

Register:
```
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"alice","password":"s3cret"}'
```

Login:
```
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"alice","password":"s3cret"}'
```

## Development Notes

- Originally used in-memory store; updated to SQLite for persistence.
- Added HTML frontend with forms and CSS styling.
- Configured for Git and pushed to GitHub.
- Git configured with user: Venkatesh, email: venkatesh.sundi@outlook.com
- Repository: https://github.com/sundiVenkatesh/sha512-auth-example

## How HTML Communicates with Node.js

The HTML frontend communicates with the Node.js backend using the Fetch API in JavaScript. When a user submits the registration or login form:

1. The form's submit event is prevented from default behavior.
2. JavaScript collects the username and password from the form inputs.
3. A `fetch()` request is made to the appropriate API endpoint (e.g., `/api/auth/register`) with method POST, headers for JSON content, and the data as JSON in the body.
4. The server processes the request, hashes passwords, interacts with the SQLite database, and returns a JSON response.
5. The JavaScript handles the response: on success, displays a message (e.g., welcome for login); on error, shows the error message.
6. No page reload occurs; it's a single-page application style interaction.

This allows for dynamic updates without full page refreshes.

## Code Block Explanations

### Installation & Run
```
npm install
npm start
```
- `npm install`: Installs dependencies listed in package.json, including express and sqlite3.
- `npm start`: Runs the script defined in package.json, which is `node index.js`, starting the server on port 3001.

### API Examples
Register:
```
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"alice","password":"s3cret"}'
```
- This curl command sends a POST request to the register endpoint with JSON data. The server creates a new user if the username doesn't exist, hashes the password, and stores it in SQLite.

Login:
```
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"alice","password":"s3cret"}'
```
- Sends a POST to login, verifies the password against the stored hash, and returns success with username if valid.

These examples demonstrate API usage via command line; the HTML forms do the same via fetch.

## Conversation Log

(This section documents the development chat for reference.)

User: all html files for register and login to use these apis along with css

Assistant: Created HTML files (register.html, login.html) and styles.css in public/ directory. Updated index.js to serve static files. Forms use fetch to POST to /api/auth/register and /api/auth/login.

User: unable to access html files

Assistant: Server was on port 3000, changed to 3001 due to conflict. Server running successfully.

User: able now but how i know api is used from html

Assistant: Explained to check browser dev tools Network tab for API calls.

User: make a sqlite db for storing and retriving passwords for login after login show some stati text

Assistant: Installed sqlite3, updated lib/users.js to use SQLite database. Modified routes/auth.js to handle async DB operations. Updated login.html to show welcome message with username on success.

User: how to stop this server running

Assistant: Provided ways to stop: Ctrl+C in terminal, Task Manager, or taskkill.

User: proper way

Assistant: Proper way is Ctrl+C for graceful shutdown.

User: stop here

Assistant: Instructed to press Ctrl+C in the terminal.

User: want to move this to github

Assistant: Initialized Git, created .gitignore, added and committed files. Guided on creating GitHub repo and pushing.

User: my user name is venkatesh.sundi@outlook

Assistant: Set git config user.email to venkatesh.sundi@outlook.com, user.name to Venkatesh.

User: sundiVenkatesh is user name

Assistant: Added remote origin with https://github.com/sundiVenkatesh/sha512-auth-example.git. Instructed to push with PAT.

User: add all these Chat in readMe file then Commit

Assistant: Updated README with current features, added conversation log summary.
