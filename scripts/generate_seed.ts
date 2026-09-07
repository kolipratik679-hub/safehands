import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import { ALL_SERVICES_DATA, CATEGORIES_DATA } from '../src/data/servicesData';
import { CLIENT_EXPERIENCES } from '../src/data/faqsData';

const adminPasswordHash = bcrypt.hashSync('safehands@8989', 10);

const initialContactDetails = {
  id: 1,
  primary_phone: '+91 76660 40771',
  secondary_phone: '+91 80977 59771',
  whatsapp_number: '+91 76660 40771',
  email: 'safehands0977@gmail.com',
  address_line1: 'Shop No. 4, Plot No. 284, Hari Vithal Complex',
  address_line2: 'Sector R3, Pushpak Old Panvel, Vadghar',
  city: 'Panvel',
  district: 'Raigad',
  state: 'Maharashtra',
  pincode: '410220',
  business_hours: 'Monday - Saturday: 9:00 AM - 7:00 PM | Sunday: Closed (WhatsApp queries attended)',
  google_map_embed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3772.637731766861!2d73.1162!3d18.9926!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDU5JzMzLjQiTiA3M8KwMDYnNTguMyJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin',
  google_map_url: 'https://maps.google.com/?q=Hari+Vithal+Complex+Pushpak+Old+Panvel+Vadghar+Raigad+410220'
};

const initialTestimonials = CLIENT_EXPERIENCES.map((exp, idx) => ({
  id: exp.id,
  client_name: exp.clientName,
  locality: exp.locality,
  service_used: exp.serviceUsed,
  comment: exp.comment,
  rating: 5,
  date_display: exp.date,
  is_published: 1,
  display_order: idx + 1
}));

const initialReviews = [
  {
    id: 'rev-1',
    author_name: 'Kiran Deshmukh',
    platform: 'Google',
    rating: 5.0,
    review_text: 'Excellent service for shop establishment licence and Udyam registration. Transparent guidance with no hidden charges. Highly recommended for business documentation in Panvel.',
    date_display: 'July 2026',
    verified: 1,
    is_published: 1
  },
  {
    id: 'rev-2',
    author_name: 'Ramesh Gharat',
    platform: 'Google',
    rating: 5.0,
    review_text: 'Visited their Hari Vithal Complex office in Panvel for my income certificate. The team explained the procedure clearly and verified every document before portal submission.',
    date_display: 'August 2026',
    verified: 1,
    is_published: 1
  },
  {
    id: 'rev-3',
    author_name: 'Pravin Gaikwad',
    platform: 'Google',
    rating: 5.0,
    review_text: 'Helped us organize paperwork for a personal loan without unnecessary delays. Staff is polite, responsive on WhatsApp, and understands bank requirements thoroughly.',
    date_display: 'August 2026',
    verified: 1,
    is_published: 1
  },
  {
    id: 'rev-4',
    author_name: 'Sneha Joshi',
    platform: 'Google',
    rating: 5.0,
    review_text: 'Best documentation consultation in Pushpak Old Panvel area. They reviewed my Aadhaar and PAN documents properly before submission so nothing got rejected.',
    date_display: 'September 2026',
    verified: 1,
    is_published: 1
  }
];

const initialLeads = [
  {
    id: 1,
    name: 'Vikram Shinde',
    phone: '+91 98201 45678',
    email: 'vikram.shinde@example.com',
    service: 'GST Registration & Udyam Filing',
    locality: 'Khanda Colony, Panvel',
    message: 'Need GST registration for a new retail hardware store starting next month.',
    status: 'new',
    admin_notes: 'Urgent filing requested before 15th.',
    source: 'website_contact',
    created_at: new Date(Date.now() - 2 * 3600 * 1000).toISOString()
  },
  {
    id: 2,
    name: 'Anjali Patil',
    phone: '+91 97654 32109',
    email: 'anjali.patil@example.com',
    service: 'Income Certificate',
    locality: 'Pushpak Nagar, Old Panvel',
    message: 'Need income certificate for engineering scholarship application deadline.',
    status: 'contacted',
    admin_notes: 'Ration card and salary certificate verified on WhatsApp.',
    source: 'enquiry_modal',
    created_at: new Date(Date.now() - 24 * 3600 * 1000).toISOString()
  }
];

