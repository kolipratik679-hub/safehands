import React, { useState, useEffect, useCallback } from 'react';
import { PageRoute, ServiceCategory } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';
import { SearchModal } from './components/SearchModal';
import { EnquiryModal } from './components/EnquiryModal';

// Pages
import { HomePage } from './pages/HomePage';
import { ServicesDirectoryPage } from './pages/ServicesDirectoryPage';
import { CategoryServicesPage } from './pages/CategoryServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { AboutPage } from './pages/AboutPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { ResourcesPage } from './pages/ResourcesPage';
import { FaqPage } from './pages/FaqPage';
import { ContactPage } from './pages/ContactPage';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<PageRoute>('home');
  const [currentCategory, setCurrentCategory] = useState<ServiceCategory | undefined>(undefined);
  const [currentServiceSlug, setCurrentServiceSlug] = useState<string | undefined>(undefined);
  const [currentResourceSlug, setCurrentResourceSlug] = useState<string | undefined>(undefined);

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [enquiryService, setEnquiryService] = useState<string | undefined>(undefined);

  // Parse location hash on mount & hashchange for browser back/forward and deep linking
  const parseHash = useCallback(() => {
    const hash = window.location.hash.replace(/^#\/?/, '');
    if (!hash) {
      setCurrentRoute('home');
      setCurrentCategory(undefined);
      setCurrentServiceSlug(undefined);
      setCurrentResourceSlug(undefined);
      return;
    }

    const parts = hash.split('/');
    const root = parts[0];

    if (root === 'services') {
      setCurrentRoute('services');
    } else if (root === 'category' && parts[1]) {
      setCurrentRoute('category');
      setCurrentCategory(parts[1] as ServiceCategory);
    } else if (root === 'service' && parts[1]) {
      setCurrentRoute('service-detail');
      setCurrentServiceSlug(parts[1]);
    } else if (root === 'about') {
      setCurrentRoute('about');
    } else if (root === 'how-it-works') {
      setCurrentRoute('how-it-works');
    } else if (root === 'resources') {
      if (parts[1]) {
        setCurrentRoute('resource-detail');
        setCurrentResourceSlug(parts[1]);
      } else {
        setCurrentRoute('resources');
        setCurrentResourceSlug(undefined);
      }
    } else if (root === 'faq') {
      setCurrentRoute('faq');
    } else if (root === 'contact') {
      setCurrentRoute('contact');
    } else {
      setCurrentRoute('home');
    }
  }, []);

  useEffect(() => {
    parseHash();
    window.addEventListener('hashchange', parseHash);
    return () => window.removeEventListener('hashchange', parseHash);
  }, [parseHash]);

  // Navigate helper that updates hash and scrolls to top smoothly
  const handleNavigate = (
    route: PageRoute,
    category?: ServiceCategory,
    serviceSlug?: string,
    resourceSlug?: string
  ) => {
    setCurrentRoute(route);
    setCurrentCategory(category);
    setCurrentServiceSlug(serviceSlug);
    setCurrentResourceSlug(resourceSlug);

    // Update URL hash
    let newHash = '#';
    if (route === 'home') newHash = '#';
    else if (route === 'services') newHash = '#services';
    else if (route === 'category' && category) newHash = `#category/${category}`;
    else if (route === 'service-detail' && serviceSlug) newHash = `#service/${serviceSlug}`;
    else if (route === 'about') newHash = '#about';
    else if (route === 'how-it-works') newHash = '#how-it-works';
    else if (route === 'resources') newHash = '#resources';
    else if (route === 'resource-detail' && resourceSlug) newHash = `#resources/${resourceSlug}`;
    else if (route === 'faq') newHash = '#faq';
    else if (route === 'contact') newHash = '#contact';

    window.history.pushState(null, '', newHash);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenEnquiry = (serviceName?: string) => {
    setEnquiryService(serviceName);
    setIsEnquiryOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fcfdfd] text-slate-900 selection:bg-blue-600 selection:text-white font-sans antialiased">
      {/* Header */}
      <Header
        currentRoute={currentRoute}
        currentCategory={currentCategory}
        onNavigate={handleNavigate}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenEnquiry={handleOpenEnquiry}
      />

      {/* Main Page Views */}
      <main className="flex-1">
        {currentRoute === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onOpenEnquiry={handleOpenEnquiry}
          />
        )}

        {currentRoute === 'services' && (
          <ServicesDirectoryPage
            onNavigate={handleNavigate}
            onOpenEnquiry={handleOpenEnquiry}
          />
        )}

        {currentRoute === 'category' && (
          <CategoryServicesPage
            category={currentCategory || 'government-services'}
            onNavigate={handleNavigate}
            onOpenEnquiry={handleOpenEnquiry}
          />
        )}

        {currentRoute === 'service-detail' && (
          <ServiceDetailPage
            serviceSlug={currentServiceSlug || 'pan-card-new-correction'}
            onNavigate={handleNavigate}
            onOpenEnquiry={handleOpenEnquiry}
          />
        )}

        {currentRoute === 'about' && (
          <AboutPage
            onNavigate={handleNavigate}
            onOpenEnquiry={handleOpenEnquiry}
          />
        )}

        {currentRoute === 'how-it-works' && (
          <HowItWorksPage
            onNavigate={handleNavigate}
            onOpenEnquiry={handleOpenEnquiry}
          />
        )}

        {currentRoute === 'resources' && (
          <ResourcesPage
            onNavigate={handleNavigate}
            onOpenEnquiry={handleOpenEnquiry}
          />
        )}

        {currentRoute === 'resource-detail' && (
          <ResourcesPage
            selectedSlug={currentResourceSlug}
            onNavigate={handleNavigate}
            onOpenEnquiry={handleOpenEnquiry}
          />
        )}

        {currentRoute === 'faq' && (
          <FaqPage
            onNavigate={handleNavigate}
            onOpenEnquiry={handleOpenEnquiry}
          />
        )}

        {currentRoute === 'contact' && (
          <ContactPage
            onNavigate={handleNavigate}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenEnquiry={handleOpenEnquiry}
      />

      {/* Floating Action Button */}
      <FloatingActions onOpenEnquiry={handleOpenEnquiry} />

      {/* Search Modal (Global Cmd+K) */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectService={(slug) => handleNavigate('service-detail', undefined, slug)}
        onSelectCategory={(cat) => handleNavigate('category', cat)}
        onSelectResource={(slug) => handleNavigate('resource-detail', undefined, undefined, slug)}
      />

      {/* Enquiry / Consultation Modal */}
      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        prefilledServiceName={enquiryService}
      />
    </div>
  );
}
