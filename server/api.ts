import express, { Request, Response } from 'express';
import {
  getAdminUserByEmail,
  updateAdminCredentials,
  getContactDetails,
  updateContactDetails,
  getAllServices,
  getServiceBySlug,
  updateService,
  getLeads,
  getLeadById,
  createLead,
  updateLead,
  deleteLead,
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  getReviews,
  createReview,
  updateReview,
  deleteReview,
  getDashboardStats,
  getDatabaseStatus
} from './db';
import {
  checkLoginRateLimit,
  recordFailedLogin,
  resetLoginRateLimit,
  verifyPassword,
  hashPassword,
  generateToken,
  requireAdminAuth
} from './auth';

export const apiRouter = express.Router();

// Helper to sanitize strings from unwanted HTML tags
function sanitizeInput(val: any): string {
  if (typeof val !== 'string') return '';
  return val.replace(/<[^>]*>?/gm, '').trim();
}

// -------------------------------------------------------------
// PUBLIC ENDPOINTS
// -------------------------------------------------------------

// System Health & DB Connectivity
apiRouter.get('/health', async (_req: Request, res: Response) => {
  try {
    const status = await getDatabaseStatus();
    res.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      database: status
    });
  } catch (err: any) {
    res.status(500).json({ status: 'error', error: err?.message });
  }
});

// Get Contact Information (Source of Truth for Header, Footer, Contact Page)
apiRouter.get('/contact-details', async (_req: Request, res: Response) => {
  try {
    const details = await getContactDetails();
    res.json({ success: true, data: details });
  } catch (err: any) {
    res.status(500).json({ success: false, error: 'Failed to retrieve contact details' });
  }
});

// Get Services (Public)
apiRouter.get('/services', async (_req: Request, res: Response) => {
  try {
    const services = await getAllServices();
    // Only return active services for public website
    const active = services.filter(s => s.is_active === 1);
    res.json({ success: true, count: active.length, data: active });
  } catch (err: any) {
    res.status(500).json({ success: false, error: 'Failed to retrieve services' });
  }
});

// Get Single Service by Slug (Public)
apiRouter.get('/services/:slug', async (req: Request, res: Response) => {
  try {
    const service = await getServiceBySlug(req.params.slug);
    if (!service) {
      res.status(404).json({ success: false, error: 'Service not found' });
      return;
    }
    res.json({ success: true, data: service });
  } catch (err: any) {
    res.status(500).json({ success: false, error: 'Failed to retrieve service' });
  }
});

// Get Testimonials (Public)
apiRouter.get('/testimonials', async (_req: Request, res: Response) => {
  try {
    const testimonials = await getTestimonials(true);
    res.json({ success: true, data: testimonials });
  } catch (err: any) {
    res.status(500).json({ success: false, error: 'Failed to retrieve testimonials' });
  }
});

// Get Reviews (Public)
apiRouter.get('/reviews', async (_req: Request, res: Response) => {
  try {
    const reviews = await getReviews(true);
    res.json({ success: true, data: reviews });
  } catch (err: any) {
    res.status(500).json({ success: false, error: 'Failed to retrieve reviews' });
  }
});

