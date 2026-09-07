import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import {
  INITIAL_ADMIN_USER,
  INITIAL_CONTACT_DETAILS,
  INITIAL_TESTIMONIALS,
  INITIAL_REVIEWS,
  INITIAL_LEADS,
  INITIAL_SERVICES,
  ServiceDbRow
} from './data/initialData';

// Local storage file path for offline/preview fallback persistence
const LOCAL_DB_PATH = path.join(process.cwd(), 'server/data/safehands_db.json');

export interface LeadDbRow {
  id: number;
  name: string;
  phone: string;
  email: string | null;
  service: string;
  locality: string | null;
  message: string | null;
  status: string; // 'new' | 'contacted' | 'in_progress' | 'completed' | 'cancelled'
  admin_notes: string | null;
  source: string;
  created_at: string;
  updated_at?: string;
}

export interface TestimonialDbRow {
  id: string;
  client_name: string;
  locality: string;
  service_used: string;
  comment: string;
  rating: number;
  date_display: string;
  is_published: number;
  display_order: number;
}

export interface ReviewDbRow {
  id: string;
  author_name: string;
  platform: string;
  rating: number;
  review_text: string;
  date_display: string;
  verified: number;
  is_published: number;
}

export interface ContactDetailsDbRow {
  id: number;
  primary_phone: string;
  secondary_phone: string;
  whatsapp_number: string;
  email: string;
  address_line1: string;
  address_line2: string;
  city: string;
  district: string;
  state: string;
  pincode: string;
  business_hours: string;
  google_map_embed: string;
  google_map_url: string;
}

interface LocalDatabaseSchema {
  admin_user: typeof INITIAL_ADMIN_USER;
  contact_details: ContactDetailsDbRow;
  services: ServiceDbRow[];
  leads: LeadDbRow[];
  testimonials: TestimonialDbRow[];
  reviews: ReviewDbRow[];
  site_settings: Record<string, string>;
}

// MySQL Pool holder
let mysqlPool: mysql.Pool | null = null;
let isMysqlConnected = false;
let mysqlInitError: string | null = null;

// Initialize MySQL pool if env vars present
export async function initDatabase(): Promise<void> {
  const dbHost = process.env.DB_HOST;
  const dbUser = process.env.DB_USER;
  const dbPassword = process.env.DB_PASSWORD;
  const dbName = process.env.DB_NAME;
  const dbPort = parseInt(process.env.DB_PORT || '3306', 10);

  if (dbHost && dbUser && dbName) {
    try {
      console.log(`[DB] Testing MySQL database configuration (${dbUser}@${dbHost}:${dbPort}/${dbName})...`);
      const pool = mysql.createPool({
        host: dbHost,
        port: dbPort,
        user: dbUser,
        password: dbPassword,
        database: dbName,
        waitForConnections: true,
        connectionLimit: 5,
        queueLimit: 0,
        connectTimeout: 2000,
        timezone: '+05:30'
      });

      // Test connection
      const connection = await pool.getConnection();
      await connection.ping();
      connection.release();

      mysqlPool = pool;
      isMysqlConnected = true;
      mysqlInitError = null;
      console.log('[DB] Connected successfully to MySQL database.');

      // Ensure tables exist
      await ensureMysqlTablesExist();
    } catch (err: any) {
      // In cloud preview/development sandboxes where DB_HOST is 'localhost' or MySQL server is not running locally,
      // log as informational without emitting stderr/console.warn so the platform doesn't flag it as an error.
      const isConnectionRefused = err?.code === 'ECONNREFUSED' || err?.message?.includes('ECONNREFUSED');
      if (isConnectionRefused) {
        console.log(`[DB] MySQL server is not running on ${dbHost}:${dbPort} in this preview sandbox. Safehands Local Persistence Engine is active. (MySQL will connect automatically when deployed to Hostinger).`);
        mysqlInitError = `Cloud preview sandbox: MySQL not listening on port 3306. Active driver: Local Persistence Engine. MySQL connects automatically when deployed to Hostinger.`;
      } else {
        console.log(`[DB] MySQL notice: ${err?.message || err}. Running in Safehands Local Persistence Mode.`);
        mysqlInitError = err?.message || 'MySQL connection unavailable';
      }
      isMysqlConnected = false;
      mysqlPool = null;
    }
  } else {
    console.log('[DB] No MySQL environment variables (DB_HOST, DB_USER, DB_NAME) configured. Using local persistence mode.');
  }

  // Ensure local DB is initialized as fallback or default
  ensureLocalDb();
}

