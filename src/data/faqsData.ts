import { FAQItem, ClientFeedback } from '../types';

export const FAQS_DATA: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'general',
    question: 'Where is Safehands Enterprises located in Panvel?',
    answer: 'We are situated at Shop No. 4, Plot No. 284, Hari Vithal Complex, Sector R3, Pushpak Old Panvel, Vadghar, Raigad - 410220. We are centrally located and easily accessible from Panvel, Old Panvel, Pushpak Nagar, Vadghar, and Karanjade.',
  },
  {
    id: 'faq-2',
    category: 'general',
    question: 'What are your operating hours?',
    answer: 'Our center is open Monday through Saturday from 9:00 AM to 7:00 PM. On Sundays, we are closed for routine walk-ins, but emergency queries can be sent to us via WhatsApp at +91 76660 40771.',
  },
  {
    id: 'faq-3',
    category: 'general',
    question: 'Do I need to make an appointment before visiting?',
    answer: 'Walk-ins are always welcome during operating hours for general consultations, Xerox/printing, and certificate queries. However, for comprehensive loan dossier compilation or detailed business setup, a quick WhatsApp message or call beforehand allows us to prepare your document checklist in advance.',
  },
  {
    id: 'faq-4',
    category: 'government',
    question: 'How long does it take to obtain a Domicile or Income Certificate in Maharashtra?',
    answer: 'After preliminary verification and online portal submission on Aaple Sarkar, Tahsil/SDO processing typically takes between 7 to 15 working days for Income Certificates and 10 to 20 working days for Domicile Certificates, subject to revenue authority verification.',
  },
  {
    id: 'faq-5',
    category: 'government',
    question: 'Can Safehands update my biometric details on Aadhaar directly?',
    answer: 'Biometric capture (fingerprints and iris scans) can only be conducted in person at an authorized UIDAI Aadhaar Seva Kendra. Safehands provides document validation, address update submission assistance, and official appointment booking for your biometric visit.',
  },
  {
    id: 'faq-6',
    category: 'tax',
    question: 'What is the difference between GST registration and Udyam MSME registration?',
    answer: 'Udyam Registration recognizes your business as a Micro, Small, or Medium Enterprise with the Ministry of MSME (providing loan subsidies and government tender benefits). GST registration provides a tax identification number (GSTIN) required for billing, inter-state sales, or businesses crossing specific turnover thresholds (₹20L / ₹40L). Both serve distinct legal purposes, and many businesses require both.',
  },
  {
    id: 'faq-7',
    category: 'tax',
    question: 'Which ITR form should I file as a salaried person with minor freelance income?',
    answer: 'Salaried individuals with income up to ₹50 Lakhs generally use ITR-1 (Sahaj). However, if you have additional income from freelancing, business, or capital gains, you will need to file ITR-2, ITR-3, or ITR-4 (presumptive taxation). We review your bank statements and Form 26AS to identify the right form and prevent defective notice queries from the tax department.',
  },
  {
    id: 'faq-8',
    category: 'loans',
    question: 'Do you guarantee loan approval from banks?',
    answer: 'No. Loan sanction and interest rates are determined solely by lending banks and NBFCs based on their credit criteria, property valuation, and your CIBIL score. Safehands Enterprises provides transparent file preparation, income computation, document verification, and bank liaison to ensure your file has no discrepancies that would lead to avoidable rejections.',
  },
  {
    id: 'faq-9',
    category: 'loans',
    question: 'What documents are crucial for a Home Loan in Panvel?',
    answer: 'Key documents include 3 months salary slips with Form 16 (or 3 years ITR for business owners), 6 to 12 months active bank statements, PAN & Aadhaar, builder allotment letter or registered sale agreement, and property tax receipts.',
  },
  {
    id: 'faq-10',
    category: 'utility',
    question: 'Can I send documents on WhatsApp for urgent printing or Xerox?',
    answer: 'Yes! You can share your PDF files or images directly to our WhatsApp number (+91 76660 40771). We will prepare your high-resolution prints, Xerox, or lamination so your documents are ready for pickup when you arrive.',
  },
];

export const CLIENT_EXPERIENCES: ClientFeedback[] = [
  {
    id: 'exp-1',
    clientName: 'Rahul M.',
    locality: 'Old Panvel',
    serviceUsed: 'GST Registration & Udyam Filing',
    comment: 'Very professional and helpful team. Got my GST registration and Udyam certificate done smoothly without having to run around multiple offices.',
    date: 'August 2026',
  },
  {
    id: 'exp-2',
    clientName: 'Pooja S.',
    locality: 'Pushpak Nagar',
    serviceUsed: 'Passport Application Assistance',
    comment: 'They guided me properly for my passport application and helped organize all original school records for the PSK appointment. Excellent guidance!',
    date: 'July 2026',
  },
  {
    id: 'exp-3',
    clientName: 'Amit K.',
    locality: 'Karanjade',
    serviceUsed: 'Domicile Certificate & ITR Filing',
    comment: 'Quick response on WhatsApp and the documentation check was thorough. Helped me file my ITR on time and get my domicile certificate sorted.',
    date: 'August 2026',
  },
  {
    id: 'exp-4',
    clientName: 'Sunil Patil',
    locality: 'Vadghar',
    serviceUsed: 'Home Loan Documentation Support',
    comment: 'Safehands prepared my complete loan file and coordinated with the bank officer. Having clean paperwork made the sanction process much smoother.',
    date: 'June 2026',
  },
];