// Public Lead Creation (Contact Form / Enquiry Modal -> MySQL)
apiRouter.post('/leads', async (req: Request, res: Response) => {
  try {
    const name = sanitizeInput(req.body.name);
    const phone = sanitizeInput(req.body.phone);
    const email = sanitizeInput(req.body.email);
    const service = sanitizeInput(req.body.service) || 'General Consultation';
    const locality = sanitizeInput(req.body.locality);
    const message = sanitizeInput(req.body.message);
    const source = sanitizeInput(req.body.source) || 'website_contact';

    // Validation
    if (!name || name.length < 2) {
      res.status(400).json({ success: false, error: 'Please provide a valid full name.' });
      return;
    }

    // Clean phone (must have at least 10 digits)
    const digits = phone.replace(/\D/g, '');
    if (!digits || digits.length < 10) {
      res.status(400).json({ success: false, error: 'Please provide a valid 10-digit mobile number.' });
      return;
    }

    if (email && !email.includes('@')) {
      res.status(400).json({ success: false, error: 'Please enter a valid email address.' });
      return;
    }

    const newLead = await createLead({
      name,
      phone,
      email: email || null,
      service,
      locality: locality || null,
      message: message || null,
      status: 'new',
      admin_notes: null,
      source
    });

    console.log(`[LEAD RECEIVED] Created lead #${newLead.id} for "${name}" (${phone}) - Service: ${service}`);

    res.status(201).json({
      success: true,
      message: 'Your inquiry has been received. Our team at Pushpak Old Panvel will contact you shortly.',
      leadId: newLead.id
    });
  } catch (err: any) {
    console.error('[API] Lead creation error:', err);
    res.status(500).json({ success: false, error: 'An error occurred while saving your inquiry. Please call us directly.' });
  }
});

// -------------------------------------------------------------
// ADMIN AUTHENTICATION
// -------------------------------------------------------------

// Admin Login
apiRouter.post('/admin/login', async (req: Request, res: Response) => {
  const ip = req.ip || req.socket.remoteAddress || 'unknown';
  const rateCheck = checkLoginRateLimit(ip);

  if (!rateCheck.allowed) {
    res.status(429).json({
      success: false,
      error: `Too many failed login attempts. Please wait ${rateCheck.waitSeconds} seconds before trying again.`
    });
    return;
  }

  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ success: false, error: 'Email and password are required.' });
    return;
  }

  try {
    const user = await getAdminUserByEmail(email.trim());

    if (!user) {
      recordFailedLogin(ip);
      res.status(401).json({ success: false, error: 'Invalid admin credentials.' });
      return;
    }

    const isValid = await verifyPassword(password, user.password_hash);
    if (!isValid) {
      recordFailedLogin(ip);
      res.status(401).json({ success: false, error: 'Invalid admin credentials.' });
      return;
    }

    // Success: reset rate limit & generate JWT
    resetLoginRateLimit(ip);
    const token = generateToken({
      id: user.id,
      email: user.email,
      role: user.role || 'admin'
    });

    // Set secure cookie as well
    res.cookie('safehands_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.json({
      success: true,
      message: 'Admin authentication successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role || 'admin'
      }
    });
  } catch (err: any) {
    console.error('[API] Admin login error:', err);
    res.status(500).json({ success: false, error: 'Authentication service error' });
  }
});

// Check Current Admin Session
apiRouter.get('/admin/me', requireAdminAuth, async (req: Request, res: Response) => {
  const adminPayload = (req as any).adminUser;
  res.json({
    success: true,
    user: {
      id: adminPayload.id,
      email: adminPayload.email,
      role: adminPayload.role
    }
  });
});

// Logout
apiRouter.post('/admin/logout', (_req: Request, res: Response) => {
  res.clearCookie('safehands_token');
  res.json({ success: true, message: 'Logged out successfully' });
});

// -------------------------------------------------------------
// ADMIN DASHBOARD & MODULES (PROTECTED)
// -------------------------------------------------------------

// Dashboard Stats & KPI Counters
apiRouter.get('/admin/stats', requireAdminAuth, async (_req: Request, res: Response) => {
  try {
    const stats = await getDashboardStats();
    res.json({ success: true, data: stats });
  } catch (err: any) {
    res.status(500).json({ success: false, error: 'Failed to retrieve dashboard stats' });
  }
});

// Database & System Diagnostics
apiRouter.get('/admin/settings/status', requireAdminAuth, async (_req: Request, res: Response) => {
  try {
    const status = await getDatabaseStatus();
    res.json({ success: true, data: status });
  } catch (err: any) {
    res.status(500).json({ success: false, error: 'Failed to retrieve system status' });
  }
});

