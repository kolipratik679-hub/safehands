import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  ServiceItem,
  ClientFeedback,
  ReviewItem,
  ContactDetails,
  ServiceCategory
} from '../types';
import { ALL_SERVICES_DATA } from '../data/servicesData';
import { CLIENT_EXPERIENCES } from '../data/faqsData';

export const DEFAULT_CONTACT_DETAILS: ContactDetails = {
  id: 1,
  primaryPhone: '+91 76660 40771',
  secondaryPhone: '+91 80977 59771',
  whatsappNumber: '+91 76660 40771',
  email: 'safehands0977@gmail.com',
  addressLine1: 'Shop No. 4, Plot No. 284, Hari Vithal Complex',
  addressLine2: 'Sector R3, Pushpak Old Panvel, Vadghar',
  city: 'Panvel',
  district: 'Raigad',
  state: 'Maharashtra',
  pincode: '410220',
  businessHours: 'Monday - Saturday: 9:00 AM - 7:00 PM | Sunday: Closed (WhatsApp queries attended)',
  googleMapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3772.637731766861!2d73.1162!3d18.9926!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDU5JzMzLjQiTiA3M8KwMDYnNTguMyJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin',
  googleMapUrl: 'https://maps.google.com/?q=Hari+Vithal+Complex+Pushpak+Old+Panvel+Vadghar+Raigad+410220'
};

interface LeadSubmission {
  name: string;
  phone: string;
  email?: string;
  service: string;
  locality?: string;
  message?: string;
  source?: string;
}

interface DataContextType {
  contactDetails: ContactDetails;
  services: ServiceItem[];
  testimonials: ClientFeedback[];
  reviews: ReviewItem[];
  loading: boolean;
  refreshData: () => Promise<void>;
  submitLead: (lead: LeadSubmission) => Promise<{ success: boolean; message: string; error?: string }>;
  getServiceBySlug: (slug: string) => ServiceItem | undefined;
}