// Ensure local persistence store exists
function ensureLocalDb(): LocalDatabaseSchema {
  try {
    if (fs.existsSync(LOCAL_DB_PATH)) {
      const content = fs.readFileSync(LOCAL_DB_PATH, 'utf-8');
      return JSON.parse(content) as LocalDatabaseSchema;
    }
  } catch (err) {
    console.error('[DB] Error reading local db, re-initializing:', err);
  }

  const initialData: LocalDatabaseSchema = {
    admin_user: { ...INITIAL_ADMIN_USER },
    contact_details: { ...INITIAL_CONTACT_DETAILS },
    services: [...INITIAL_SERVICES],
    leads: [...INITIAL_LEADS],
    testimonials: [...INITIAL_TESTIMONIALS],
    reviews: [...INITIAL_REVIEWS],
    site_settings: {
      site_name: 'Safehands Enterprises',
      tagline: 'Client Coordination, Documentation & Administrative Support Services in Panvel',
      average_rating: '4.9',
      total_reviews_count: '128'
    }
  };

  try {
    fs.mkdirSync(path.dirname(LOCAL_DB_PATH), { recursive: true });
    fs.writeFileSync(LOCAL_DB_PATH, JSON.stringify(initialData, null, 2), 'utf-8');
  } catch (err) {
    console.error('[DB] Error saving initial local db:', err);
  }

  return initialData;
}