// --- SERVICES CRUD ---
apiRouter.get('/admin/services', requireAdminAuth, async (_req: Request, res: Response) => {
  try {
    const services = await getAllServices();
    res.json({ success: true, count: services.length, data: services });
  } catch (err: any) {
    res.status(500).json({ success: false, error: 'Failed to retrieve services' });
  }
});

apiRouter.put('/admin/services/:id', requireAdminAuth, async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const updates = req.body;
    const updated = await updateService(id, updates);
    if (!updated) {
      res.status(404).json({ success: false, error: 'Service not found' });
      return;
    }
    res.json({ success: true, message: 'Service updated successfully', data: updated });
  } catch (err: any) {
    res.status(500).json({ success: false, error: 'Failed to update service' });
  }
});

// --- LEADS MANAGEMENT ---
apiRouter.get('/admin/leads', requireAdminAuth, async (req: Request, res: Response) => {
  try {
    const search = req.query.search ? String(req.query.search) : undefined;
    const status = req.query.status ? String(req.query.status) : undefined;
    const leads = await getLeads({ search, status });
    res.json({ success: true, count: leads.length, data: leads });
  } catch (err: any) {
    res.status(500).json({ success: false, error: 'Failed to retrieve leads' });
  }
});

apiRouter.get('/admin/leads/:id', requireAdminAuth, async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const lead = await getLeadById(id);
    if (!lead) {
      res.status(404).json({ success: false, error: 'Lead not found' });
      return;
    }
    res.json({ success: true, data: lead });
  } catch (err: any) {
    res.status(500).json({ success: false, error: 'Failed to retrieve lead' });
  }
});

apiRouter.put('/admin/leads/:id', requireAdminAuth, async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const updates = req.body;
    const updated = await updateLead(id, updates);
    if (!updated) {
      res.status(404).json({ success: false, error: 'Lead not found' });
      return;
    }
    res.json({ success: true, message: 'Lead updated successfully', data: updated });
  } catch (err: any) {
    res.status(500).json({ success: false, error: 'Failed to update lead' });
  }
});

apiRouter.delete('/admin/leads/:id', requireAdminAuth, async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const success = await deleteLead(id);
    if (!success) {
      res.status(404).json({ success: false, error: 'Lead not found or already removed' });
      return;
    }
    res.json({ success: true, message: 'Lead deleted successfully' });
  } catch (err: any) {
    res.status(500).json({ success: false, error: 'Failed to delete lead' });
  }
});