const initialDataTs = `// Safehands Initial Database Seed Data (Source of Truth)
export interface ServiceDbRow {
  id: string;
  slug: string;
  name: string;
  category: string;
  category_name: string;
  icon_name: string;
  short_description: string;
  full_description: string;
  turnaround_time: string;
  popular: number;
  is_active: number;
  who_needs_this: string;
  important_notes: string;
  required_documents: string[];
  process_steps: string[];
  related_service_slugs: string[];
  display_order: number;
}

export const INITIAL_ADMIN_USER = {
  id: 1,
  email: 'safehands@gmail.com',
  password_hash: '${adminPasswordHash}',
  role: 'admin'
};

export const INITIAL_CONTACT_DETAILS = ${JSON.stringify(initialContactDetails, null, 2)};

export const INITIAL_TESTIMONIALS = ${JSON.stringify(initialTestimonials, null, 2)};

export const INITIAL_REVIEWS = ${JSON.stringify(initialReviews, null, 2)};

export const INITIAL_LEADS = ${JSON.stringify(initialLeads, null, 2)};

export const INITIAL_SERVICES: ServiceDbRow[] = ${JSON.stringify(
  ALL_SERVICES_DATA.map((s, idx) => ({
    id: s.id,
    slug: s.slug,
    name: s.name,
    category: s.category,
    category_name: s.categoryName,
    icon_name: s.iconName,
    short_description: s.shortDescription,
    full_description: s.fullDescription,
    turnaround_time: s.turnaroundTime,
    popular: s.popular ? 1 : 0,
    is_active: 1,
    who_needs_this: s.whoNeedsThis || '',
    important_notes: s.importantNotes || '',
    required_documents: s.requiredDocuments || [],
    process_steps: s.processSteps || [],
    related_service_slugs: s.relatedServiceSlugs || [],
    display_order: idx + 1
  })),
  null,
  2
)};
`;

fs.writeFileSync(path.join(process.cwd(), 'server/data/initialData.ts'), initialDataTs);
console.log('Wrote server/data/initialData.ts');

// Now generate safehands.sql
function escapeSql(str: string): string {
  if (str === null || str === undefined) return 'NULL';
  return "'" + str.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n').replace(/\r/g, '\\r') + "'";
}