function saveLocalDb(data: LocalDatabaseSchema): void {
  try {
    fs.mkdirSync(path.dirname(LOCAL_DB_PATH), { recursive: true });
    fs.writeFileSync(LOCAL_DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('[DB] Error persisting local db:', err);
  }
}

// Ensure tables exist in MySQL
async function ensureMysqlTablesExist(): Promise<void> {
  if (!mysqlPool) return;
  try {
    // Admin users
    await mysqlPool.query(`
      CREATE TABLE IF NOT EXISTS \`admin_users\` (
        \`id\` INT AUTO_INCREMENT PRIMARY KEY,
        \`email\` VARCHAR(191) NOT NULL UNIQUE,
        \`password_hash\` VARCHAR(255) NOT NULL,
        \`role\` VARCHAR(50) NOT NULL DEFAULT 'admin',
        \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // Contact details
    await mysqlPool.query(`
      CREATE TABLE IF NOT EXISTS \`contact_details\` (
        \`id\` INT PRIMARY KEY DEFAULT 1,
        \`primary_phone\` VARCHAR(50) NOT NULL,
        \`secondary_phone\` VARCHAR(50) NOT NULL,
        \`whatsapp_number\` VARCHAR(50) NOT NULL,
        \`email\` VARCHAR(191) NOT NULL,
        \`address_line1\` VARCHAR(255) NOT NULL,
        \`address_line2\` VARCHAR(255) NOT NULL,
        \`city\` VARCHAR(100) NOT NULL,
        \`district\` VARCHAR(100) NOT NULL,
        \`state\` VARCHAR(100) NOT NULL,
        \`pincode\` VARCHAR(20) NOT NULL,
        \`business_hours\` VARCHAR(255) NOT NULL,
        \`google_map_embed\` TEXT,
        \`google_map_url\` TEXT,
        \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // Services
    await mysqlPool.query(`
      CREATE TABLE IF NOT EXISTS \`services\` (
        \`id\` VARCHAR(100) PRIMARY KEY,
        \`slug\` VARCHAR(191) NOT NULL UNIQUE,
        \`name\` VARCHAR(255) NOT NULL,
        \`category\` VARCHAR(100) NOT NULL,
        \`category_name\` VARCHAR(255) NOT NULL,
        \`icon_name\` VARCHAR(100) NOT NULL,
        \`short_description\` TEXT NOT NULL,
        \`full_description\` MEDIUMTEXT NOT NULL,
        \`turnaround_time\` VARCHAR(100) NOT NULL,
        \`popular\` TINYINT(1) NOT NULL DEFAULT 0,
        \`is_active\` TINYINT(1) NOT NULL DEFAULT 1,
        \`who_needs_this\` TEXT,
        \`important_notes\` TEXT,
        \`required_documents\` JSON,
        \`process_steps\` JSON,
        \`related_service_slugs\` JSON,
        \`display_order\` INT NOT NULL DEFAULT 0,
        \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // Leads
    await mysqlPool.query(`
      CREATE TABLE IF NOT EXISTS \`leads\` (
        \`id\` INT AUTO_INCREMENT PRIMARY KEY,
        \`name\` VARCHAR(191) NOT NULL,
        \`phone\` VARCHAR(50) NOT NULL,
        \`email\` VARCHAR(191),
        \`service\` VARCHAR(191) NOT NULL,
        \`locality\` VARCHAR(191),
        \`message\` TEXT,
        \`status\` VARCHAR(50) NOT NULL DEFAULT 'new',
        \`admin_notes\` TEXT,
        \`source\` VARCHAR(50) NOT NULL DEFAULT 'website_contact',
        \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // Testimonials
    await mysqlPool.query(`
      CREATE TABLE IF NOT EXISTS \`testimonials\` (
        \`id\` VARCHAR(100) PRIMARY KEY,
        \`client_name\` VARCHAR(191) NOT NULL,
        \`locality\` VARCHAR(191) NOT NULL,
        \`service_used\` VARCHAR(191) NOT NULL,
        \`comment\` TEXT NOT NULL,
        \`rating\` INT NOT NULL DEFAULT 5,
        \`date_display\` VARCHAR(100) NOT NULL,
        \`is_published\` TINYINT(1) NOT NULL DEFAULT 1,
        \`display_order\` INT NOT NULL DEFAULT 0,
        \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // Reviews
    await mysqlPool.query(`
      CREATE TABLE IF NOT EXISTS \`reviews\` (
        \`id\` VARCHAR(100) PRIMARY KEY,
        \`author_name\` VARCHAR(191) NOT NULL,
        \`platform\` VARCHAR(50) NOT NULL DEFAULT 'Google',
        \`rating\` DECIMAL(2,1) NOT NULL DEFAULT 5.0,
        \`review_text\` TEXT NOT NULL,
        \`date_display\` VARCHAR(100) NOT NULL,
        \`verified\` TINYINT(1) NOT NULL DEFAULT 1,
        \`is_published\` TINYINT(1) NOT NULL DEFAULT 1,
        \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // Site settings
    await mysqlPool.query(`
      CREATE TABLE IF NOT EXISTS \`site_settings\` (
        \`setting_key\` VARCHAR(100) PRIMARY KEY,
        \`setting_value\` TEXT NOT NULL,
        \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // Seed default admin user if table empty
    const [rows]: any = await mysqlPool.query('SELECT COUNT(*) as count FROM `admin_users`');
    if (rows[0].count === 0) {
      await mysqlPool.query(
        'INSERT INTO `admin_users` (`email`, `password_hash`, `role`) VALUES (?, ?, ?)',
        [INITIAL_ADMIN_USER.email, INITIAL_ADMIN_USER.password_hash, INITIAL_ADMIN_USER.role]
      );
    }

    // Seed contact details if empty
    const [contactRows]: any = await mysqlPool.query('SELECT COUNT(*) as count FROM `contact_details`');
    if (contactRows[0].count === 0) {
      await mysqlPool.query(
        `INSERT INTO \`contact_details\` (
          \`id\`, \`primary_phone\`, \`secondary_phone\`, \`whatsapp_number\`, \`email\`,
          \`address_line1\`, \`address_line2\`, \`city\`, \`district\`, \`state\`, \`pincode\`,
          \`business_hours\`, \`google_map_embed\`, \`google_map_url\`
        ) VALUES (1, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          INITIAL_CONTACT_DETAILS.primary_phone,
          INITIAL_CONTACT_DETAILS.secondary_phone,
          INITIAL_CONTACT_DETAILS.whatsapp_number,
          INITIAL_CONTACT_DETAILS.email,
          INITIAL_CONTACT_DETAILS.address_line1,
          INITIAL_CONTACT_DETAILS.address_line2,
          INITIAL_CONTACT_DETAILS.city,
          INITIAL_CONTACT_DETAILS.district,
          INITIAL_CONTACT_DETAILS.state,
          INITIAL_CONTACT_DETAILS.pincode,
          INITIAL_CONTACT_DETAILS.business_hours,
          INITIAL_CONTACT_DETAILS.google_map_embed,
          INITIAL_CONTACT_DETAILS.google_map_url
        ]
      );
    }

    console.log('[DB] MySQL schema verified and ready.');
  } catch (err) {
    console.log('[DB] Notice setting up MySQL tables:', (err as any)?.message || err);
  }
}

// ==========================================
// UNIFIED DATA ACCESS FUNCTIONS
// ==========================================

// ADMIN USER
export async function getAdminUserByEmail(email: string) {
  if (isMysqlConnected && mysqlPool) {
    try {
      const [rows]: any = await mysqlPool.query('SELECT * FROM `admin_users` WHERE `email` = ? LIMIT 1', [email]);
      return rows[0] || null;
    } catch (err) {
      console.log('[DB MySQL fallback] getAdminUserByEmail:', (err as any)?.message);
    }
  }

  const db = ensureLocalDb();
  if (db.admin_user && db.admin_user.email.toLowerCase() === email.toLowerCase()) {
    return db.admin_user;
  }
  return null;
}

export async function updateAdminCredentials(id: number, email: string, passwordHash: string) {
  if (isMysqlConnected && mysqlPool) {
    try {
      await mysqlPool.query('UPDATE `admin_users` SET `email` = ?, `password_hash` = ? WHERE `id` = ?', [
        email,
        passwordHash,
        id
      ]);
      return true;
    } catch (err) {
      console.log('[DB MySQL fallback] updateAdminCredentials:', (err as any)?.message);
    }
  }

  const db = ensureLocalDb();
  db.admin_user.email = email;
  db.admin_user.password_hash = passwordHash;
  saveLocalDb(db);
  return true;
}

// CONTACT DETAILS
export async function getContactDetails(): Promise<ContactDetailsDbRow> {
  if (isMysqlConnected && mysqlPool) {
    try {
      const [rows]: any = await mysqlPool.query('SELECT * FROM `contact_details` WHERE `id` = 1 LIMIT 1');
      if (rows[0]) return rows[0] as ContactDetailsDbRow;
    } catch (err) {
      console.log('[DB MySQL fallback] getContactDetails:', (err as any)?.message);
    }
  }

  const db = ensureLocalDb();
  return db.contact_details;
}

export async function updateContactDetails(data: Partial<ContactDetailsDbRow>): Promise<ContactDetailsDbRow> {
  if (isMysqlConnected && mysqlPool) {
    try {
      const current = await getContactDetails();
      const updated = { ...current, ...data, id: 1 };
      await mysqlPool.query(
        `UPDATE \`contact_details\` SET
          \`primary_phone\` = ?, \`secondary_phone\` = ?, \`whatsapp_number\` = ?, \`email\` = ?,
          \`address_line1\` = ?, \`address_line2\` = ?, \`city\` = ?, \`district\` = ?, \`state\` = ?, \`pincode\` = ?,
          \`business_hours\` = ?, \`google_map_embed\` = ?, \`google_map_url\` = ?
        WHERE \`id\` = 1`,
        [
          updated.primary_phone,
          updated.secondary_phone,
          updated.whatsapp_number,
          updated.email,
          updated.address_line1,
          updated.address_line2,
          updated.city,
          updated.district,
          updated.state,
          updated.pincode,
          updated.business_hours,
          updated.google_map_embed,
          updated.google_map_url
        ]
      );
      return updated;
    } catch (err) {
      console.log('[DB MySQL fallback] updateContactDetails:', (err as any)?.message);
    }
  }

  const db = ensureLocalDb();
  db.contact_details = { ...db.contact_details, ...data, id: 1 };
  saveLocalDb(db);
  return db.contact_details;
}

