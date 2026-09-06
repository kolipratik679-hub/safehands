import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { WhatsAppIcon } from './WhatsAppIcon';
import { CATEGORIES_DATA } from '../data/servicesData';
import { PageRoute, ServiceCategory } from '../types';
import {
  Phone,
  Clock,
  MapPin,
  ChevronDown,
  Search,
  Menu,
  X,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { ServiceIcon } from './ServiceIcon';

interface HeaderProps {
  currentRoute: PageRoute;
  selectedCategory?: ServiceCategory;
  onNavigate: (route: PageRoute, category?: ServiceCategory, serviceSlug?: string) => void;
  onOpenEnquiry: (serviceName?: string) => void;
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentRoute,
  selectedCategory,
  onNavigate,
  onOpenEnquiry,
  onOpenSearch,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (route: PageRoute, cat?: ServiceCategory) => {
    onNavigate(route, cat);
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full transition-shadow duration-200 shadow-sm">
      {/* Top Utility Announcement Bar - Stays sticky with both call numbers */}
      <div className="w-full bg-[#0f2b5c] text-white text-[11px] sm:text-xs font-medium py-1.5 px-3 sm:px-6 border-b border-blue-900/40">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-slate-200 min-w-0">
            <MapPin className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
            <span className="truncate text-[10.5px] sm:text-xs">
              Serving Panvel • Vadghar • Pushpak • Karanjade &amp; Nearby Areas
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 text-xs flex-shrink-0">
            <div className="hidden lg:flex items-center gap-1.5 text-slate-300 text-[11px]">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              <span>Mon - Sat: 9:00 AM - 7:00 PM</span>
            </div>

            {/* Calling Options: Both numbers strictly callable */}
            <div className="flex items-center gap-1.5 bg-white/10 hover:bg-white/15 px-2.5 py-0.5 rounded-full text-[10.5px] sm:text-xs text-white">
              <Phone className="w-3 h-3 text-amber-400 flex-shrink-0" />
              <span className="text-slate-300 hidden sm:inline">Call:</span>
              <a
                href="tel:+917666040771"
                id="top-bar-call-link-1"
                className="font-bold hover:text-amber-300 transition-colors"
                title="Call Safehands 7666040771"
              >
                7666040771
              </a>
              <span className="text-blue-300 font-normal select-none">/</span>
              <a
                href="tel:+918097759771"
                id="top-bar-call-link-2"
                className="font-bold hover:text-amber-300 transition-colors"
                title="Call Safehands 8097759771"
              >
                8097759771
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar Bar */}
      <nav
        className={`w-full transition-all duration-200 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md shadow-slate-900/5 border-b border-slate-200/90 py-2 sm:py-2.5'
            : 'bg-white border-b border-slate-100 py-2.5 sm:py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 flex items-center justify-between gap-2 sm:gap-4">
          {/* Brand Logo */}
          <button
            onClick={() => handleNavClick('home')}
            id="nav-logo-button"
            className="text-left focus:outline-none transition-transform active:scale-95 min-w-0 flex-shrink-1 sm:flex-shrink-0"
            aria-label="Safehands Enterprises Home"
          >
            <Logo variant="full" />
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            <button
              onClick={() => handleNavClick('home')}
              id="nav-link-home"
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                currentRoute === 'home'
                  ? 'text-blue-700 bg-blue-50/80 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Home
            </button>

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <button
                onClick={() => handleNavClick('services')}
                id="nav-link-services"
                className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  currentRoute === 'services' || currentRoute === 'category' || currentRoute === 'service-detail'
                    ? 'text-blue-700 bg-blue-50/80 font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
                aria-expanded={servicesDropdownOpen}
              >
                <span>Services</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180 text-blue-600' : 'text-slate-400'}`} />
              </button>

              {/* Dropdown Menu */}
              {servicesDropdownOpen && (
                <div className="absolute top-full left-0 w-80 bg-white rounded-xl shadow-xl border border-slate-100 p-2 mt-1 animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                  <div className="px-3 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 mb-1">
                    Service Categories
                  </div>
                  {CATEGORIES_DATA.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => handleNavClick('category', cat.id)}
                      id={`dropdown-cat-${cat.id}`}
                      className={`w-full flex items-start gap-3 p-2.5 rounded-lg text-left transition-colors ${
                        selectedCategory === cat.id
                          ? 'bg-blue-50 text-blue-800'
                          : 'hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <div className={`p-1.5 rounded-md ${cat.colorScheme.bg} ${cat.colorScheme.text} flex-shrink-0 mt-0.5`}>
                        <ServiceIcon name={cat.iconName} className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold leading-tight">{cat.name}</div>
                        <div className="text-xs text-slate-500 line-clamp-1 mt-0.5">{cat.tagline}</div>
                      </div>
                    </button>
                  ))}
                  <div className="mt-2 pt-2 border-t border-slate-100 px-2">
                    <button
                      onClick={() => handleNavClick('services')}
                      className="w-full flex items-center justify-between text-xs font-bold text-blue-700 hover:text-blue-800 py-1.5 px-2 hover:bg-blue-50 rounded"
                    >
                      <span>View All 25+ Services</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => handleNavClick('how-it-works')}
              id="nav-link-how-it-works"
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                currentRoute === 'how-it-works'
                  ? 'text-blue-700 bg-blue-50/80 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              How It Works
            </button>

            <button
              onClick={() => handleNavClick('about')}
              id="nav-link-about"
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                currentRoute === 'about'
                  ? 'text-blue-700 bg-blue-50/80 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              About Us
            </button>

            <button
              onClick={() => handleNavClick('resources')}
              id="nav-link-resources"
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                currentRoute === 'resources' || currentRoute === 'resource-detail'
                  ? 'text-blue-700 bg-blue-50/80 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Resources
            </button>

            <button
              onClick={() => handleNavClick('faq')}
              id="nav-link-faq"
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                currentRoute === 'faq'
                  ? 'text-blue-700 bg-blue-50/80 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              FAQ
            </button>

            <button
              onClick={() => handleNavClick('contact')}
              id="nav-link-contact"
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                currentRoute === 'contact'
                  ? 'text-blue-700 bg-blue-50/80 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Contact
            </button>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              id="nav-search-button"
              className="p-2 text-slate-500 hover:text-blue-700 hover:bg-slate-100 rounded-lg transition-colors"
              title="Search Services (Ctrl+K)"
              aria-label="Search Services"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* WhatsApp Quick Direct */}
            <a
              href="https://wa.me/917666040771?text=Hello%20Safehands%20Enterprises,%20I%20would%20like%20to%20inquire%20about%20your%20services."
              target="_blank"
              rel="noopener noreferrer"
              id="nav-whatsapp-cta"
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors"
            >
              <WhatsAppIcon className="w-4 h-4 text-emerald-600 fill-emerald-600" />
              <span>WhatsApp</span>
            </a>

            {/* Primary Consultation CTA Button - visible on tablet & desktop */}
            <button
              onClick={() => onOpenEnquiry()}
              id="nav-get-assistance-cta"
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-bold text-white bg-[#0f2b5c] hover:bg-blue-900 shadow-sm transition-all active:scale-95 flex-shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Get Assistance</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              id="nav-mobile-menu-toggle"
              className="lg:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-lg focus:outline-none flex-shrink-0"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-slate-100 px-4 py-4 space-y-3 shadow-xl max-h-[85vh] overflow-y-auto">
            {/* Direct Instant Action for Mobile */}
            <button
              onClick={() => {
                onOpenEnquiry();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#0f2b5c] hover:bg-blue-900 text-white rounded-xl text-sm font-bold shadow-md transition-colors"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Get Service Assistance</span>
            </button>

            <div className="space-y-1 font-semibold text-slate-800">
              <button
                onClick={() => handleNavClick('home')}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-base ${
                  currentRoute === 'home' ? 'bg-blue-50 text-blue-700 font-bold' : 'hover:bg-slate-50'
                }`}
              >
                Home
              </button>

              <button
                onClick={() => handleNavClick('services')}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-base ${
                  currentRoute === 'services' ? 'bg-blue-50 text-blue-700 font-bold' : 'hover:bg-slate-50'
                }`}
              >
                All Services (25+)
              </button>

              {/* Mobile Service Categories List */}
              <div className="pl-3 pr-1 py-1 space-y-1">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2 py-1">
                  Browse by Category
                </div>
                {CATEGORIES_DATA.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleNavClick('category', cat.id)}
                    className="w-full flex items-center justify-between text-left px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-100"
                  >
                    <span className="flex items-center gap-2">
                      <ServiceIcon name={cat.iconName} className="w-4 h-4 text-blue-600" />
                      {cat.name}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                  </button>
                ))}
              </div>

              <button
                onClick={() => handleNavClick('how-it-works')}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-base ${
                  currentRoute === 'how-it-works' ? 'bg-blue-50 text-blue-700 font-bold' : 'hover:bg-slate-50'
                }`}
              >
                How It Works
              </button>

              <button
                onClick={() => handleNavClick('about')}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-base ${
                  currentRoute === 'about' ? 'bg-blue-50 text-blue-700 font-bold' : 'hover:bg-slate-50'
                }`}
              >
                About Us
              </button>

              <button
                onClick={() => handleNavClick('resources')}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-base ${
                  currentRoute === 'resources' ? 'bg-blue-50 text-blue-700 font-bold' : 'hover:bg-slate-50'
                }`}
              >
                Resources &amp; Guides
              </button>

              <button
                onClick={() => handleNavClick('faq')}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-base ${
                  currentRoute === 'faq' ? 'bg-blue-50 text-blue-700 font-bold' : 'hover:bg-slate-50'
                }`}
              >
                FAQ
              </button>

              <button
                onClick={() => handleNavClick('contact')}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-base ${
                  currentRoute === 'contact' ? 'bg-blue-50 text-blue-700 font-bold' : 'hover:bg-slate-50'
                }`}
              >
                Contact Us
              </button>
            </div>

            {/* Mobile Contact Shortcuts: Both numbers callable + WhatsApp */}
            <div className="pt-3 border-t border-slate-200 space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <a
                  href="tel:+917666040771"
                  className="flex items-center justify-center gap-1.5 py-2.5 px-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-bold text-slate-800"
                  title="Call 7666040771"
                >
                  <Phone className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                  <span className="truncate">7666040771</span>
                </a>
                <a
                  href="tel:+918097759771"
                  className="flex items-center justify-center gap-1.5 py-2.5 px-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-bold text-slate-800"
                  title="Call 8097759771"
                >
                  <Phone className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                  <span className="truncate">8097759771</span>
                </a>
              </div>
              <a
                href="https://wa.me/917666040771?text=Hello%20Safehands%20Enterprises"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-3 bg-emerald-50 hover:bg-emerald-100 rounded-lg text-xs font-bold text-emerald-800 border border-emerald-200"
                title="Chat on WhatsApp"
              >
                <WhatsAppIcon className="w-4 h-4 text-emerald-600 fill-emerald-600" />
                <span>WhatsApp: 7666040771</span>
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