let sql = `-- ===================================================================
-- Safehands Enterprises - MySQL Database Dump
-- Ready for Direct Import in Hostinger phpMyAdmin
-- Generated for Safehands Enterprises Management & Website Live Sync
-- ===================================================================

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+05:30";

-- -------------------------------------------------------------------
-- Table structure for \`admin_users\`
-- -------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS \`admin_users\` (
  \`id\` INT AUTO_INCREMENT PRIMARY KEY,
  \`email\` VARCHAR(191) NOT NULL UNIQUE,
  \`password_hash\` VARCHAR(255) NOT NULL,
  \`role\` VARCHAR(50) NOT NULL DEFAULT 'admin',
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------------
-- Initial Admin User (safehands@gmail.com / safehands@8989)
-- -------------------------------------------------------------------
INSERT INTO \`admin_users\` (\`id\`, \`email\`, \`password_hash\`, \`role\`)
VALUES (1, 'safehands@gmail.com', '${adminPasswordHash}', 'admin')
ON DUPLICATE KEY UPDATE \`password_hash\` = VALUES(\`password_hash\`);

-- -------------------------------------------------------------------
-- Table structure for \`contact_details\`
-- -------------------------------------------------------------------
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

-- -------------------------------------------------------------------
-- Seed \`contact_details\`
-- -------------------------------------------------------------------
INSERT INTO \`contact_details\` (
  \`id\`, \`primary_phone\`, \`secondary_phone\`, \`whatsapp_number\`, \`email\`,
  \`address_line1\`, \`address_line2\`, \`city\`, \`district\`, \`state\`, \`pincode\`,
  \`business_hours\`, \`google_map_embed\`, \`google_map_url\`
) VALUES (
  1,
  ${escapeSql(initialContactDetails.primary_phone)},
  ${escapeSql(initialContactDetails.secondary_phone)},
  ${escapeSql(initialContactDetails.whatsapp_number)},
  ${escapeSql(initialContactDetails.email)},
  ${escapeSql(initialContactDetails.address_line1)},
  ${escapeSql(initialContactDetails.address_line2)},
  ${escapeSql(initialContactDetails.city)},
  ${escapeSql(initialContactDetails.district)},
  ${escapeSql(initialContactDetails.state)},
  ${escapeSql(initialContactDetails.pincode)},
  ${escapeSql(initialContactDetails.business_hours)},
  ${escapeSql(initialContactDetails.google_map_embed)},
  ${escapeSql(initialContactDetails.google_map_url)}
) ON DUPLICATE KEY UPDATE
  \`primary_phone\` = VALUES(\`primary_phone\`),
  \`secondary_phone\` = VALUES(\`secondary_phone\`),
  \`whatsapp_number\` = VALUES(\`whatsapp_number\`),
  \`email\` = VALUES(\`email\`),
  \`address_line1\` = VALUES(\`address_line1\`),
  \`address_line2\` = VALUES(\`address_line2\`),
  \`city\` = VALUES(\`city\`),
  \`district\` = VALUES(\`district\`),
  \`state\` = VALUES(\`state\`),
  \`pincode\` = VALUES(\`pincode\`),
  \`business_hours\` = VALUES(\`business_hours\`),
  \`google_map_embed\` = VALUES(\`google_map_embed\`),
  \`google_map_url\` = VALUES(\`google_map_url\`);

-- -------------------------------------------------------------------
-- Table structure for \`services\`
-- -------------------------------------------------------------------
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
  \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX \`idx_category\` (\`category\`),
  INDEX \`idx_active\` (\`is_active\`),
  INDEX \`idx_popular\` (\`popular\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------------
-- Table structure for \`leads\`
-- -------------------------------------------------------------------
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
  \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX \`idx_status\` (\`status\`),
  INDEX \`idx_created_at\` (\`created_at\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------------
-- Table structure for \`testimonials\`
-- -------------------------------------------------------------------
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
  \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX \`idx_published\` (\`is_published\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------------
-- Table structure for \`reviews\`
-- -------------------------------------------------------------------
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
  \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX \`idx_published\` (\`is_published\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------------
-- Table structure for \`site_settings\`
-- -------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS \`site_settings\` (
  \`setting_key\` VARCHAR(100) PRIMARY KEY,
  \`setting_value\` TEXT NOT NULL,
  \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------------
-- Seed \`site_settings\`
-- -------------------------------------------------------------------
INSERT INTO \`site_settings\` (\`setting_key\`, \`setting_value\`) VALUES
('site_name', 'Safehands Enterprises'),
('tagline', 'Client Coordination, Documentation & Administrative Support Services in Panvel'),
('average_rating', '4.9'),
('total_reviews_count', '128'),
('years_of_experience', '10+')
ON DUPLICATE KEY UPDATE \`setting_value\` = VALUES(\`setting_value\`);

-- -------------------------------------------------------------------
-- Seed \`services\` (24 Services from Safehands Catalogue)
-- -------------------------------------------------------------------
`;

for (let i = 0; i < ALL_SERVICES_DATA.length; i++) {
  const s = ALL_SERVICES_DATA[i];
  sql += `INSERT INTO \`services\` (
  \`id\`, \`slug\`, \`name\`, \`category\`, \`category_name\`, \`icon_name\`,
  \`short_description\`, \`full_description\`, \`turnaround_time\`,
  \`popular\`, \`is_active\`, \`who_needs_this\`, \`important_notes\`,
  \`required_documents\`, \`process_steps\`, \`related_service_slugs\`, \`display_order\`
) VALUES (
  ${escapeSql(s.id)},
  ${escapeSql(s.slug)},
  ${escapeSql(s.name)},
  ${escapeSql(s.category)},
  ${escapeSql(s.categoryName)},
  ${escapeSql(s.iconName)},
  ${escapeSql(s.shortDescription)},
  ${escapeSql(s.fullDescription)},
  ${escapeSql(s.turnaroundTime)},
  ${s.popular ? 1 : 0},
  1,
  ${escapeSql(s.whoNeedsThis || '')},
  ${escapeSql(s.importantNotes || '')},
  ${escapeSql(JSON.stringify(s.requiredDocuments || []))},
  ${escapeSql(JSON.stringify(s.processSteps || []))},
  ${escapeSql(JSON.stringify(s.relatedServiceSlugs || []))},
  ${i + 1}
) ON DUPLICATE KEY UPDATE
  \`name\` = VALUES(\`name\`),
  \`category\` = VALUES(\`category\`),
  \`category_name\` = VALUES(\`category_name\`),
  \`icon_name\` = VALUES(\`icon_name\`),
  \`short_description\` = VALUES(\`short_description\`),
  \`full_description\` = VALUES(\`full_description\`),
  \`turnaround_time\` = VALUES(\`turnaround_time\`),
  \`popular\` = VALUES(\`popular\`),
  \`who_needs_this\` = VALUES(\`who_needs_this\`),
  \`important_notes\` = VALUES(\`important_notes\`),
  \`required_documents\` = VALUES(\`required_documents\`),
  \`process_steps\` = VALUES(\`process_steps\`),
  \`related_service_slugs\` = VALUES(\`related_service_slugs\`);\n\n`;
}