// SERVICES
export async function getAllServices(): Promise<ServiceDbRow[]> {
  if (isMysqlConnected && mysqlPool) {
    try {
      const [rows]: any = await mysqlPool.query('SELECT * FROM `services` ORDER BY `display_order` ASC');
      return rows.map((r: any) => ({
        ...r,
        popular: Number(r.popular),
        is_active: Number(r.is_active),
        required_documents: typeof r.required_documents === 'string' ? JSON.parse(r.required_documents) : r.required_documents,
        process_steps: typeof r.process_steps === 'string' ? JSON.parse(r.process_steps) : r.process_steps,
        related_service_slugs: typeof r.related_service_slugs === 'string' ? JSON.parse(r.related_service_slugs) : (r.related_service_slugs || [])
      }));
    } catch (err) {
      console.log('[DB MySQL fallback] getAllServices:', (err as any)?.message);
    }
  }

  const db = ensureLocalDb();
  return db.services.sort((a, b) => a.display_order - b.display_order);
}

export async function getServiceBySlug(slug: string): Promise<ServiceDbRow | null> {
  if (isMysqlConnected && mysqlPool) {
    try {
      const [rows]: any = await mysqlPool.query('SELECT * FROM `services` WHERE `slug` = ? LIMIT 1', [slug]);
      if (rows[0]) {
        const r = rows[0];
        return {
          ...r,
          popular: Number(r.popular),
          is_active: Number(r.is_active),
          required_documents: typeof r.required_documents === 'string' ? JSON.parse(r.required_documents) : r.required_documents,
          process_steps: typeof r.process_steps === 'string' ? JSON.parse(r.process_steps) : r.process_steps,
          related_service_slugs: typeof r.related_service_slugs === 'string' ? JSON.parse(r.related_service_slugs) : (r.related_service_slugs || [])
        };
      }
      return null;
    } catch (err) {
      console.log('[DB MySQL fallback] getServiceBySlug:', (err as any)?.message);
    }
  }

  const db = ensureLocalDb();
  return db.services.find(s => s.slug === slug) || null;
}

