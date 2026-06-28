# Taj Studio — Full-Stack Node.js Web Application

A premium, cinematic full-stack photography and videography studio web application. Built using Express.js, server-side EJS rendering, MariaDB database connection, and session-based administrator dashboard control.

## Project Tech Stack

- **Backend:** Express.js (Node.js)
- **Frontend Engine:** EJS (Server-Side Rendered views)
- **Database:** MariaDB / MySQL
- **Upload Manager:** Multer (Saves uploads to disk)
- **Authentication:** session-based authentication + bcrypt
- **Process Manager:** PM2 (Hostinger & Production environment setup)

---

## Local Setup Instructions

### 1. Prerequisite Installations
Ensure you have **Node.js (version 18+)** and **MariaDB / MySQL** database running on your local machine.

### 2. Configure Database
1. Open your database command line or GUI client (e.g. phpMyAdmin, DBeaver).
2. Create the database:
   ```sql
   CREATE DATABASE taj_studio;
   ```
3. Run the SQL schema script inside [db/schema.sql](file:///d:/antigravity/taj%20studio%20node/db/schema.sql) to set up all tables and seed the default admin account:
   - Default Username: `admin`
   - Default Password: `admin123` *(Please change after your first login)*

### 3. Environment Variables
Configure your database credentials in the `.env` file at the root of the project:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=taj_studio
SESSION_SECRET=your_custom_secret_key
PORT=3000
```

### 4. Run Locally
Execute the following commands in your project workspace directory:
```bash
# Run the application in production mode
npm start

# Run the application in development mode (with nodemon hot-reload)
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Hostinger Node.js Deployment README

Deploying Node.js on Hostinger VPS or Shared Node.js hosting is easy using **PM2** process management.

### Step 1: Export Database to Hostinger
1. Create a MySQL/MariaDB database in your **Hostinger hPanel** under **Databases > MySQL Management**.
2. Note down the Database Name, Username, and Password.
3. Open phpMyAdmin from the Hostinger panel, select the new database, and import the [db/schema.sql](file:///d:/antigravity/taj%20studio%20node/db/schema.sql) file.

### Step 2: Upload Files
1. Log in to your Hostinger Account.
2. Under **Websites > Manage**, go to **Files > File Manager** or connect via **FTP / SSH**.
3. Upload your project files to the application root directory (usually `/home/uXXXXXXX/public_html` or a custom sub-domain directory).
4. *Do not upload the `node_modules` directory.*

### Step 3: Install Dependencies & Setup Environment
1. Connect to your Hostinger server using **SSH**.
2. Navigate to your project directory.
3. Create a `.env` file and input your Hostinger production credentials:
   ```env
   DB_HOST=127.0.0.1
   DB_USER=uXXXXXXX_dbuser
   DB_PASSWORD=your_hostinger_db_password
   DB_NAME=uXXXXXXX_dbname
   SESSION_SECRET=generate_strong_secret_hash_here
   PORT=3000
   ```
4. Run npm install to fetch required production dependencies:
   ```bash
   npm install --production
   ```

### Step 4: Run Application with PM2
We have configured `ecosystem.config.js` to manage PM2 executions. Run:
```bash
# Start the Taj Studio application process
pm2 start ecosystem.config.js

# Save PM2 process list to load automatically on server reboots
pm2 save
```

Verify your app state by running `pm2 status` or checking the logs with `pm2 logs taj-studio`.