sql += `-- -------------------------------------------------------------------
-- Seed \`testimonials\`
-- -------------------------------------------------------------------
`;
for (const t of initialTestimonials) {
  sql += `INSERT INTO \`testimonials\` (
  \`id\`, \`client_name\`, \`locality\`, \`service_used\`, \`comment\`, \`rating\`, \`date_display\`, \`is_published\`, \`display_order\`
) VALUES (
  ${escapeSql(t.id)},
  ${escapeSql(t.client_name)},
  ${escapeSql(t.locality)},
  ${escapeSql(t.service_used)},
  ${escapeSql(t.comment)},
  ${t.rating},
  ${escapeSql(t.date_display)},
  ${t.is_published},
  ${t.display_order}
) ON DUPLICATE KEY UPDATE
  \`client_name\` = VALUES(\`client_name\`),
  \`locality\` = VALUES(\`locality\`),
  \`service_used\` = VALUES(\`service_used\`),
  \`comment\` = VALUES(\`comment\`),
  \`rating\` = VALUES(\`rating\`),
  \`date_display\` = VALUES(\`date_display\`);\n`;
}

sql += `\n-- -------------------------------------------------------------------
-- Seed \`reviews\`
-- -------------------------------------------------------------------
`;
for (const r of initialReviews) {
  sql += `INSERT INTO \`reviews\` (
  \`id\`, \`author_name\`, \`platform\`, \`rating\`, \`review_text\`, \`date_display\`, \`verified\`, \`is_published\`
) VALUES (
  ${escapeSql(r.id)},
  ${escapeSql(r.author_name)},
  ${escapeSql(r.platform)},
  ${r.rating},
  ${escapeSql(r.review_text)},
  ${escapeSql(r.date_display)},
  ${r.verified},
  ${r.is_published}
) ON DUPLICATE KEY UPDATE
  \`author_name\` = VALUES(\`author_name\`),
  \`platform\` = VALUES(\`platform\`),
  \`rating\` = VALUES(\`rating\`),
  \`review_text\` = VALUES(\`review_text\`),
  \`date_display\` = VALUES(\`date_display\`);\n`;
}

sql += `\n-- -------------------------------------------------------------------
-- Seed initial sample \`leads\`
-- -------------------------------------------------------------------
INSERT INTO \`leads\` (\`id\`, \`name\`, \`phone\`, \`email\`, \`service\`, \`locality\`, \`message\`, \`status\`, \`admin_notes\`, \`source\`)
VALUES
(1, 'Vikram Shinde', '+91 98201 45678', 'vikram.shinde@example.com', 'GST Registration & Udyam Filing', 'Khanda Colony, Panvel', 'Need GST registration for a new retail hardware store starting next month.', 'new', 'Urgent filing requested before 15th.', 'website_contact'),
(2, 'Anjali Patil', '+91 97654 32109', 'anjali.patil@example.com', 'Income Certificate', 'Pushpak Nagar, Old Panvel', 'Need income certificate for engineering scholarship application deadline.', 'contacted', 'Ration card and salary certificate verified on WhatsApp.', 'enquiry_modal')
ON DUPLICATE KEY UPDATE \`name\` = VALUES(\`name\`);\n`;

fs.writeFileSync(path.join(process.cwd(), 'safehands.sql'), sql);
fs.writeFileSync(path.join(process.cwd(), 'public/safehands.sql'), sql);
console.log('Wrote safehands.sql and public/safehands.sql');