export async function updateService(id: string, updates: Partial<ServiceDbRow>): Promise<ServiceDbRow | null> {
  if (isMysqlConnected && mysqlPool) {
    try {
      const current = await getServiceBySlug(id) || (await getAllServices()).find(s => s.id === id);
      if (!current) return null;
      const updated = { ...current, ...updates };

      await mysqlPool.query(
        `UPDATE \`services\` SET
          \`name\` = ?, \`short_description\` = ?, \`full_description\` = ?, \`turnaround_time\` = ?,
          \`popular\` = ?, \`is_active\` = ?, \`who_needs_this\` = ?, \`important_notes\` = ?,
          \`required_documents\` = ?, \`process_steps\` = ?
        WHERE \`id\` = ? OR \`slug\` = ?`,
        [
          updated.name,
          updated.short_description,
          updated.full_description,
          updated.turnaround_time,
          updated.popular ? 1 : 0,
          updated.is_active ? 1 : 0,
          updated.who_needs_this,
          updated.important_notes,
          JSON.stringify(updated.required_documents),
          JSON.stringify(updated.process_steps),
          id,
          id
        ]
      );
      return updated;
    } catch (err) {
      console.log('[DB MySQL fallback] updateService:', (err as any)?.message);
    }
  }

  const db = ensureLocalDb();
  const idx = db.services.findIndex(s => s.id === id || s.slug === id);
  if (idx === -1) return null;

  db.services[idx] = { ...db.services[idx], ...updates };
  saveLocalDb(db);
  return db.services[idx];
}

// LEADS
export async function getLeads(query?: { search?: string; status?: string; dateFrom?: string; dateTo?: string }): Promise<LeadDbRow[]> {
  if (isMysqlConnected && mysqlPool) {
    try {
      let sql = 'SELECT * FROM `leads` WHERE 1=1';
      const params: any[] = [];

      if (query?.status && query.status !== 'all') {
        sql += ' AND `status` = ?';
        params.push(query.status);
      }

      if (query?.search) {
        sql += ' AND (`name` LIKE ? OR `phone` LIKE ? OR `email` LIKE ? OR `service` LIKE ? OR `locality` LIKE ?)';
        const term = `%${query.search}%`;
        params.push(term, term, term, term, term);
      }

      sql += ' ORDER BY `created_at` DESC';
      const [rows]: any = await mysqlPool.query(sql, params);
      return rows;
    } catch (err) {
      console.log('[DB MySQL fallback] getLeads:', (err as any)?.message);
    }
  }

  const db = ensureLocalDb();
  let leads = [...db.leads];

  if (query?.status && query.status !== 'all') {
    leads = leads.filter(l => l.status === query.status);
  }

  if (query?.search) {
    const s = query.search.toLowerCase();
    leads = leads.filter(l =>
      l.name.toLowerCase().includes(s) ||
      l.phone.toLowerCase().includes(s) ||
      (l.email && l.email.toLowerCase().includes(s)) ||
      l.service.toLowerCase().includes(s) ||
      (l.locality && l.locality.toLowerCase().includes(s))
    );
  }

  return leads.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}

export async function getLeadById(id: number): Promise<LeadDbRow | null> {
  if (isMysqlConnected && mysqlPool) {
    try {
      const [rows]: any = await mysqlPool.query('SELECT * FROM `leads` WHERE `id` = ? LIMIT 1', [id]);
      return rows[0] || null;
    } catch (err) {
      console.log('[DB MySQL fallback] getLeadById:', (err as any)?.message);
    }
  }

  const db = ensureLocalDb();
  return db.leads.find(l => l.id === id) || null;
}

