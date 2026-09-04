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
  | 'contact';
