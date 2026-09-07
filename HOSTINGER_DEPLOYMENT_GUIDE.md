# Safehands Enterprises — Hostinger Deployment Guide

This guide details the complete deployment process for Safehands Enterprises on Hostinger (hPanel / cPanel / VPS with Node.js & MySQL).

---

## 1. Prerequisites on Hostinger

1. **Hostinger Node.js Web Hosting** or **Hostinger VPS / Cloud Hosting**.
2. **Node.js Version**: 18.x or 20.x+
3. **MySQL Database**: Created via Hostinger hPanel -> **Databases** -> **MySQL Databases**.

---

## 2. Step 1: Create MySQL Database & Import Schema

1. Open your Hostinger **hPanel** -> **Databases** -> **Management**.
2. Create a new database:
   - **Database Name**: e.g., `u123456789_safehands`
   - **Username**: e.g., `u123456789_admin`
   - **Password**: (Generate a strong password and save it)
3. Click **Enter phpMyAdmin** next to your newly created database.
4. Go to the **Import** tab.
5. Choose the provided `safehands.sql` file from this package.
6. Click **Go** (or Import).
   - This creates all 6 tables:
     - `admin_users` (pre-seeded with default admin credentials)
     - `services` (pre-seeded with all 27+ real services)
     - `leads` (for incoming client inquiries)
     - `testimonials` (pre-seeded with client reviews)
     - `google_reviews` (pre-seeded with Google star reviews)
     - `contact_details` (pre-seeded with office address & phone lines)

---

## 3. Step 2: Upload Files & Environment Setup

1. Upload the contents of `safehands-hostinger-build.zip` to your application directory (e.g. `public_html` or `/home/user/safehands`).
2. Create a `.env` file in the application root with your Hostinger MySQL details:

```env
NODE_ENV=production
PORT=3000

# Hostinger MySQL Database Credentials
DB_HOST=localhost
DB_PORT=3306
DB_USER=u123456789_admin
DB_PASSWORD=your_mysql_password
DB_NAME=u123456789_safehands

# Security
JWT_SECRET=safehands_production_super_secret_key_2026_change_this
ADMIN_EMAIL=safehands@gmail.com
ADMIN_DEFAULT_PASSWORD=safehands@8989
```

> **Note on Local/Fallback Mode:** If MySQL credentials are not provided or the database server is temporarily offline, the application automatically runs in zero-crash JSON fallback mode so your website never goes down.

---

## 4. Step 3: Start the Node.js Application

### Method A: Hostinger Node.js Application Manager (hPanel)
1. Go to **hPanel** -> **Node.js**.
2. Set **Application Root**: `/home/u123456789/domains/yourdomain.com/public_html`
3. Set **Application Startup File**: `dist/server.cjs`
4. Set **Node.js Version**: 18 or 20.
5. Click **Install Dependencies** (or run `npm install --omit=dev`).
6. Click **Restart** or **Start**.

### Method B: Hostinger VPS / PM2
If you are running on a Hostinger VPS with SSH access:
```bash
# Navigate to directory
cd /var/www/safehands

# Install production dependencies
npm install --omit=dev

# Start with PM2
npm install -g pm2
pm2 start dist/server.cjs --name "safehands"
pm2 save
pm2 startup
```

---

## 5. Admin Dashboard Access & Credentials

- **Admin URL**: `https://yourdomain.com/admin` (or click **Staff Login** in the website footer)
- **Default Email**: `safehands@gmail.com`
- **Default Password**: `safehands@8989`

### Features available in the Admin Portal:
1. **Overview & Analytics**: View total leads, active services, verified reviews, and recent activity.
2. **Services Management**: Add new services, edit titles, descriptions, categories, turnarounds, government fees, and toggle active status.
3. **Leads & Inquiries**: View all client submissions with name, mobile, service requested, locality, message, date, and status with direct WhatsApp and Call buttons.
4. **Testimonials & Reviews**: Add, edit, or remove client testimonials and Google 5-star reviews.
5. **Contact & Branch Details**: Update office address, primary & secondary phone numbers, WhatsApp number, email, and business timings in real time.
6. **Settings & Password**: Change admin password, verify database connection status, and download SQL backup files.