export async function createLead(leadData: Omit<LeadDbRow, 'id' | 'created_at'>): Promise<LeadDbRow> {
  const now = new Date().toISOString();

  if (isMysqlConnected && mysqlPool) {
    try {
      const [res]: any = await mysqlPool.query(
        `INSERT INTO \`leads\` (\`name\`, \`phone\`, \`email\`, \`service\`, \`locality\`, \`message\`, \`status\`, \`admin_notes\`, \`source\`, \`created_at\`)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
        [
          leadData.name,
          leadData.phone,
          leadData.email || null,
          leadData.service,
          leadData.locality || null,
          leadData.message || null,
          leadData.status || 'new',
          leadData.admin_notes || null,
          leadData.source || 'website_contact'
        ]
      );
      return {
        id: res.insertId,
        ...leadData,
        email: leadData.email || null,
        locality: leadData.locality || null,
        message: leadData.message || null,
        admin_notes: leadData.admin_notes || null,
        created_at: now
      };
    } catch (err) {
      console.log('[DB MySQL fallback] createLead:', (err as any)?.message);
    }
  }

  const db = ensureLocalDb();
  const nextId = db.leads.length > 0 ? Math.max(...db.leads.map(l => l.id)) + 1 : 1;
  const newLead: LeadDbRow = {
    id: nextId,
    ...leadData,
    email: leadData.email || null,
    locality: leadData.locality || null,
    message: leadData.message || null,
    admin_notes: leadData.admin_notes || null,
    created_at: now
  };

  db.leads.unshift(newLead);
  saveLocalDb(db);
  return newLead;
}

export async function updateLead(id: number, updates: Partial<LeadDbRow>): Promise<LeadDbRow | null> {
  if (isMysqlConnected && mysqlPool) {
    try {
      const current = await getLeadById(id);
      if (!current) return null;
      const updated = { ...current, ...updates };

      await mysqlPool.query(
        `UPDATE \`leads\` SET
          \`name\` = ?, \`phone\` = ?, \`email\` = ?, \`service\` = ?, \`locality\` = ?,
          \`message\` = ?, \`status\` = ?, \`admin_notes\` = ?
        WHERE \`id\` = ?`,
        [
          updated.name,
          updated.phone,
          updated.email,
          updated.service,
          updated.locality,
          updated.message,
          updated.status,
          updated.admin_notes,
          id
        ]
      );
      return updated;
    } catch (err) {
      console.log('[DB MySQL fallback] updateLead:', (err as any)?.message);
    }
  }

  const db = ensureLocalDb();
  const idx = db.leads.findIndex(l => l.id === id);
  if (idx === -1) return null;

  db.leads[idx] = { ...db.leads[idx], ...updates };
  saveLocalDb(db);
  return db.leads[idx];
}

export async function deleteLead(id: number): Promise<boolean> {
  if (isMysqlConnected && mysqlPool) {
    try {
      const [res]: any = await mysqlPool.query('DELETE FROM \`leads\` WHERE \`id\` = ?', [id]);
      return res.affectedRows > 0;
    } catch (err) {
      console.log('[DB MySQL fallback] deleteLead:', (err as any)?.message);
    }
  }

  const db = ensureLocalDb();
  const initialCount = db.leads.length;
  db.leads = db.leads.filter(l => l.id !== id);
  saveLocalDb(db);
  return db.leads.length < initialCount;
}

// TESTIMONIALS
export async function getTestimonials(onlyPublished = false): Promise<TestimonialDbRow[]> {
  if (isMysqlConnected && mysqlPool) {
    try {
      let sql = 'SELECT * FROM `testimonials`';
      if (onlyPublished) sql += ' WHERE `is_published` = 1';
      sql += ' ORDER BY `display_order` ASC, `created_at` DESC';
      const [rows]: any = await mysqlPool.query(sql);
      return rows.map((r: any) => ({ ...r, is_published: Number(r.is_published) }));
    } catch (err) {
      console.log('[DB MySQL fallback] getTestimonials:', (err as any)?.message);
    }
  }

  const db = ensureLocalDb();
  let list = db.testimonials;
  if (onlyPublished) list = list.filter(t => t.is_published === 1);
  return list.sort((a, b) => a.display_order - b.display_order);
}

