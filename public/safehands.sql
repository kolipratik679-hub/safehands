-- ===================================================================
-- Safehands Enterprises - MySQL Database Dump
-- Ready for Direct Import in Hostinger phpMyAdmin
-- Generated for Safehands Enterprises Management & Website Live Sync
-- ===================================================================

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+05:30";

-- -------------------------------------------------------------------
-- Table structure for `admin_users`
-- -------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `admin_users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `email` VARCHAR(191) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `role` VARCHAR(50) NOT NULL DEFAULT 'admin',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------------
-- Initial Admin User (safehands@gmail.com / safehands@8989)
-- -------------------------------------------------------------------
INSERT INTO `admin_users` (`id`, `email`, `password_hash`, `role`)
VALUES (1, 'safehands@gmail.com', '$2b$10$JRWmMqt172qL/6qel2vDeuO9e/yipA.gmL1IwyCZWQvEYjO5/eAN2', 'admin')
ON DUPLICATE KEY UPDATE `password_hash` = VALUES(`password_hash`);

-- -------------------------------------------------------------------
-- Table structure for `contact_details`
-- -------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `contact_details` (
  `id` INT PRIMARY KEY DEFAULT 1,
  `primary_phone` VARCHAR(50) NOT NULL,
  `secondary_phone` VARCHAR(50) NOT NULL,
  `whatsapp_number` VARCHAR(50) NOT NULL,
  `email` VARCHAR(191) NOT NULL,
  `address_line1` VARCHAR(255) NOT NULL,
  `address_line2` VARCHAR(255) NOT NULL,
  `city` VARCHAR(100) NOT NULL,
  `district` VARCHAR(100) NOT NULL,
  `state` VARCHAR(100) NOT NULL,
  `pincode` VARCHAR(20) NOT NULL,
  `business_hours` VARCHAR(255) NOT NULL,
  `google_map_embed` TEXT,
  `google_map_url` TEXT,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------------
-- Seed `contact_details`
-- -------------------------------------------------------------------
INSERT INTO `contact_details` (
  `id`, `primary_phone`, `secondary_phone`, `whatsapp_number`, `email`,
  `address_line1`, `address_line2`, `city`, `district`, `state`, `pincode`,
  `business_hours`, `google_map_embed`, `google_map_url`
) VALUES (
  1,
  '+91 76660 40771',
  '+91 80977 59771',
  '+91 76660 40771',
  'safehands0977@gmail.com',
  'Shop No. 4, Plot No. 284, Hari Vithal Complex',
  'Sector R3, Pushpak Old Panvel, Vadghar',
  'Panvel',
  'Raigad',
  'Maharashtra',
  '410220',
  'Monday - Saturday: 9:00 AM - 7:00 PM | Sunday: Closed (WhatsApp queries attended)',
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3772.637731766861!2d73.1162!3d18.9926!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDU5JzMzLjQiTiA3M8KwMDYnNTguMyJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin',
  'https://maps.google.com/?q=Hari+Vithal+Complex+Pushpak+Old+Panvel+Vadghar+Raigad+410220'
) ON DUPLICATE KEY UPDATE
  `primary_phone` = VALUES(`primary_phone`),
  `secondary_phone` = VALUES(`secondary_phone`),
  `whatsapp_number` = VALUES(`whatsapp_number`),
  `email` = VALUES(`email`),
  `address_line1` = VALUES(`address_line1`),
  `address_line2` = VALUES(`address_line2`),
  `city` = VALUES(`city`),
  `district` = VALUES(`district`),
  `state` = VALUES(`state`),
  `pincode` = VALUES(`pincode`),
  `business_hours` = VALUES(`business_hours`),
  `google_map_embed` = VALUES(`google_map_embed`),
  `google_map_url` = VALUES(`google_map_url`);

-- -------------------------------------------------------------------
-- Table structure for `services`
-- -------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `services` (
  `id` VARCHAR(100) PRIMARY KEY,
  `slug` VARCHAR(191) NOT NULL UNIQUE,
  `name` VARCHAR(255) NOT NULL,
  `category` VARCHAR(100) NOT NULL,
  `category_name` VARCHAR(255) NOT NULL,
  `icon_name` VARCHAR(100) NOT NULL,
  `short_description` TEXT NOT NULL,
  `full_description` MEDIUMTEXT NOT NULL,
  `turnaround_time` VARCHAR(100) NOT NULL,
  `popular` TINYINT(1) NOT NULL DEFAULT 0,
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `who_needs_this` TEXT,
  `important_notes` TEXT,
  `required_documents` JSON,
  `process_steps` JSON,
  `related_service_slugs` JSON,
  `display_order` INT NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_category` (`category`),
  INDEX `idx_active` (`is_active`),
  INDEX `idx_popular` (`popular`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------------
-- Table structure for `leads`
-- -------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `leads` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(191) NOT NULL,
  `phone` VARCHAR(50) NOT NULL,
  `email` VARCHAR(191),
  `service` VARCHAR(191) NOT NULL,
  `locality` VARCHAR(191),
  `message` TEXT,
  `status` VARCHAR(50) NOT NULL DEFAULT 'new',
  `admin_notes` TEXT,
  `source` VARCHAR(50) NOT NULL DEFAULT 'website_contact',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_status` (`status`),
  INDEX `idx_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------------
-- Table structure for `testimonials`
-- -------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `testimonials` (
  `id` VARCHAR(100) PRIMARY KEY,
  `client_name` VARCHAR(191) NOT NULL,
  `locality` VARCHAR(191) NOT NULL,
  `service_used` VARCHAR(191) NOT NULL,
  `comment` TEXT NOT NULL,
  `rating` INT NOT NULL DEFAULT 5,
  `date_display` VARCHAR(100) NOT NULL,
  `is_published` TINYINT(1) NOT NULL DEFAULT 1,
  `display_order` INT NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_published` (`is_published`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------------
-- Table structure for `reviews`
-- -------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `reviews` (
  `id` VARCHAR(100) PRIMARY KEY,
  `author_name` VARCHAR(191) NOT NULL,
  `platform` VARCHAR(50) NOT NULL DEFAULT 'Google',
  `rating` DECIMAL(2,1) NOT NULL DEFAULT 5.0,
  `review_text` TEXT NOT NULL,
  `date_display` VARCHAR(100) NOT NULL,
  `verified` TINYINT(1) NOT NULL DEFAULT 1,
  `is_published` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_published` (`is_published`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------------
-- Table structure for `site_settings`
-- -------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `site_settings` (
  `setting_key` VARCHAR(100) PRIMARY KEY,
  `setting_value` TEXT NOT NULL,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------------
-- Seed `site_settings`
-- -------------------------------------------------------------------
INSERT INTO `site_settings` (`setting_key`, `setting_value`) VALUES
('site_name', 'Safehands Enterprises'),
('tagline', 'Client Coordination, Documentation & Administrative Support Services in Panvel'),
('average_rating', '4.9'),
('total_reviews_count', '128'),
('years_of_experience', '10+')
ON DUPLICATE KEY UPDATE `setting_value` = VALUES(`setting_value`);

-- -------------------------------------------------------------------
-- Seed `services` (24 Services from Safehands Catalogue)
-- -------------------------------------------------------------------
INSERT INTO `services` (
  `id`, `slug`, `name`, `category`, `category_name`, `icon_name`,
  `short_description`, `full_description`, `turnaround_time`,
  `popular`, `is_active`, `who_needs_this`, `important_notes`,
  `required_documents`, `process_steps`, `related_service_slugs`, `display_order`
) VALUES (
  'gst-registration-filing',
  'gst-registration-filing',
  'GST Registration & Filing',
  'business-tax',
  'Business & Tax Services',
  'FileSpreadsheet',
  'Fresh GST registration for proprietors, partnerships, and companies, plus regular monthly and quarterly return filing (GSTR-1, GSTR-3B).',
  'Comprehensive guidance for obtaining a new Goods and Services Tax Identification Number (GSTIN) and keeping your business compliant with periodic returns. We assist small business owners, traders, and service providers across Panvel and Raigad with document compilation, portal submission, and regular filing.',
  '3 - 7 Working Days (Registration)',
  1,
  1,
  'Traders, manufacturers, e-commerce sellers, contractors, and service providers exceeding GST thresholds or requiring voluntary registration for business tenders.',
  'Timely filing of GSTR-1 and GSTR-3B prevents late fees and interest penalties.',
  '["PAN Card of Proprietor / Partners / Company","Aadhaar Card of all primary applicants","Electricity Bill / Rent Agreement of business premises","NOC from Property Owner (if rented)","Cancelled Cheque or Bank Statement showing business account details","Passport size photograph of the applicant"]',
  '["Document collection & preliminary verification","Form preparation on GST Portal","Aadhaar biometric / OTP verification","ARN generation and application monitoring","GSTIN Certificate handover & setup for periodic filing"]',
  '["msme-udyam-registration","itr-filing","business-registration"]',
  1
) ON DUPLICATE KEY UPDATE
  `name` = VALUES(`name`),
  `category` = VALUES(`category`),
  `category_name` = VALUES(`category_name`),
  `icon_name` = VALUES(`icon_name`),
  `short_description` = VALUES(`short_description`),
  `full_description` = VALUES(`full_description`),
  `turnaround_time` = VALUES(`turnaround_time`),
  `popular` = VALUES(`popular`),
  `who_needs_this` = VALUES(`who_needs_this`),
  `important_notes` = VALUES(`important_notes`),
  `required_documents` = VALUES(`required_documents`),
  `process_steps` = VALUES(`process_steps`),
  `related_service_slugs` = VALUES(`related_service_slugs`);

INSERT INTO `services` (
  `id`, `slug`, `name`, `category`, `category_name`, `icon_name`,
  `short_description`, `full_description`, `turnaround_time`,
  `popular`, `is_active`, `who_needs_this`, `important_notes`,
  `required_documents`, `process_steps`, `related_service_slugs`, `display_order`
) VALUES (
  'itr-filing',
  'itr-filing',
  'Income Tax Return (ITR) Filing',
  'business-tax',
  'Business & Tax Services',
  'ReceiptText',
  'Professional assistance for filing salaried (ITR-1/2), business (ITR-3/4), and capital gains returns with tax computation.',
  'Accurate and timely filing of your annual Income Tax Returns. Whether you are a salaried employee in Panvel, a shop owner in Pushpak, or a freelancer, we calculate your income, claim applicable deductions, verify Form 26AS and AIS/TIS, and complete e-verification smoothly.',
  '1 - 2 Working Days',
  1,
  1,
  'Salaried employees, business owners, professionals, landlords, and individuals needing clean ITR acknowledgement receipts for bank loans or visa processing.',
  'Having 3 consecutive years of ITR returns is essential for home, vehicle, and business loan applications.',
  '["PAN Card and Aadhaar Card","Form 16 (for salaried individuals)","Bank Account Statements for the full financial year","Details of savings/investments (PPF, LIC, ELSS, Health Insurance)","Home Loan Interest Certificate (if applicable)"]',
  '["Collection of Form 16 / Bank Statements","Download and reconciliation of AIS, TIS & 26AS","Draft tax calculation and deduction optimization","E-filing on the Income Tax Department portal","ITR-V verification assistance and receipt copy delivery"]',
  '["gst-registration-filing","home-loan-assistance","personal-loan-assistance"]',
  2
) ON DUPLICATE KEY UPDATE
  `name` = VALUES(`name`),
  `category` = VALUES(`category`),
  `category_name` = VALUES(`category_name`),
  `icon_name` = VALUES(`icon_name`),
  `short_description` = VALUES(`short_description`),
  `full_description` = VALUES(`full_description`),
  `turnaround_time` = VALUES(`turnaround_time`),
  `popular` = VALUES(`popular`),
  `who_needs_this` = VALUES(`who_needs_this`),
  `important_notes` = VALUES(`important_notes`),
  `required_documents` = VALUES(`required_documents`),
  `process_steps` = VALUES(`process_steps`),
  `related_service_slugs` = VALUES(`related_service_slugs`);

INSERT INTO `services` (
  `id`, `slug`, `name`, `category`, `category_name`, `icon_name`,
  `short_description`, `full_description`, `turnaround_time`,
  `popular`, `is_active`, `who_needs_this`, `important_notes`,
  `required_documents`, `process_steps`, `related_service_slugs`, `display_order`
) VALUES (
  'msme-udyam-registration',
  'msme-udyam-registration',
  'MSME Udyam Registration',
  'business-tax',
  'Business & Tax Services',
  'Building',
  'Official government Udyam registration certificate for micro, small, and medium enterprises to access priority credit and subsidies.',
  'Obtain your official Udyam Registration Certificate issued by the Ministry of MSME. This single certificate unlocks priority bank lending, lower interest rates on enterprise loans, government tender advantages, and protection against delayed buyer payments.',
  '1 - 2 Working Days',
  1,
  1,
  'Retail shop owners, service agencies, small manufacturers, transport operators, and sole proprietors wanting recognized MSME status.',
  'Udyam registration is a lifetime registration and has zero government renewal fees.',
  '["Aadhaar Card of the Proprietor / Director (must be linked with mobile)","PAN Card of Business / Proprietor","Business bank account number and IFSC code","Business Commencement Date & activity details (NIC code)","Total turnover and plant/equipment investment estimate"]',
  '["Verification of Aadhaar and linked mobile for OTP","Appropriate NIC classification of business operations","Submission on the official Udyam portal","Verification by MSME department","Direct generation and printout of Udyam Certificate with QR code"]',
  '["business-registration","gst-registration-filing","business-loan-assistance"]',
  3
) ON DUPLICATE KEY UPDATE
  `name` = VALUES(`name`),
  `category` = VALUES(`category`),
  `category_name` = VALUES(`category_name`),
  `icon_name` = VALUES(`icon_name`),
  `short_description` = VALUES(`short_description`),
  `full_description` = VALUES(`full_description`),
  `turnaround_time` = VALUES(`turnaround_time`),
  `popular` = VALUES(`popular`),
  `who_needs_this` = VALUES(`who_needs_this`),
  `important_notes` = VALUES(`important_notes`),
  `required_documents` = VALUES(`required_documents`),
  `process_steps` = VALUES(`process_steps`),
  `related_service_slugs` = VALUES(`related_service_slugs`);

INSERT INTO `services` (
  `id`, `slug`, `name`, `category`, `category_name`, `icon_name`,
  `short_description`, `full_description`, `turnaround_time`,
  `popular`, `is_active`, `who_needs_this`, `important_notes`,
  `required_documents`, `process_steps`, `related_service_slugs`, `display_order`
) VALUES (
  'business-registration',
  'business-registration',
  'Business Registration & Shop Act',
  'business-tax',
  'Business & Tax Services',
  'Store',
  'Documentation and filing for Maharashtra Shop & Establishment Intimation (Gumasta), Partnership deed coordination, and Proprietorship setup.',
  'Starting a shop, office, or commercial venture in Panvel or Navi Mumbai requires formal municipal and state registration. We facilitate the entire Maharashtra Aaple Sarkar Shop Act Intimation / Gumasta licence process and draft partnership deeds for opening current accounts.',
  '2 - 4 Working Days',
  0,
  1,
  'Any new retail shop, commercial office, cafe, warehouse, or enterprise opening in Panvel Municipal Corporation (PMC) or CIDCO limits.',
  'Banks require the Shop Act / Gumasta registration to open a current bank account.',
  '["Aadhaar Card and PAN Card of employer/owner","Electricity bill of the shop/office premises","Rent Agreement & Owner NOC (if rented)","Photo of the establishment with Marathi nameboard","Partnership deed & partner details (if partnership firm)"]',
  '["Establishment photo and premise paperwork check","Drafting employer details and employee count","Portal submission on Maharashtra Aaple Sarkar platform","Government fee processing","Issuance of formal Shop Act receipt / licence copy"]',
  '["food-licence","msme-udyam-registration","gst-registration-filing"]',
  4
) ON DUPLICATE KEY UPDATE
  `name` = VALUES(`name`),
  `category` = VALUES(`category`),
  `category_name` = VALUES(`category_name`),
  `icon_name` = VALUES(`icon_name`),
  `short_description` = VALUES(`short_description`),
  `full_description` = VALUES(`full_description`),
  `turnaround_time` = VALUES(`turnaround_time`),
  `popular` = VALUES(`popular`),
  `who_needs_this` = VALUES(`who_needs_this`),
  `important_notes` = VALUES(`important_notes`),
  `required_documents` = VALUES(`required_documents`),
  `process_steps` = VALUES(`process_steps`),
  `related_service_slugs` = VALUES(`related_service_slugs`);

INSERT INTO `services` (
  `id`, `slug`, `name`, `category`, `category_name`, `icon_name`,
  `short_description`, `full_description`, `turnaround_time`,
  `popular`, `is_active`, `who_needs_this`, `important_notes`,
  `required_documents`, `process_steps`, `related_service_slugs`, `display_order`
) VALUES (
  'pan-card-services',
  'pan-card-services',
  'PAN Card Services',
  'government',
  'Government Services',
  'CreditCard',
  'Application assistance for New PAN Card, Corrections in name/DOB/father name, Minor to Major updates, and lost card reprints.',
  'A Permanent Account Number (PAN) is vital for banking, taxes, and government KYC. We assist with fresh PAN card applications, updating outdated demographic records (corrections in spelling, parent name, date of birth), linking Aadhaar to PAN, and processing instant e-PANs.',
  'Instant e-PAN / 10 - 15 Days Physical',
  1,
  1,
  'Students turning 18, citizens opening bank accounts, individuals whose old PAN details do not match their Aadhaar.',
  'Ensure your name and date of birth in Aadhaar match your school leaving certificate before applying for corrections.',
  '["Aadhaar Card (with accurate date of birth and mobile link)","Proof of identity and address (if not using Aadhaar e-KYC)","Passport size photographs (2 copies)","Copy of existing PAN (in case of correction or reprint)"]',
  '["Selection of New vs. Correction Form 49A/49AA","Demographic matching with Aadhaar database","Online application submission via NSDL / UTIITSL","Biometric / OTP e-sign completion","Immediate acknowledgement slip generation and physical card tracking"]',
  '["aadhaar-update-assistance","itr-filing","personal-loan-assistance"]',
  5
) ON DUPLICATE KEY UPDATE
  `name` = VALUES(`name`),
  `category` = VALUES(`category`),
  `category_name` = VALUES(`category_name`),
  `icon_name` = VALUES(`icon_name`),
  `short_description` = VALUES(`short_description`),
  `full_description` = VALUES(`full_description`),
  `turnaround_time` = VALUES(`turnaround_time`),
  `popular` = VALUES(`popular`),
  `who_needs_this` = VALUES(`who_needs_this`),
  `important_notes` = VALUES(`important_notes`),
  `required_documents` = VALUES(`required_documents`),
  `process_steps` = VALUES(`process_steps`),
  `related_service_slugs` = VALUES(`related_service_slugs`);

INSERT INTO `services` (
  `id`, `slug`, `name`, `category`, `category_name`, `icon_name`,
  `short_description`, `full_description`, `turnaround_time`,
  `popular`, `is_active`, `who_needs_this`, `important_notes`,
  `required_documents`, `process_steps`, `related_service_slugs`, `display_order`
) VALUES (
  'aadhaar-update-assistance',
  'aadhaar-update-assistance',
  'Aadhaar Update Assistance',
  'government',
  'Government Services',
  'Fingerprint',
  'Guidance and document verification for updating residential address, mobile number linkage, name corrections, and appointment scheduling.',
  'Keeping your Aadhaar card up-to-date is non-negotiable for bank KYC, government welfare schemes, and registrations. We help you assemble valid supporting documents (electricity bill, domicile, rent agreement) for address changes, book official Aadhaar Seva Kendra appointments, and track update requests (URN).',
  '5 - 15 Working Days (UIDAI)',
  1,
  1,
  'Residents relocating to new homes in Panvel/Pushpak, individuals needing mobile number or email updates for OTP verification.',
  'Safehands provides administrative preparation & appointment coordination. Physical biometric capture occurs at authorized UIDAI Aadhaar centres.',
  '["Current Aadhaar Number","Valid Proof of Address (POA) - Electricity bill, bank passbook with photo, or registered rent agreement","Proof of Identity (POI) for name corrections - Voter ID, Passport, PAN Card","Active mobile phone to receive verification OTP"]',
  '["Document suitability screening against UIDAI approved lists","Online address update submission or official Aadhaar Kendra appointment booking","URN (Update Request Number) tracking support","Download and color PVC card printing once approved"]',
  '["pan-card-services","domicile-certificate","income-certificate"]',
  6
) ON DUPLICATE KEY UPDATE
  `name` = VALUES(`name`),
  `category` = VALUES(`category`),
  `category_name` = VALUES(`category_name`),
  `icon_name` = VALUES(`icon_name`),
  `short_description` = VALUES(`short_description`),
  `full_description` = VALUES(`full_description`),
  `turnaround_time` = VALUES(`turnaround_time`),
  `popular` = VALUES(`popular`),
  `who_needs_this` = VALUES(`who_needs_this`),
  `important_notes` = VALUES(`important_notes`),
  `required_documents` = VALUES(`required_documents`),
  `process_steps` = VALUES(`process_steps`),
  `related_service_slugs` = VALUES(`related_service_slugs`);

INSERT INTO `services` (
  `id`, `slug`, `name`, `category`, `category_name`, `icon_name`,
  `short_description`, `full_description`, `turnaround_time`,
  `popular`, `is_active`, `who_needs_this`, `important_notes`,
  `required_documents`, `process_steps`, `related_service_slugs`, `display_order`
) VALUES (
  'passport-assistance',
  'passport-assistance',
  'Passport Assistance',
  'government',
  'Government Services',
  'Globe',
  'End-to-end guidance for fresh passport applications, renewals, Tatkaal appointments, and PSK/POPSK visit preparation.',
  'Navigating the Passport Seva portal can be confusing. We assist you through online application filling, exact fee payment, appointment booking at Passport Seva Kendra (PSK / POPSK in Panvel / Thane / Mumbai), and compiling the precise original document folder needed for your counter interview and police verification.',
  'Appointment 2-5 days | Dispatch 7-20 days',
  1,
  1,
  'First-time travelers, professionals seeking overseas employment, students planning higher education abroad, and citizens with expiring passports.',
  'All original documents must be carried to the Passport Seva Kendra on your appointment date.',
  '["Aadhaar Card (mandatory primary proof of identity & address)","PAN Card / Voter ID / Driving Licence (secondary ID proof)","School Leaving Certificate / 10th Marksheet (proof of Date of Birth & Non-ECR)","Old Passport original and self-attested copies (for renewal)","Marriage Certificate or Gazette notification (for surname change post-marriage)"]',
  '["Profile creation on Passport Seva Portal","Accurate data entry conforming to school documents","Slot selection at nearest PSK (e.g. Panvel, Thane, or Lower Parel)","Fee payment and appointment confirmation sheet generation","File organization folder check and police verification briefing"]',
  '["marriage-certificate-assistance","pan-card-services","driving-licence-services"]',
  7
) ON DUPLICATE KEY UPDATE
  `name` = VALUES(`name`),
  `category` = VALUES(`category`),
  `category_name` = VALUES(`category_name`),
  `icon_name` = VALUES(`icon_name`),
  `short_description` = VALUES(`short_description`),
  `full_description` = VALUES(`full_description`),
  `turnaround_time` = VALUES(`turnaround_time`),
  `popular` = VALUES(`popular`),
  `who_needs_this` = VALUES(`who_needs_this`),
  `important_notes` = VALUES(`important_notes`),
  `required_documents` = VALUES(`required_documents`),
  `process_steps` = VALUES(`process_steps`),
  `related_service_slugs` = VALUES(`related_service_slugs`);

INSERT INTO `services` (
  `id`, `slug`, `name`, `category`, `category_name`, `icon_name`,
  `short_description`, `full_description`, `turnaround_time`,
  `popular`, `is_active`, `who_needs_this`, `important_notes`,
  `required_documents`, `process_steps`, `related_service_slugs`, `display_order`
) VALUES (
  'driving-licence-services',
  'driving-licence-services',
  'Driving Licence Services',
  'government',
  'Government Services',
  'Car',
  'Coordination and application support for Learner Licence (LL), Permanent Driving Licence (DL), slot booking, and renewals.',
  'Comprehensive procedural guidance on the Ministry of Road Transport Sarathi portal. We help you file for two-wheeler and four-wheeler learner licences, book RTO driving test slots (MH-46 Panvel RTO), apply for licence renewals, change addresses, or procure an international driving permit.',
  '7 - 20 Days (RTO Process)',
  0,
  1,
  'New drivers aged 18+, vehicle owners with expiring licences, and individuals who have relocated to Panvel needing address change in their DL.',
  'Permanent DL can be applied after 30 days from the issue date of your Learner Licence.',
  '["Age Proof (Aadhaar Card / School Leaving Certificate / Passport)","Address Proof (Aadhaar Card / Electricity Bill / Rent Agreement)","Medical Certificate Form 1A (for commercial licences or age 40+)","Existing Learner Licence / Driving Licence (for renewal or permanent test)","Recent passport size photographs"]',
  '["Sarathi portal application drafting","Fee payment & test slot booking at MH-46 Panvel RTO","Learner Licence online exam tutorial and prep material","Permanent driving test documentation dossier","Smart card driving licence dispatch follow-up"]',
  '["pan-card-services","aadhaar-update-assistance","vehicle-loan-assistance"]',
  8
) ON DUPLICATE KEY UPDATE
  `name` = VALUES(`name`),
  `category` = VALUES(`category`),
  `category_name` = VALUES(`category_name`),
  `icon_name` = VALUES(`icon_name`),
  `short_description` = VALUES(`short_description`),
  `full_description` = VALUES(`full_description`),
  `turnaround_time` = VALUES(`turnaround_time`),
  `popular` = VALUES(`popular`),
  `who_needs_this` = VALUES(`who_needs_this`),
  `important_notes` = VALUES(`important_notes`),
  `required_documents` = VALUES(`required_documents`),
  `process_steps` = VALUES(`process_steps`),
  `related_service_slugs` = VALUES(`related_service_slugs`);

INSERT INTO `services` (
  `id`, `slug`, `name`, `category`, `category_name`, `icon_name`,
  `short_description`, `full_description`, `turnaround_time`,
  `popular`, `is_active`, `who_needs_this`, `important_notes`,
  `required_documents`, `process_steps`, `related_service_slugs`, `display_order`
) VALUES (
  'online-government-services',
  'online-government-services',
  'Online Government Services',
  'government',
  'Government Services',
  'Laptop',
  'One-stop support for state and central citizen portals: Aaple Sarkar, MahaDBT scholarships, voter card registrations, and e-District filings.',
  'Assistance for residents seeking access to the multitude of citizen welfare schemes and digital services provided by the Government of Maharashtra and Central Government. We assist with registration, uploading scanned files, verifying application statuses, and resolving portal rejection errors.',
  'Same Day / Depends on Scheme',
  0,
  1,
  'College students applying for scholarships, senior citizens, farmers, and families seeking government portal enrollments without digital access.',
  'We ensure all scanned files strictly adhere to government portal size and resolution specifications.',
  '["Aadhaar Card and active mobile number","Caste Certificate / Income Certificate (as per scheme requirements)","Bank passbook photocopy showing IFSC code","Educational marksheets (for student scholarships)"]',
  '["Scheme eligibility screening","Citizen profile creation on Aaple Sarkar / MahaDBT","Document resizing, PDF compilation & uploading","Form submission and receipt issuance"]',
  '["caste-certificate","income-certificate","digital-documentation"]',
  9
) ON DUPLICATE KEY UPDATE
  `name` = VALUES(`name`),
  `category` = VALUES(`category`),
  `category_name` = VALUES(`category_name`),
  `icon_name` = VALUES(`icon_name`),
  `short_description` = VALUES(`short_description`),
  `full_description` = VALUES(`full_description`),
  `turnaround_time` = VALUES(`turnaround_time`),
  `popular` = VALUES(`popular`),
  `who_needs_this` = VALUES(`who_needs_this`),
  `important_notes` = VALUES(`important_notes`),
  `required_documents` = VALUES(`required_documents`),
  `process_steps` = VALUES(`process_steps`),
  `related_service_slugs` = VALUES(`related_service_slugs`);

INSERT INTO `services` (
  `id`, `slug`, `name`, `category`, `category_name`, `icon_name`,
  `short_description`, `full_description`, `turnaround_time`,
  `popular`, `is_active`, `who_needs_this`, `important_notes`,
  `required_documents`, `process_steps`, `related_service_slugs`, `display_order`
) VALUES (
  'digital-documentation',
  'digital-documentation',
  'Digital Documentation & E-Services',
  'government',
  'Government Services',
  'FileCode',
  'Assistance with Digital Signature Certificates (DSC Class 3), online affidavits, e-KYC compliance, and official PDF drafting.',
  'Modern business and government filings require high-level digital credentials. We provide coordination for Class 3 Digital Signature tokens (DSC) for GST, MCA, and e-Tendering, along with formatting official representations, self-declaration affidavits, and e-KYC validations.',
  '1 - 2 Working Days',
  0,
  1,
  'Directors, chartered professionals, government contractors, and citizens requiring e-signatures or formal digitized portfolios.',
  'Class 3 DSC tokens are valid for 2 or 3 years and are required for corporate MCA and tender portals.',
  '["Aadhaar Card and PAN Card of applicant","Passport size photograph","Active email ID and mobile number for video verification"]',
  '["DSC application form filling","Video e-verification guidance","Cryptographic USB token preparation and driver setup"]',
  '["gst-registration-filing","online-government-services","business-registration"]',
  10
) ON DUPLICATE KEY UPDATE
  `name` = VALUES(`name`),
  `category` = VALUES(`category`),
  `category_name` = VALUES(`category_name`),
  `icon_name` = VALUES(`icon_name`),
  `short_description` = VALUES(`short_description`),
  `full_description` = VALUES(`full_description`),
  `turnaround_time` = VALUES(`turnaround_time`),
  `popular` = VALUES(`popular`),
  `who_needs_this` = VALUES(`who_needs_this`),
  `important_notes` = VALUES(`important_notes`),
  `required_documents` = VALUES(`required_documents`),
  `process_steps` = VALUES(`process_steps`),
  `related_service_slugs` = VALUES(`related_service_slugs`);

INSERT INTO `services` (
  `id`, `slug`, `name`, `category`, `category_name`, `icon_name`,
  `short_description`, `full_description`, `turnaround_time`,
  `popular`, `is_active`, `who_needs_this`, `important_notes`,
  `required_documents`, `process_steps`, `related_service_slugs`, `display_order`
) VALUES (
  'income-certificate',
  'income-certificate',
  'Income Certificate Assistance',
  'documents-certificates',
  'Documents & Certificates',
  'Coins',
  'Guidance and document compilation for Tahsildar / Sub-Divisional Income Certificate for school/college admissions and scholarships.',
  'An Income Certificate issued by the competent Revenue Authority (Tehsildar) certifies the annual earnings of an individual or family. It is indispensable for college tuition fee waivers, government scholarships, EWS reservations, and hospital medical aid.',
  '7 - 15 Working Days',
  1,
  1,
  'Students seeking scholarships or fee concessions, families applying for welfare schemes, and job seekers requiring proof of family income.',
  'Income certificates are typically valid for 1 financial year or 3 financial years depending on the certificate category chosen.',
  '["Aadhaar Card and Ration Card copy","Salary Slip / Form 16 / ITR copy (for employed persons)","Self-declaration / Affidavit of annual income from all sources","Talathi / Patwari report (where applicable)","Electricity Bill as proof of residence in Raigad/Panvel"]',
  '["Review of income proofs and family member declarations","Preparation of self-declaration affidavit","Online application submission on Aaple Sarkar portal","Follow-up with Panvel Tahsil office","Digital certificate download with official government QR verification"]',
  '["domicile-certificate","caste-certificate","online-government-services"]',
  11
) ON DUPLICATE KEY UPDATE
  `name` = VALUES(`name`),
  `category` = VALUES(`category`),
  `category_name` = VALUES(`category_name`),
  `icon_name` = VALUES(`icon_name`),
  `short_description` = VALUES(`short_description`),
  `full_description` = VALUES(`full_description`),
  `turnaround_time` = VALUES(`turnaround_time`),
  `popular` = VALUES(`popular`),
  `who_needs_this` = VALUES(`who_needs_this`),
  `important_notes` = VALUES(`important_notes`),
  `required_documents` = VALUES(`required_documents`),
  `process_steps` = VALUES(`process_steps`),
  `related_service_slugs` = VALUES(`related_service_slugs`);

INSERT INTO `services` (
  `id`, `slug`, `name`, `category`, `category_name`, `icon_name`,
  `short_description`, `full_description`, `turnaround_time`,
  `popular`, `is_active`, `who_needs_this`, `important_notes`,
  `required_documents`, `process_steps`, `related_service_slugs`, `display_order`
) VALUES (
  'domicile-certificate',
  'domicile-certificate',
  'Domicile & Age/Nationality Certificate',
  'documents-certificates',
  'Documents & Certificates',
  'Home',
  'Assistance for obtaining the official Maharashtra Domicile & Nationality Certificate for state quota educational admissions and government recruitment.',
  'The Domicile Certificate proves a resident has been living in Maharashtra continuously for a minimum period (ordinarily 15 years). It is an absolute requirement for engineering, medical, law, and degree college admissions under the Maharashtra state quota, as well as MPSC and state government jobs.',
  '10 - 20 Working Days',
  1,
  1,
  'High school and junior college students, job aspirants appearing for Maharashtra state recruitment, and residents establishing legal state domicile.',
  'A Domicile Certificate has lifetime validity and does not require periodic renewal.',
  '["Aadhaar Card of student and father/mother","Proof of continuous 15-year residence (Electricity bills, rent receipts, school records)","School Leaving Certificate (LC) mentioning place of birth in Maharashtra","Ration Card copy mentioning applicant name","Parent Domicile Certificate (if available)","Passport size photographs"]',
  '["Residence timeline proof audit","Affidavit drafting for proof of continuous residence","Aaple Sarkar portal submission for Panvel Sub-Division","Liaison and verification tracking","Delivery of digitally signed Sub-Divisional Officer (SDO) certificate"]',
  '["income-certificate","caste-certificate","passport-assistance"]',
  12
) ON DUPLICATE KEY UPDATE
  `name` = VALUES(`name`),
  `category` = VALUES(`category`),
  `category_name` = VALUES(`category_name`),
  `icon_name` = VALUES(`icon_name`),
  `short_description` = VALUES(`short_description`),
  `full_description` = VALUES(`full_description`),
  `turnaround_time` = VALUES(`turnaround_time`),
  `popular` = VALUES(`popular`),
  `who_needs_this` = VALUES(`who_needs_this`),
  `important_notes` = VALUES(`important_notes`),
  `required_documents` = VALUES(`required_documents`),
  `process_steps` = VALUES(`process_steps`),
  `related_service_slugs` = VALUES(`related_service_slugs`);

INSERT INTO `services` (
  `id`, `slug`, `name`, `category`, `category_name`, `icon_name`,
  `short_description`, `full_description`, `turnaround_time`,
  `popular`, `is_active`, `who_needs_this`, `important_notes`,
  `required_documents`, `process_steps`, `related_service_slugs`, `display_order`
) VALUES (
  'caste-certificate',
  'caste-certificate',
  'Caste Certificate Assistance',
  'documents-certificates',
  'Documents & Certificates',
  'Users',
  'Guidance and file preparation for SC, ST, VJNT, OBC, and SBC Caste Certificates from the Sub-Divisional Magistrate / Tehsildar.',
  'Obtaining a genuine Caste Certificate requires meticulous historical genealogical evidence and ancestral residency proof prior to specific cut-off years. We help you systematically compile school leaving certificates, revenue entries, and genealogical trees (vanshavali) to ensure your application passes scrutiny without rejection.',
  '15 - 30 Working Days',
  0,
  1,
  'Students and job aspirants belonging to reserved categories seeking fee concessions, quota seats, or government employment opportunities.',
  'Having an older sibling’s or father’s verified caste certificate speeds up the verification process significantly.',
  '["Applicant School Leaving Certificate and Aadhaar Card","Father / Grandfather / Uncle Caste Certificate & School Leaving Certificate","Ancestral proof of residence prior to the relevant base cut-off year","Family genealogical tree affidavit (Vanshavali) with notarization","Ration card and electricity bill of current residence"]',
  '["Ancestral document verification against community cut-off rules","Notarized Vanshavali affidavit drafting","Online Aaple Sarkar portal application submission","Tahsil / SDO office scrutiny follow-up","Issuance of digitally certified caste certificate"]',
  '["income-certificate","domicile-certificate","online-government-services"]',
  13
) ON DUPLICATE KEY UPDATE
  `name` = VALUES(`name`),
  `category` = VALUES(`category`),
  `category_name` = VALUES(`category_name`),
  `icon_name` = VALUES(`icon_name`),
  `short_description` = VALUES(`short_description`),
  `full_description` = VALUES(`full_description`),
  `turnaround_time` = VALUES(`turnaround_time`),
  `popular` = VALUES(`popular`),
  `who_needs_this` = VALUES(`who_needs_this`),
  `important_notes` = VALUES(`important_notes`),
  `required_documents` = VALUES(`required_documents`),
  `process_steps` = VALUES(`process_steps`),
  `related_service_slugs` = VALUES(`related_service_slugs`);

INSERT INTO `services` (
  `id`, `slug`, `name`, `category`, `category_name`, `icon_name`,
  `short_description`, `full_description`, `turnaround_time`,
  `popular`, `is_active`, `who_needs_this`, `important_notes`,
  `required_documents`, `process_steps`, `related_service_slugs`, `display_order`
) VALUES (
  'marriage-certificate-assistance',
  'marriage-certificate-assistance',
  'Marriage Certificate Assistance',
  'documents-certificates',
  'Documents & Certificates',
  'HeartHandshake',
  'Complete coordination for civil and special marriage registration with municipal authorities / Sub-Registrar of Marriages.',
  'A government Marriage Certificate is legally binding proof of marital status required for spouse passport endorsement, spousal visa applications, joint bank accounts, and health insurance. We assist Panvel and Raigad couples with form filing, witness coordination, affidavit drafting, and appointment scheduling at the local municipal office.',
  '7 - 15 Working Days',
  1,
  1,
  'Newly married couples, spouses applying for overseas visas/immigration, or individuals updating their marital records in government IDs.',
  'Both spouses and three witnesses must present their original identity cards during the physical verification appointment.',
  '["Marriage Invitation Card / Hall Receipt / Priest Certificate","Age and Address Proof of Husband and Wife (Aadhaar, Passport, PAN)","School Leaving Certificate or Birth Certificate of both spouses","Marriage ceremony photograph (couple on stage / tying the knot)","Aadhaar cards and photos of 3 adult witnesses"]',
  '["Verification of age eligibility and wedding documentation","Application drafting on the Municipal / Inspector General of Registration (IGR) portal","Affidavit drafting for both spouses and witnesses","Appointment booking at Panvel Municipal Corporation or Sub-Registrar","Physical signing coordination and receipt of registered certificate"]',
  '["passport-assistance","pan-card-services","aadhaar-update-assistance"]',
  14
) ON DUPLICATE KEY UPDATE
  `name` = VALUES(`name`),
  `category` = VALUES(`category`),
  `category_name` = VALUES(`category_name`),
  `icon_name` = VALUES(`icon_name`),
  `short_description` = VALUES(`short_description`),
  `full_description` = VALUES(`full_description`),
  `turnaround_time` = VALUES(`turnaround_time`),
  `popular` = VALUES(`popular`),
  `who_needs_this` = VALUES(`who_needs_this`),
  `important_notes` = VALUES(`important_notes`),
  `required_documents` = VALUES(`required_documents`),
  `process_steps` = VALUES(`process_steps`),
  `related_service_slugs` = VALUES(`related_service_slugs`);

INSERT INTO `services` (
  `id`, `slug`, `name`, `category`, `category_name`, `icon_name`,
  `short_description`, `full_description`, `turnaround_time`,
  `popular`, `is_active`, `who_needs_this`, `important_notes`,
  `required_documents`, `process_steps`, `related_service_slugs`, `display_order`
) VALUES (
  'food-licence',
  'food-licence',
  'Food Licence (FSSAI Registration)',
  'licences-registrations',
  'Licences & Registrations',
  'Utensils',
  'FSSAI Basic Registration and State Food Licence filing for food stalls, canteens, restaurants, caterers, and cloud kitchens.',
  'Every food business operator (FBO)—from small street snack vendors and home bakers to restaurants, grocery stores, and cloud kitchens—is required by law to possess an FSSAI 14-digit registration or licence. We handle the entire FoSCoS portal documentation, premises photo submission, and fee processing.',
  '3 - 7 Working Days (Basic Registration)',
  1,
  1,
  'Restaurants, cafes, home bakeries, sweet shops, canteens, grocery stores, dairy retailers, and food delivery partners (Swiggy/Zomato).',
  'Operating a food business without an FSSAI certificate can attract heavy penalties from food safety commissioners.',
  '["Aadhaar Card and PAN Card of Food Business Operator (FBO)","Passport size photograph of the applicant","Electricity Bill / Rent Agreement of the kitchen/business location","NOC from property owner","List of food product categories to be prepared or sold"]',
  '["Determination of eligibility: Basic Registration vs. State Licence","Form A / Form B drafting on FoSCoS portal","Document compilation and premises proof verification","Government fee payment and submission","FSSAI 14-digit certificate delivery with food safety display badge"]',
  '["business-registration","msme-udyam-registration","gst-registration-filing"]',
  15
) ON DUPLICATE KEY UPDATE
  `name` = VALUES(`name`),
  `category` = VALUES(`category`),
  `category_name` = VALUES(`category_name`),
  `icon_name` = VALUES(`icon_name`),
  `short_description` = VALUES(`short_description`),
  `full_description` = VALUES(`full_description`),
  `turnaround_time` = VALUES(`turnaround_time`),
  `popular` = VALUES(`popular`),
  `who_needs_this` = VALUES(`who_needs_this`),
  `important_notes` = VALUES(`important_notes`),
  `required_documents` = VALUES(`required_documents`),
  `process_steps` = VALUES(`process_steps`),
  `related_service_slugs` = VALUES(`related_service_slugs`);

INSERT INTO `services` (
  `id`, `slug`, `name`, `category`, `category_name`, `icon_name`,
  `short_description`, `full_description`, `turnaround_time`,
  `popular`, `is_active`, `who_needs_this`, `important_notes`,
  `required_documents`, `process_steps`, `related_service_slugs`, `display_order`
) VALUES (
  'home-loan-assistance',
  'home-loan-assistance',
  'Home Loan Assistance',
  'loans-financial',
  'Loans & Financial Assistance',
  'Home',
  'Comprehensive file preparation, financial profile strengthening, and bank liaison for flat purchase, plot construction, and balance transfers.',
  'Buying a home in Panvel, Pushpak Nagar, or Karanjade is one of life’s biggest milestones. We guide you through the entire documentation maze: organizing your salary slips, ITR files, bank statements, chain of property agreements, and bank sanction requirements across leading public and private banks.',
  '7 - 15 Working Days (Bank Subject)',
  1,
  1,
  'Salaried employees and self-employed entrepreneurs seeking the most suitable loan options, balance transfer with lower interest rates, or top-up funding.',
  'Safehands provides administrative coordination and documentation support. Final sanction and interest rates depend entirely on bank discretion and credit score.',
  '["KYC: PAN Card, Aadhaar Card, Passport photos","Income Proof: Last 3 months salary slips & 2 years Form 16 (for salaried)","Business Proof: Last 3 years ITR with computation & audit reports (for business)","Last 6 to 12 months Bank Account Statements","Property Documents: Allotment letter, builder agreement, approved building plan copy"]',
  '["Financial eligibility and debt-to-income ratio evaluation","Document file compilation and discrepancy cleanup","Submission to compatible banking and NBFC partners","Coordination during field verification and legal property inspection","Sanction letter review and disbursement file support"]',
  '["mortgage-loan-assistance","itr-filing","personal-loan-assistance"]',
  16
) ON DUPLICATE KEY UPDATE
  `name` = VALUES(`name`),
  `category` = VALUES(`category`),
  `category_name` = VALUES(`category_name`),
  `icon_name` = VALUES(`icon_name`),
  `short_description` = VALUES(`short_description`),
  `full_description` = VALUES(`full_description`),
  `turnaround_time` = VALUES(`turnaround_time`),
  `popular` = VALUES(`popular`),
  `who_needs_this` = VALUES(`who_needs_this`),
  `important_notes` = VALUES(`important_notes`),
  `required_documents` = VALUES(`required_documents`),
  `process_steps` = VALUES(`process_steps`),
  `related_service_slugs` = VALUES(`related_service_slugs`);

INSERT INTO `services` (
  `id`, `slug`, `name`, `category`, `category_name`, `icon_name`,
  `short_description`, `full_description`, `turnaround_time`,
  `popular`, `is_active`, `who_needs_this`, `important_notes`,
  `required_documents`, `process_steps`, `related_service_slugs`, `display_order`
) VALUES (
  'personal-loan-assistance',
  'personal-loan-assistance',
  'Personal Loan Assistance',
  'loans-financial',
  'Loans & Financial Assistance',
  'Wallet',
  'Quick documentation and application guidance for unsecured personal loans for medical emergencies, weddings, or home renovations.',
  'When you need immediate liquidity without pledging collateral, we help assemble your financial profile to apply for personal loans through reputable banking channels. We ensure your documentation is immaculate to minimize rejection marks on your credit bureau report.',
  '2 - 5 Working Days',
  1,
  1,
  'Salaried executives and professionals needing urgent funds for family functions, debt consolidation, medical expenses, or personal needs.',
  'Maintaining a CIBIL score of 750+ significantly enhances approval odds and reduces interest rates.',
  '["PAN Card and Aadhaar Card","Last 3 to 6 months salary account bank statements","Last 3 months salary slips with official company stamps/email payslips","Company Employee ID card copy","Current residence address proof"]',
  '["Preliminary credit profile and eligibility assessment","Organizing digital payslips and statement PDFs","Liaison with lending partners offering competitive rates","Assistance during verification calls","Disbursement tracking to your bank account"]',
  '["credit-card-assistance","home-loan-assistance","itr-filing"]',
  17
) ON DUPLICATE KEY UPDATE
  `name` = VALUES(`name`),
  `category` = VALUES(`category`),
  `category_name` = VALUES(`category_name`),
  `icon_name` = VALUES(`icon_name`),
  `short_description` = VALUES(`short_description`),
  `full_description` = VALUES(`full_description`),
  `turnaround_time` = VALUES(`turnaround_time`),
  `popular` = VALUES(`popular`),
  `who_needs_this` = VALUES(`who_needs_this`),
  `important_notes` = VALUES(`important_notes`),
  `required_documents` = VALUES(`required_documents`),
  `process_steps` = VALUES(`process_steps`),
  `related_service_slugs` = VALUES(`related_service_slugs`);

INSERT INTO `services` (
  `id`, `slug`, `name`, `category`, `category_name`, `icon_name`,
  `short_description`, `full_description`, `turnaround_time`,
  `popular`, `is_active`, `who_needs_this`, `important_notes`,
  `required_documents`, `process_steps`, `related_service_slugs`, `display_order`
) VALUES (
  'business-loan-assistance',
  'business-loan-assistance',
  'Business Loan Assistance',
  'loans-financial',
  'Loans & Financial Assistance',
  'Briefcase',
  'Documentation for working capital, MSME loans, machinery purchase, and business expansion finance.',
  'Fueling business growth requires structured financial dossiers. We help small business owners and shopkeepers in Panvel prepare projected balance sheets, compile GST returns, reconcile bank turnovers, and submit comprehensive loan applications under MSME and CGTMSE schemes.',
  '7 - 20 Working Days',
  0,
  1,
  'Retailers, wholesalers, manufacturers, contractors, and service agencies looking to invest in inventory, equipment, or business expansion.',
  'Clean banking transactions with minimal cheque returns are vital for quick business loan approvals.',
  '["PAN and Aadhaar of Proprietor / Partners / Directors","Business Registration / Shop Act / Udyam Certificate","Last 2 to 3 years filed ITR with Balance Sheets & P&L","Last 12 months current bank account statements","GST returns (GSTR-3B) for the trailing 12 months"]',
  '["Evaluation of business cashflow and banking turnover","Preparation of standard financial dossier","Introduction to suitable commercial loan officers","Assistance during on-site stock/business verification","Disbursement coordination"]',
  '["msme-udyam-registration","gst-registration-filing","mortgage-loan-assistance"]',
  18
) ON DUPLICATE KEY UPDATE
  `name` = VALUES(`name`),
  `category` = VALUES(`category`),
  `category_name` = VALUES(`category_name`),
  `icon_name` = VALUES(`icon_name`),
  `short_description` = VALUES(`short_description`),
  `full_description` = VALUES(`full_description`),
  `turnaround_time` = VALUES(`turnaround_time`),
  `popular` = VALUES(`popular`),
  `who_needs_this` = VALUES(`who_needs_this`),
  `important_notes` = VALUES(`important_notes`),
  `required_documents` = VALUES(`required_documents`),
  `process_steps` = VALUES(`process_steps`),
  `related_service_slugs` = VALUES(`related_service_slugs`);

INSERT INTO `services` (
  `id`, `slug`, `name`, `category`, `category_name`, `icon_name`,
  `short_description`, `full_description`, `turnaround_time`,
  `popular`, `is_active`, `who_needs_this`, `important_notes`,
  `required_documents`, `process_steps`, `related_service_slugs`, `display_order`
) VALUES (
  'vehicle-loan-assistance',
  'vehicle-loan-assistance',
  'Vehicle Loan Assistance',
  'loans-financial',
  'Loans & Financial Assistance',
  'Car',
  'Paperwork coordination for new and pre-owned two-wheeler, four-wheeler, and commercial vehicle loans.',
  'Looking to purchase a new car, scooter, or commercial transport vehicle? We assist with assembling proforma invoices from authorized dealerships, your income proofs, and residence verifications to secure transparent vehicle financing.',
  '2 - 5 Working Days',
  0,
  1,
  'Individuals and commercial drivers purchasing personal cars, bikes, or commercial tempo vehicles in Raigad/Navi Mumbai.',
  'Pre-owned vehicle loans require formal inspection and RTO hypothecation clearance.',
  '["Identity & Address Proof (Aadhaar & PAN Card)","Income Proof (Salary slips or ITR copies)","Last 6 months bank statement","Vehicle proforma invoice from showroom or seller valuation report","Electricity bill of residence"]',
  '["Selection of dealership quotation","Loan dossier preparation and income calculation","Coordination with bank automotive finance branch","Delivery Order (DO) issuance assistance"]',
  '["driving-licence-services","personal-loan-assistance","insurance-services"]',
  19
) ON DUPLICATE KEY UPDATE
  `name` = VALUES(`name`),
  `category` = VALUES(`category`),
  `category_name` = VALUES(`category_name`),
  `icon_name` = VALUES(`icon_name`),
  `short_description` = VALUES(`short_description`),
  `full_description` = VALUES(`full_description`),
  `turnaround_time` = VALUES(`turnaround_time`),
  `popular` = VALUES(`popular`),
  `who_needs_this` = VALUES(`who_needs_this`),
  `important_notes` = VALUES(`important_notes`),
  `required_documents` = VALUES(`required_documents`),
  `process_steps` = VALUES(`process_steps`),
  `related_service_slugs` = VALUES(`related_service_slugs`);

INSERT INTO `services` (
  `id`, `slug`, `name`, `category`, `category_name`, `icon_name`,
  `short_description`, `full_description`, `turnaround_time`,
  `popular`, `is_active`, `who_needs_this`, `important_notes`,
  `required_documents`, `process_steps`, `related_service_slugs`, `display_order`
) VALUES (
  'mortgage-loan-assistance',
  'mortgage-loan-assistance',
  'Mortgage Loan / Loan Against Property',
  'loans-financial',
  'Loans & Financial Assistance',
  'Building2',
  'High-value funding assistance by pledging residential or commercial property as collateral at competitive interest rates.',
  'Loan Against Property (LAP) offers larger funding amounts and longer repayment tenures compared to unsecured loans. We help property owners compile title deeds, index II copies, share certificates, and tax receipts to prepare a watertight mortgage file for institutional lenders.',
  '10 - 20 Working Days',
  0,
  1,
  'Entrepreneurs, property owners, and high-net-worth individuals requiring funds for business expansion, child’s overseas education, or major capital needs.',
  'Ensure your property is free of legal disputes and all municipal taxes are paid up to date.',
  '["Complete chain of property title deeds (Agreement for Sale, Index II)","Latest Property Tax receipts & Electricity bills","Society Share Certificate & NOC (if cooperative housing society)","3 Years ITR filings with complete financial statements","12 Months Bank Statements of all primary accounts"]',
  '["Property document preliminary scrutiny","Title search report and valuation liaison","Financial file submission to participating institutions","Equitable mortgage registration coordination","Fund disbursement to borrower account"]',
  '["home-loan-assistance","business-loan-assistance","itr-filing"]',
  20
) ON DUPLICATE KEY UPDATE
  `name` = VALUES(`name`),
  `category` = VALUES(`category`),
  `category_name` = VALUES(`category_name`),
  `icon_name` = VALUES(`icon_name`),
  `short_description` = VALUES(`short_description`),
  `full_description` = VALUES(`full_description`),
  `turnaround_time` = VALUES(`turnaround_time`),
  `popular` = VALUES(`popular`),
  `who_needs_this` = VALUES(`who_needs_this`),
  `important_notes` = VALUES(`important_notes`),
  `required_documents` = VALUES(`required_documents`),
  `process_steps` = VALUES(`process_steps`),
  `related_service_slugs` = VALUES(`related_service_slugs`);

INSERT INTO `services` (
  `id`, `slug`, `name`, `category`, `category_name`, `icon_name`,
  `short_description`, `full_description`, `turnaround_time`,
  `popular`, `is_active`, `who_needs_this`, `important_notes`,
  `required_documents`, `process_steps`, `related_service_slugs`, `display_order`
) VALUES (
  'credit-card-assistance',
  'credit-card-assistance',
  'Credit Card Assistance',
  'loans-financial',
  'Loans & Financial Assistance',
  'CreditCard',
  'Guidance on choosing and applying for credit cards based on salary, CIBIL score, and spending benefits (fuel, travel, cashback).',
  'Navigating credit card offers can be overwhelming. We guide you toward the right card suited to your financial profile—whether you want a lifetime-free card, reward points on fuel/groceries, or a secured card against fixed deposits to rebuild your credit history.',
  '3 - 7 Working Days',
  0,
  1,
  'Salaried individuals looking to build their CIBIL score or maximize card reward savings.',
  'Never share your credit card CVV or OTP with anyone over phone or email.',
  '["Aadhaar Card and PAN Card","Last 3 months salary slips or latest filed ITR","Active mobile number and email address"]',
  '["Eligibility and CIBIL band check","Digital application submission on official banking portal","Video KYC completion guidance","Card tracking to delivery address"]',
  '["personal-loan-assistance","pan-card-services","itr-filing"]',
  21
) ON DUPLICATE KEY UPDATE
  `name` = VALUES(`name`),
  `category` = VALUES(`category`),
  `category_name` = VALUES(`category_name`),
  `icon_name` = VALUES(`icon_name`),
  `short_description` = VALUES(`short_description`),
  `full_description` = VALUES(`full_description`),
  `turnaround_time` = VALUES(`turnaround_time`),
  `popular` = VALUES(`popular`),
  `who_needs_this` = VALUES(`who_needs_this`),
  `important_notes` = VALUES(`important_notes`),
  `required_documents` = VALUES(`required_documents`),
  `process_steps` = VALUES(`process_steps`),
  `related_service_slugs` = VALUES(`related_service_slugs`);

INSERT INTO `services` (
  `id`, `slug`, `name`, `category`, `category_name`, `icon_name`,
  `short_description`, `full_description`, `turnaround_time`,
  `popular`, `is_active`, `who_needs_this`, `important_notes`,
  `required_documents`, `process_steps`, `related_service_slugs`, `display_order`
) VALUES (
  'insurance-services',
  'insurance-services',
  'Insurance Services Coordination',
  'loans-financial',
  'Loans & Financial Assistance',
  'ShieldCheck',
  'Guidance and paperwork for two-wheeler, four-wheeler, commercial motor, health, and term life insurance policies.',
  'Protecting your family and vehicle assets against unexpected risks is crucial. We assist with instant vehicle insurance renewals (comprehensive & third-party), policy comparison, health insurance paperwork, and life term policy coordination with leading IRDAI-registered insurers.',
  'Instant / Same Day',
  0,
  1,
  'Vehicle owners needing immediate insurance for RTO compliance or traffic checks, and families planning healthcare cover.',
  'Always carry a valid insurance policy and PUC to prevent steep RTO traffic fines.',
  '["Vehicle RC book / card copy","Previous insurance policy copy (for renewal with NCB benefit)","KYC documents of policyholder (Aadhaar & PAN)"]',
  '["Quote comparison across top insurance providers","Selection of appropriate add-ons (Zero Dep, Engine Protector, RSA)","Online premium payment","Instant policy printout and softcopy delivery via WhatsApp/Email"]',
  '["vehicle-loan-assistance","driving-licence-services"]',
  22
) ON DUPLICATE KEY UPDATE
  `name` = VALUES(`name`),
  `category` = VALUES(`category`),
  `category_name` = VALUES(`category_name`),
  `icon_name` = VALUES(`icon_name`),
  `short_description` = VALUES(`short_description`),
  `full_description` = VALUES(`full_description`),
  `turnaround_time` = VALUES(`turnaround_time`),
  `popular` = VALUES(`popular`),
  `who_needs_this` = VALUES(`who_needs_this`),
  `important_notes` = VALUES(`important_notes`),
  `required_documents` = VALUES(`required_documents`),
  `process_steps` = VALUES(`process_steps`),
  `related_service_slugs` = VALUES(`related_service_slugs`);

INSERT INTO `services` (
  `id`, `slug`, `name`, `category`, `category_name`, `icon_name`,
  `short_description`, `full_description`, `turnaround_time`,
  `popular`, `is_active`, `who_needs_this`, `important_notes`,
  `required_documents`, `process_steps`, `related_service_slugs`, `display_order`
) VALUES (
  'railway-ticket-booking-online',
  'railway-ticket-booking-online',
  'Railway Ticket Booking Online',
  'printing-utility',
  'Printing & Utility Services',
  'TrainTrack',
  'Prompt assistance for IRCTC online train ticket bookings, Tatkal availability check, waitlist tracking, and seat status inquiries.',
  'Planning a trip from Panvel, Mumbai, or nearby stations to anywhere across India? We provide fast, reliable assistance for booking confirmed train tickets, checking route alternatives, monitoring PNR statuses, and printing journey slips.',
  'Instant / Minutes',
  1,
  1,
  'Families, travelers, students, and workers traveling from Panvel Junction / CSMT / LTT to Konkan, Gujarat, UP, Bihar, South India, and across the nation.',
  'Carry an original government photo ID (Aadhaar, PAN, Voter ID) during train travel for ticket verification.',
  '["Passenger Names, Age, and Gender as per government ID","Preferred travel date, train number/name, and coach class (Sleeper, 3AC, 2AC, Chair Car)","Berth preference (Lower, Middle, Upper, Side Lower)","Contact mobile number for IRCTC SMS updates"]',
  '["Seat availability check on designated routes","Passenger details entry and verification","Booking processing on authorized IRCTC gateway","Generation and instant printout / WhatsApp PDF dispatch of valid e-ticket"]',
  '["printing-xerox-scan-lamination","passport-assistance"]',
  23
) ON DUPLICATE KEY UPDATE
  `name` = VALUES(`name`),
  `category` = VALUES(`category`),
  `category_name` = VALUES(`category_name`),
  `icon_name` = VALUES(`icon_name`),
  `short_description` = VALUES(`short_description`),
  `full_description` = VALUES(`full_description`),
  `turnaround_time` = VALUES(`turnaround_time`),
  `popular` = VALUES(`popular`),
  `who_needs_this` = VALUES(`who_needs_this`),
  `important_notes` = VALUES(`important_notes`),
  `required_documents` = VALUES(`required_documents`),
  `process_steps` = VALUES(`process_steps`),
  `related_service_slugs` = VALUES(`related_service_slugs`);

INSERT INTO `services` (
  `id`, `slug`, `name`, `category`, `category_name`, `icon_name`,
  `short_description`, `full_description`, `turnaround_time`,
  `popular`, `is_active`, `who_needs_this`, `important_notes`,
  `required_documents`, `process_steps`, `related_service_slugs`, `display_order`
) VALUES (
  'printing-xerox-scan-lamination',
  'printing-xerox-scan-lamination',
  'Printing, Xerox, Scan & Lamination',
  'printing-utility',
  'Printing & Utility Services',
  'Printer',
  'High-speed B&W and color Xerox, document digitization to high-res PDF, legal paper printing, and heavy-duty card/sheet lamination.',
  'Located conveniently at Hari Vithal Complex, Sector R3, Pushpak Old Panvel, our center is equipped with high-speed digital copiers and color laser printers. We offer legal document drafting prints, double-sided copies, color stamp paper prints, book scanning, and protective lamination for vital certificates.',
  'Instant While You Wait',
  1,
  1,
  'Residents, students, advocates, contractors, and local business owners needing crisp prints, urgent photocopies, and safe lamination.',
  'We maintain strict document privacy: your files are deleted after printing is completed.',
  '["Digital files via WhatsApp / Pen Drive / Email or original paper documents for scanning/copying"]',
  '["File inspection for proper margins and resolution","Test print check for color fidelity","High-speed printing or thermal bubble-free lamination","Neat stapling or filing"]',
  '["railway-ticket-booking-online","digital-documentation"]',
  24
) ON DUPLICATE KEY UPDATE
  `name` = VALUES(`name`),
  `category` = VALUES(`category`),
  `category_name` = VALUES(`category_name`),
  `icon_name` = VALUES(`icon_name`),
  `short_description` = VALUES(`short_description`),
  `full_description` = VALUES(`full_description`),
  `turnaround_time` = VALUES(`turnaround_time`),
  `popular` = VALUES(`popular`),
  `who_needs_this` = VALUES(`who_needs_this`),
  `important_notes` = VALUES(`important_notes`),
  `required_documents` = VALUES(`required_documents`),
  `process_steps` = VALUES(`process_steps`),
  `related_service_slugs` = VALUES(`related_service_slugs`);

-- -------------------------------------------------------------------
-- Seed `testimonials`
-- -------------------------------------------------------------------
INSERT INTO `testimonials` (
  `id`, `client_name`, `locality`, `service_used`, `comment`, `rating`, `date_display`, `is_published`, `display_order`
) VALUES (
  'exp-1',
  'Rahul M.',
  'Old Panvel',
  'GST Registration & Udyam Filing',
  'Very professional and helpful team. Got my GST registration and Udyam certificate done smoothly without having to run around multiple offices.',
  5,
  'August 2026',
  1,
  1
) ON DUPLICATE KEY UPDATE
  `client_name` = VALUES(`client_name`),
  `locality` = VALUES(`locality`),
  `service_used` = VALUES(`service_used`),
  `comment` = VALUES(`comment`),
  `rating` = VALUES(`rating`),
  `date_display` = VALUES(`date_display`);
INSERT INTO `testimonials` (
  `id`, `client_name`, `locality`, `service_used`, `comment`, `rating`, `date_display`, `is_published`, `display_order`
) VALUES (
  'exp-2',
  'Pooja S.',
  'Pushpak Nagar',
  'Passport Application Assistance',
  'They guided me properly for my passport application and helped organize all original school records for the PSK appointment. Excellent guidance!',
  5,
  'July 2026',
  1,
  2
) ON DUPLICATE KEY UPDATE
  `client_name` = VALUES(`client_name`),
  `locality` = VALUES(`locality`),
  `service_used` = VALUES(`service_used`),
  `comment` = VALUES(`comment`),
  `rating` = VALUES(`rating`),
  `date_display` = VALUES(`date_display`);
INSERT INTO `testimonials` (
  `id`, `client_name`, `locality`, `service_used`, `comment`, `rating`, `date_display`, `is_published`, `display_order`
) VALUES (
  'exp-3',
  'Amit K.',
  'Karanjade',
  'Domicile Certificate & ITR Filing',
  'Quick response on WhatsApp and the documentation check was thorough. Helped me file my ITR on time and get my domicile certificate sorted.',
  5,
  'August 2026',
  1,
  3
) ON DUPLICATE KEY UPDATE
  `client_name` = VALUES(`client_name`),
  `locality` = VALUES(`locality`),
  `service_used` = VALUES(`service_used`),
  `comment` = VALUES(`comment`),
  `rating` = VALUES(`rating`),
  `date_display` = VALUES(`date_display`);
INSERT INTO `testimonials` (
  `id`, `client_name`, `locality`, `service_used`, `comment`, `rating`, `date_display`, `is_published`, `display_order`
) VALUES (
  'exp-4',
  'Sunil Patil',
  'Vadghar',
  'Home Loan Documentation Support',
  'Safehands prepared my complete loan file and coordinated with the bank officer. Having clean paperwork made the sanction process much smoother.',
  5,
  'June 2026',
  1,
  4
) ON DUPLICATE KEY UPDATE
  `client_name` = VALUES(`client_name`),
  `locality` = VALUES(`locality`),
  `service_used` = VALUES(`service_used`),
  `comment` = VALUES(`comment`),
  `rating` = VALUES(`rating`),
  `date_display` = VALUES(`date_display`);

-- -------------------------------------------------------------------
-- Seed `reviews`
-- -------------------------------------------------------------------
INSERT INTO `reviews` (
  `id`, `author_name`, `platform`, `rating`, `review_text`, `date_display`, `verified`, `is_published`
) VALUES (
  'rev-1',
  'Kiran Deshmukh',
  'Google',
  5,
  'Excellent service for shop establishment licence and Udyam registration. Transparent guidance with no hidden charges. Highly recommended for business documentation in Panvel.',
  'July 2026',
  1,
  1
) ON DUPLICATE KEY UPDATE
  `author_name` = VALUES(`author_name`),
  `platform` = VALUES(`platform`),
  `rating` = VALUES(`rating`),
  `review_text` = VALUES(`review_text`),
  `date_display` = VALUES(`date_display`);
INSERT INTO `reviews` (
  `id`, `author_name`, `platform`, `rating`, `review_text`, `date_display`, `verified`, `is_published`
) VALUES (
  'rev-2',
  'Ramesh Gharat',
  'Google',
  5,
  'Visited their Hari Vithal Complex office in Panvel for my income certificate. The team explained the procedure clearly and verified every document before portal submission.',
  'August 2026',
  1,
  1
) ON DUPLICATE KEY UPDATE
  `author_name` = VALUES(`author_name`),
  `platform` = VALUES(`platform`),
  `rating` = VALUES(`rating`),
  `review_text` = VALUES(`review_text`),
  `date_display` = VALUES(`date_display`);
INSERT INTO `reviews` (
  `id`, `author_name`, `platform`, `rating`, `review_text`, `date_display`, `verified`, `is_published`
) VALUES (
  'rev-3',
  'Pravin Gaikwad',
  'Google',
  5,
  'Helped us organize paperwork for a personal loan without unnecessary delays. Staff is polite, responsive on WhatsApp, and understands bank requirements thoroughly.',
  'August 2026',
  1,
  1
) ON DUPLICATE KEY UPDATE
  `author_name` = VALUES(`author_name`),
  `platform` = VALUES(`platform`),
  `rating` = VALUES(`rating`),
  `review_text` = VALUES(`review_text`),
  `date_display` = VALUES(`date_display`);
INSERT INTO `reviews` (
  `id`, `author_name`, `platform`, `rating`, `review_text`, `date_display`, `verified`, `is_published`
) VALUES (
  'rev-4',
  'Sneha Joshi',
  'Google',
  5,
  'Best documentation consultation in Pushpak Old Panvel area. They reviewed my Aadhaar and PAN documents properly before submission so nothing got rejected.',
  'September 2026',
  1,
  1
) ON DUPLICATE KEY UPDATE
  `author_name` = VALUES(`author_name`),
  `platform` = VALUES(`platform`),
  `rating` = VALUES(`rating`),
  `review_text` = VALUES(`review_text`),
  `date_display` = VALUES(`date_display`);

-- -------------------------------------------------------------------
-- Seed initial sample `leads`
-- -------------------------------------------------------------------
INSERT INTO `leads` (`id`, `name`, `phone`, `email`, `service`, `locality`, `message`, `status`, `admin_notes`, `source`)
VALUES
(1, 'Vikram Shinde', '+91 98201 45678', 'vikram.shinde@example.com', 'GST Registration & Udyam Filing', 'Khanda Colony, Panvel', 'Need GST registration for a new retail hardware store starting next month.', 'new', 'Urgent filing requested before 15th.', 'website_contact'),
(2, 'Anjali Patil', '+91 97654 32109', 'anjali.patil@example.com', 'Income Certificate', 'Pushpak Nagar, Old Panvel', 'Need income certificate for engineering scholarship application deadline.', 'contacted', 'Ration card and salary certificate verified on WhatsApp.', 'enquiry_modal')
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`);