// Export Leads CSV
apiRouter.get('/admin/leads-export/csv', requireAdminAuth, async (_req: Request, res: Response) => {
  try {
    const leads = await getLeads();
    const headers = ['ID', 'Date', 'Name', 'Phone', 'Email', 'Service', 'Locality', 'Status', 'Notes', 'Source'];
    const rows = leads.map(l => [
      l.id,
      `"${new Date(l.created_at).toLocaleString('en-IN')}"`,
      `"${(l.name || '').replace(/"/g, '""')}"`,
      `"${l.phone}"`,
      `"${l.email || ''}"`,
      `"${(l.service || '').replace(/"/g, '""')}"`,
      `"${(l.locality || '').replace(/"/g, '""')}"`,
      `"${l.status}"`,
      `"${(l.admin_notes || '').replace(/"/g, '""')}"`,
      `"${l.source}"`
    ]);

    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="safehands_leads_${new Date().toISOString().slice(0, 10)}.csv"`);
    res.send(csv);
  } catch (err: any) {
    res.status(500).json({ success: false, error: 'Failed to export leads' });
  }
});

// --- TESTIMONIALS CRUD ---
apiRouter.get('/admin/testimonials', requireAdminAuth, async (_req: Request, res: Response) => {
  try {
    const testimonials = await getTestimonials(false); // all
    res.json({ success: true, count: testimonials.length, data: testimonials });
  } catch (err: any) {
    res.status(500).json({ success: false, error: 'Failed to retrieve testimonials' });
  }
});

apiRouter.post('/admin/testimonials', requireAdminAuth, async (req: Request, res: Response) => {
  try {
    const { client_name, locality, service_used, comment, rating, date_display, is_published, display_order } = req.body;
    if (!client_name || !comment) {
      res.status(400).json({ success: false, error: 'Client name and comment are required' });
      return;
    }
    const created = await createTestimonial({
      client_name: sanitizeInput(client_name),
      locality: sanitizeInput(locality) || 'Panvel',
      service_used: sanitizeInput(service_used) || 'Documentation Assistance',
      comment: sanitizeInput(comment),
      rating: Number(rating) || 5,
      date_display: sanitizeInput(date_display) || new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      is_published: is_published !== undefined ? Number(is_published) : 1,
      display_order: Number(display_order) || 0
    });
    res.status(201).json({ success: true, message: 'Testimonial added successfully', data: created });
  } catch (err: any) {
    res.status(500).json({ success: false, error: 'Failed to add testimonial' });
  }
});

apiRouter.put('/admin/testimonials/:id', requireAdminAuth, async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const updated = await updateTestimonial(id, req.body);
    if (!updated) {
      res.status(404).json({ success: false, error: 'Testimonial not found' });
      return;
    }
    res.json({ success: true, message: 'Testimonial updated successfully', data: updated });
  } catch (err: any) {
    res.status(500).json({ success: false, error: 'Failed to update testimonial' });
  }
});

apiRouter.delete('/admin/testimonials/:id', requireAdminAuth, async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const success = await deleteTestimonial(id);
    if (!success) {
      res.status(404).json({ success: false, error: 'Testimonial not found or already deleted' });
      return;
    }
    res.json({ success: true, message: 'Testimonial deleted successfully' });
  } catch (err: any) {
    res.status(500).json({ success: false, error: 'Failed to delete testimonial' });
  }
});

// --- REVIEWS CRUD ---
apiRouter.get('/admin/reviews', requireAdminAuth, async (_req: Request, res: Response) => {
  try {
    const reviews = await getReviews(false); // all
    res.json({ success: true, count: reviews.length, data: reviews });
  } catch (err: any) {
    res.status(500).json({ success: false, error: 'Failed to retrieve reviews' });
  }
});

apiRouter.post('/admin/reviews', requireAdminAuth, async (req: Request, res: Response) => {
  try {
    const { author_name, platform, rating, review_text, date_display, verified, is_published } = req.body;
    if (!author_name || !review_text) {
      res.status(400).json({ success: false, error: 'Author name and review text are required' });
      return;
    }
    const created = await createReview({
      author_name: sanitizeInput(author_name),
      platform: sanitizeInput(platform) || 'Google',
      rating: Number(rating) || 5.0,
      review_text: sanitizeInput(review_text),
      date_display: sanitizeInput(date_display) || new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      verified: verified !== undefined ? Number(verified) : 1,
      is_published: is_published !== undefined ? Number(is_published) : 1
    });
    res.status(201).json({ success: true, message: 'Review added successfully', data: created });
  } catch (err: any) {
    res.status(500).json({ success: false, error: 'Failed to add review' });
  }
});

apiRouter.put('/admin/reviews/:id', requireAdminAuth, async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const updated = await updateReview(id, req.body);
    if (!updated) {
      res.status(404).json({ success: false, error: 'Review not found' });
      return;
    }
    res.json({ success: true, message: 'Review updated successfully', data: updated });
  } catch (err: any) {
    res.status(500).json({ success: false, error: 'Failed to update review' });
  }
});

apiRouter.delete('/admin/reviews/:id', requireAdminAuth, async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const success = await deleteReview(id);
    if (!success) {
      res.status(404).json({ success: false, error: 'Review not found or already deleted' });
      return;
    }
    res.json({ success: true, message: 'Review deleted successfully' });
  } catch (err: any) {
    res.status(500).json({ success: false, error: 'Failed to delete review' });
  }
});

// --- CONTACT DETAILS MANAGEMENT ---
apiRouter.get('/admin/contact-details', requireAdminAuth, async (_req: Request, res: Response) => {
  try {
    const details = await getContactDetails();
    res.json({ success: true, data: details });
  } catch (err: any) {
    res.status(500).json({ success: false, error: 'Failed to retrieve contact details' });
  }
});

apiRouter.put('/admin/contact-details', requireAdminAuth, async (req: Request, res: Response) => {
  try {
    const {
      primary_phone,
      secondary_phone,
      whatsapp_number,
      email,
      address_line1,
      address_line2,
      city,
      district,
      state,
      pincode,
      business_hours,
      google_map_embed,
      google_map_url
    } = req.body;

    if (!primary_phone || !whatsapp_number || !email) {
      res.status(400).json({ success: false, error: 'Primary phone, WhatsApp number, and email are required.' });
      return;
    }

    const updated = await updateContactDetails({
      primary_phone: sanitizeInput(primary_phone),
      secondary_phone: sanitizeInput(secondary_phone) || '+91 80977 59771',
      whatsapp_number: sanitizeInput(whatsapp_number),
      email: sanitizeInput(email),
      address_line1: sanitizeInput(address_line1),
      address_line2: sanitizeInput(address_line2),
      city: sanitizeInput(city),
      district: sanitizeInput(district),
      state: sanitizeInput(state),
      pincode: sanitizeInput(pincode),
      business_hours: sanitizeInput(business_hours),
      google_map_embed: google_map_embed || '',
      google_map_url: google_map_url || ''
    });

    res.json({ success: true, message: 'Contact details updated successfully', data: updated });
  } catch (err: any) {
    res.status(500).json({ success: false, error: 'Failed to update contact details' });
  }
});

// --- SETTINGS: ADMIN CREDENTIALS UPDATE ---
apiRouter.put('/admin/settings/credentials', requireAdminAuth, async (req: Request, res: Response) => {
  try {
    const adminPayload = (req as any).adminUser;
    const { currentPassword, newEmail, newPassword } = req.body;

    if (!currentPassword) {
      res.status(400).json({ success: false, error: 'Current password is required to make security changes.' });
      return;
    }

    const currentAdmin = await getAdminUserByEmail(adminPayload.email);
    if (!currentAdmin) {
      res.status(404).json({ success: false, error: 'Admin account not found.' });
      return;
    }

    const isCurrentValid = await verifyPassword(currentPassword, currentAdmin.password_hash);
    if (!isCurrentValid) {
      res.status(401).json({ success: false, error: 'Current password is incorrect.' });
      return;
    }

    const emailToSet = newEmail ? newEmail.trim().toLowerCase() : currentAdmin.email;
    let hashToSet = currentAdmin.password_hash;

    if (newPassword) {
      if (newPassword.length < 8) {
        res.status(400).json({ success: false, error: 'New password must be at least 8 characters long.' });
        return;
      }
      hashToSet = await hashPassword(newPassword);
    }

    await updateAdminCredentials(currentAdmin.id, emailToSet, hashToSet);

    // Issue refreshed token with updated email
    const newToken = generateToken({
      id: currentAdmin.id,
      email: emailToSet,
      role: currentAdmin.role || 'admin'
    });

    res.json({
      success: true,
      message: 'Credentials updated successfully. Please use your new credentials for future logins.',
      token: newToken,
      user: {
        id: currentAdmin.id,
        email: emailToSet
      }
    });
  } catch (err: any) {
    console.error('[API] Credentials update error:', err);
    res.status(500).json({ success: false, error: 'Failed to update admin credentials' });
  }
});