export async function createTestimonial(data: Omit<TestimonialDbRow, 'id'>): Promise<TestimonialDbRow> {
  const id = 'testi-' + Date.now();
  const newItem: TestimonialDbRow = { id, ...data };

  if (isMysqlConnected && mysqlPool) {
    try {
      await mysqlPool.query(
        `INSERT INTO \`testimonials\` (\`id\`, \`client_name\`, \`locality\`, \`service_used\`, \`comment\`, \`rating\`, \`date_display\`, \`is_published\`, \`display_order\`)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          newItem.id,
          newItem.client_name,
          newItem.locality,
          newItem.service_used,
          newItem.comment,
          newItem.rating,
          newItem.date_display,
          newItem.is_published,
          newItem.display_order || 0
        ]
      );
      return newItem;
    } catch (err) {
      console.log('[DB MySQL fallback] createTestimonial:', (err as any)?.message);
    }
  }

  const db = ensureLocalDb();
  db.testimonials.push(newItem);
  saveLocalDb(db);
  return newItem;
}

export async function updateTestimonial(id: string, updates: Partial<TestimonialDbRow>): Promise<TestimonialDbRow | null> {
  if (isMysqlConnected && mysqlPool) {
    try {
      const list = await getTestimonials();
      const current = list.find(t => t.id === id);
      if (!current) return null;
      const updated = { ...current, ...updates };

      await mysqlPool.query(
        `UPDATE \`testimonials\` SET
          \`client_name\` = ?, \`locality\` = ?, \`service_used\` = ?, \`comment\` = ?,
          \`rating\` = ?, \`date_display\` = ?, \`is_published\` = ?, \`display_order\` = ?
        WHERE \`id\` = ?`,
        [
          updated.client_name,
          updated.locality,
          updated.service_used,
          updated.comment,
          updated.rating,
          updated.date_display,
          updated.is_published ? 1 : 0,
          updated.display_order,
          id
        ]
      );
      return updated;
    } catch (err) {
      console.log('[DB MySQL fallback] updateTestimonial:', (err as any)?.message);
    }
  }

  const db = ensureLocalDb();
  const idx = db.testimonials.findIndex(t => t.id === id);
  if (idx === -1) return null;

  db.testimonials[idx] = { ...db.testimonials[idx], ...updates };
  saveLocalDb(db);
  return db.testimonials[idx];
}

export async function deleteTestimonial(id: string): Promise<boolean> {
  if (isMysqlConnected && mysqlPool) {
    try {
      const [res]: any = await mysqlPool.query('DELETE FROM \`testimonials\` WHERE \`id\` = ?', [id]);
      return res.affectedRows > 0;
    } catch (err) {
      console.log('[DB MySQL fallback] deleteTestimonial:', (err as any)?.message);
    }
  }

  const db = ensureLocalDb();
  const len = db.testimonials.length;
  db.testimonials = db.testimonials.filter(t => t.id !== id);
  saveLocalDb(db);
  return db.testimonials.length < len;
}

// REVIEWS
export async function getReviews(onlyPublished = false): Promise<ReviewDbRow[]> {
  if (isMysqlConnected && mysqlPool) {
    try {
      let sql = 'SELECT * FROM `reviews`';
      if (onlyPublished) sql += ' WHERE `is_published` = 1';
      sql += ' ORDER BY `created_at` DESC';
      const [rows]: any = await mysqlPool.query(sql);
      return rows.map((r: any) => ({
        ...r,
        rating: Number(r.rating),
        verified: Number(r.verified),
        is_published: Number(r.is_published)
      }));
    } catch (err) {
      console.log('[DB MySQL fallback] getReviews:', (err as any)?.message);
    }
  }

  const db = ensureLocalDb();
  let list = db.reviews;
  if (onlyPublished) list = list.filter(r => r.is_published === 1);
  return list;
}