const DataContext = createContext<DataContextType | null>(null);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [contactDetails, setContactDetails] = useState<ContactDetails>(DEFAULT_CONTACT_DETAILS);
  const [services, setServices] = useState<ServiceItem[]>(ALL_SERVICES_DATA);
  const [testimonials, setTestimonials] = useState<ClientFeedback[]>(CLIENT_EXPERIENCES);
  const [reviews, setReviews] = useState<ReviewItem[]>([
    {
      id: 'rev-1',
      authorName: 'Kiran Deshmukh',
      platform: 'Google',
      rating: 5.0,
      reviewText: 'Excellent service for shop establishment licence and Udyam registration. Transparent guidance with no hidden charges.',
      dateDisplay: 'July 2026',
      verified: true,
      isPublished: true
    },
    {
      id: 'rev-2',
      authorName: 'Ramesh Gharat',
      platform: 'Google',
      rating: 5.0,
      reviewText: 'Visited their Hari Vithal Complex office in Panvel for my income certificate. The team explained the procedure clearly.',
      dateDisplay: 'August 2026',
      verified: true,
      isPublished: true
    }
  ]);
  const [loading, setLoading] = useState(true);

  // Fetch dynamic data from database API
  const refreshData = useCallback(async () => {
    try {
      // 1. Contact Details
      const contactRes = await fetch('/api/contact-details');
      if (contactRes.ok) {
        const contactJson = await contactRes.json();
        if (contactJson.success && contactJson.data) {
          const d = contactJson.data;
          setContactDetails({
            id: d.id,
            primaryPhone: d.primary_phone || DEFAULT_CONTACT_DETAILS.primaryPhone,
            secondaryPhone: d.secondary_phone || DEFAULT_CONTACT_DETAILS.secondaryPhone,
            whatsappNumber: d.whatsapp_number || DEFAULT_CONTACT_DETAILS.whatsappNumber,
            email: d.email || DEFAULT_CONTACT_DETAILS.email,
            addressLine1: d.address_line1 || DEFAULT_CONTACT_DETAILS.addressLine1,
            addressLine2: d.address_line2 || DEFAULT_CONTACT_DETAILS.addressLine2,
            city: d.city || DEFAULT_CONTACT_DETAILS.city,
            district: d.district || DEFAULT_CONTACT_DETAILS.district,
            state: d.state || DEFAULT_CONTACT_DETAILS.state,
            pincode: d.pincode || DEFAULT_CONTACT_DETAILS.pincode,
            businessHours: d.business_hours || DEFAULT_CONTACT_DETAILS.businessHours,
            googleMapEmbed: d.google_map_embed || DEFAULT_CONTACT_DETAILS.googleMapEmbed,
            googleMapUrl: d.google_map_url || DEFAULT_CONTACT_DETAILS.googleMapUrl
          });
        }
      }

      // 2. Services
      const servicesRes = await fetch('/api/services');
      if (servicesRes.ok) {
        const servicesJson = await servicesRes.json();
        if (servicesJson.success && Array.isArray(servicesJson.data) && servicesJson.data.length > 0) {
          const mapped: ServiceItem[] = servicesJson.data.map((s: any) => ({
            id: s.id,
            slug: s.slug,
            name: s.name,
            shortDescription: s.short_description,
            fullDescription: s.full_description,
            category: s.category as ServiceCategory,
            categoryName: s.category_name,
            iconName: s.icon_name,
            turnaroundTime: s.turnaround_time,
            popular: Boolean(s.popular),
            requiredDocuments: Array.isArray(s.required_documents) ? s.required_documents : [],
            processSteps: Array.isArray(s.process_steps) ? s.process_steps : [],
            importantNotes: s.important_notes,
            whoNeedsThis: s.who_needs_this,
            relatedServiceSlugs: Array.isArray(s.related_service_slugs) ? s.related_service_slugs : []
          }));
          setServices(mapped);
        }
      }

      // 3. Testimonials
      const testRes = await fetch('/api/testimonials');
      if (testRes.ok) {
        const testJson = await testRes.json();
        if (testJson.success && Array.isArray(testJson.data) && testJson.data.length > 0) {
          const mappedTest: ClientFeedback[] = testJson.data.map((t: any) => ({
            id: t.id,
            clientName: t.client_name,
            locality: t.locality,
            serviceUsed: t.service_used,
            comment: t.comment,
            date: t.date_display,
            rating: t.rating,
            isPublished: Boolean(t.is_published)
          }));
          setTestimonials(mappedTest);
        }
      }

      // 4. Reviews
      const revRes = await fetch('/api/reviews');
      if (revRes.ok) {
        const revJson = await revRes.json();
        if (revJson.success && Array.isArray(revJson.data) && revJson.data.length > 0) {
          const mappedRev: ReviewItem[] = revJson.data.map((r: any) => ({
            id: r.id,
            authorName: r.author_name,
            platform: r.platform,
            rating: Number(r.rating),
            reviewText: r.review_text,
            dateDisplay: r.date_display,
            verified: Boolean(r.verified),
            isPublished: Boolean(r.is_published)
          }));
          setReviews(mappedRev);
        }
      }
    } catch (err) {
      console.warn('[DataContext] Backend data sync notice (using bundled fallback data):', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  // Lead submission
  const submitLead = async (lead: LeadSubmission) => {
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lead)
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        return { success: false, message: '', error: data.error || 'Failed to submit inquiry' };
      }
      return { success: true, message: data.message || 'Inquiry received successfully!' };
    } catch (err: any) {
      return { success: false, message: '', error: err.message || 'Network error occurred. Please try again.' };
    }
  };

  const getServiceBySlug = (slug: string) => {
    return services.find(s => s.slug === slug);
  };

  return (
    <DataContext.Provider
      value={{
        contactDetails,
        services,
        testimonials,
        reviews,
        loading,
        refreshData,
        submitLead,
        getServiceBySlug
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
