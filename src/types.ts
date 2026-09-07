export type ServiceCategory = 
  | 'government'
  | 'business-tax'
  | 'loans-financial'
  | 'documents-certificates'
  | 'licences-registrations'
  | 'printing-utility';

export interface ServiceItem {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  category: ServiceCategory;
  categoryName: string;
  iconName: string;
  turnaroundTime: string;
  popular?: boolean;
  requiredDocuments: string[];
  processSteps: string[];
  importantNotes?: string;
  whoNeedsThis?: string;
  relatedServiceSlugs?: string[];
}

export interface CategoryInfo {
  id: ServiceCategory;
  name: string;
  shortTitle: string;
  tagline: string;
  description: string;
  iconName: string;
  colorScheme: {
    bg: string;
    text: string;
    border: string;
    badge: string;
  };
}

export interface ResourceArticle {
  id: string;
  slug: string;
  title: string;
  category: string;
  readTime: string;
  publishedDate: string;
  summary: string;
  content: string[];
  checklist?: string[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'government' | 'tax' | 'loans' | 'utility';
}

export interface ClientFeedback {
  id: string;
  clientName: string;
  locality: string;
  serviceUsed: string;
  comment: string;
  date: string;
  rating?: number;
  isPublished?: boolean;
}

export interface ReviewItem {
  id: string;
  authorName: string;
  platform: string;
  rating: number;
  reviewText: string;
  dateDisplay: string;
  verified: boolean;
  isPublished: boolean;
}

export interface LeadItem {
  id: number;
  name: string;
  phone: string;
  email: string | null;
  service: string;
  locality: string | null;
  message: string | null;
  status: 'new' | 'contacted' | 'in_progress' | 'completed' | 'cancelled';
  adminNotes: string | null;
  source: string;
  createdAt: string;
}

export interface ContactDetails {
  id: number;
  primaryPhone: string;
  secondaryPhone: string;
  whatsappNumber: string;
  email: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  district: string;
  state: string;
  pincode: string;
  businessHours: string;
  googleMapEmbed: string;
  googleMapUrl: string;
}

export interface AdminUser {
  id: number;
  email: string;
  role: string;
}

export type PageRoute = 
  | 'home'
  | 'about'
  | 'how-it-works'
  | 'services'
  | 'category'
  | 'service-detail'
  | 'resources'
  | 'resource-detail'
  | 'faq'
  | 'contact'
  | 'admin';