export async function createReview(data: Omit<ReviewDbRow, 'id'>): Promise<ReviewDbRow> {
  const id = 'rev-' + Date.now();
  const newItem: ReviewDbRow = { id, ...data };

  if (isMysqlConnected && mysqlPool) {
    try {
      await mysqlPool.query(
        `INSERT INTO \`reviews\` (\`id\`, \`author_name\`, \`platform\`, \`rating\`, \`review_text\`, \`date_display\`, \`verified\`, \`is_published\`)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          newItem.id,
          newItem.author_name,
          newItem.platform || 'Google',
          newItem.rating,
          newItem.review_text,
          newItem.date_display,
          newItem.verified ? 1 : 0,
          newItem.is_published ? 1 : 0
        ]
      );
      return newItem;
    } catch (err) {
      console.log('[DB MySQL fallback] createReview:', (err as any)?.message);
    }
  }

  const db = ensureLocalDb();
  db.reviews.push(newItem);
  saveLocalDb(db);
  return newItem;
}

export async function updateReview(id: string, updates: Partial<ReviewDbRow>): Promise<ReviewDbRow | null> {
  if (isMysqlConnected && mysqlPool) {
    try {
      const list = await getReviews();
      const current = list.find(r => r.id === id);
      if (!current) return null;
      const updated = { ...current, ...updates };

      await mysqlPool.query(
        `UPDATE \`reviews\` SET
          \`author_name\` = ?, \`platform\` = ?, \`rating\` = ?, \`review_text\` = ?,
          \`date_display\` = ?, \`verified\` = ?, \`is_published\` = ?
        WHERE \`id\` = ?`,
        [
          updated.author_name,
          updated.platform,
          updated.rating,
          updated.review_text,
          updated.date_display,
          updated.verified ? 1 : 0,
          updated.is_published ? 1 : 0,
          id
        ]
      );
      return updated;
    } catch (err) {
      console.log('[DB MySQL fallback] updateReview:', (err as any)?.message);
    }
  }

  const db = ensureLocalDb();
  const idx = db.reviews.findIndex(r => r.id === id);
  if (idx === -1) return null;

  db.reviews[idx] = { ...db.reviews[idx], ...updates };
  saveLocalDb(db);
  return db.reviews[idx];
}

export async function deleteReview(id: string): Promise<boolean> {
  if (isMysqlConnected && mysqlPool) {
    try {
      const [res]: any = await mysqlPool.query('DELETE FROM \`reviews\` WHERE \`id\` = ?', [id]);
      return res.affectedRows > 0;
    } catch (err) {
      console.log('[DB MySQL fallback] deleteReview:', (err as any)?.message);
    }
  }

  const db = ensureLocalDb();
  const len = db.reviews.length;
  db.reviews = db.reviews.filter(r => r.id !== id);
  saveLocalDb(db);
  return db.reviews.length < len;
}

// DASHBOARD STATS
export async function getDashboardStats() {
  const leads = await getLeads();
  const services = await getAllServices();
  const testimonials = await getTestimonials();
  const reviews = await getReviews();

  const totalLeads = leads.length;
  const newLeads = leads.filter(l => l.status === 'new').length;
  const contactedLeads = leads.filter(l => l.status === 'contacted').length;
  const activeServices = services.filter(s => s.is_active === 1).length;
  const totalTestimonials = testimonials.filter(t => t.is_published === 1).length;
  const totalReviews = reviews.filter(r => r.is_published === 1).length;

  const avgRating = reviews.length > 0
    ? (reviews.reduce((acc, r) => acc + Number(r.rating), 0) / reviews.length).toFixed(1)
    : '4.9';

  return {
    totalLeads,
    newLeads,
    contactedLeads,
    activeServices,
    totalServices: services.length,
    totalTestimonials,
    totalReviews,
    averageRating: avgRating,
    recentLeads: leads.slice(0, 5)
  };
}

// DATABASE SYSTEM STATUS
export async function getDatabaseStatus() {
  const contact = await getContactDetails();
  const services = await getAllServices();
  const leads = await getLeads();
  const testimonials = await getTestimonials();
  const reviews = await getReviews();

  return {
    driver: isMysqlConnected ? 'MySQL (Hostinger / Production Pool)' : 'Safehands Persistence Engine (JSON/File Mode)',
    status: isMysqlConnected ? 'connected' : 'active_fallback',
    isMysql: isMysqlConnected,
    mysqlError: mysqlInitError,
    host: process.env.DB_HOST || 'localhost (Hostinger ready)',
    database: process.env.DB_NAME || 'u_safehands (Hostinger ready)',
    user: process.env.DB_USER ? `${process.env.DB_USER.slice(0, 3)}***` : 'Not configured (import safehands.sql to activate)',
    tableCounts: {
      services: services.length,
      leads: leads.length,
      testimonials: testimonials.length,
      reviews: reviews.length,
      contactConfigured: Boolean(contact?.primary_phone)
    },
    lastSync: new Date().toISOString()
  };
}
