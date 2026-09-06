import React, { useState } from 'react';
import { PageRoute } from '../types';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ALL_SERVICES_DATA } from '../data/servicesData';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  Navigation,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

interface ContactPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [service, setService] = useState('General Consultation');
  const [locality, setLocality] = useState('Panvel');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter your full name.');
      return;
    }
    const cleanPhone = mobile.replace(/[^0-9]/g, '');
    if (cleanPhone.length < 10) {
      setError('Please provide a valid 10-digit mobile number.');
      return;
    }
    setError('');
    setIsSubmitted(true);
  };

  const whatsappUrl = `https://wa.me/917666040771?text=${encodeURIComponent(
    `Hello Safehands Enterprises,\nName: ${name}\nMobile: ${mobile}\nLocality: ${locality}\nService: ${service}\nMessage: ${message || 'I would like to inquire about required documents and process.'}`
  )}`;

  return (
    <div className="w-full pb-16 bg-[#fcfdfd]">
      <Breadcrumbs items={[{ label: 'Contact Us', active: true }]} onNavigate={onNavigate} />

      {/* Header */}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
              Get in Touch
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0f2b5c] tracking-tight font-display">
              Contact Safehands Enterprises
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Visit our office in Pushpak Old Panvel or reach out online for guidance on government documentation, taxes, and loan coordination.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Left: Contact Info & Address Cards (lg:col-span-5) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Office Location Card */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Office Address</h3>
                    <p className="text-xs text-slate-500">Pushpak Old Panvel, Raigad</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 leading-relaxed font-medium">
                  Shop No. 4, Plot No. 284, Hari Vithal Complex, Sector R3, Pushpak Old Panvel, Vadghar, Raigad - 410220
                </div>

                <div className="pt-2 text-xs text-slate-500 space-y-1">
                  <div className="font-bold text-slate-700">Landmark &amp; Connectivity:</div>
                  <p>Near Hari Vithal Complex in Pushpak Nagar, easily reachable from Panvel Railway Station, Old Panvel Bus Stand, and Vadghar.</p>
                </div>
              </div>

              {/* Direct Reach Out Cards: Dual Phone Lines + WhatsApp */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <a
                  href="tel:+917666040771"
                  className="p-3.5 rounded-xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-sm transition-all group"
                  title="Call 7666040771"
                >
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
                    <Phone className="w-3.5 h-3.5 text-blue-600" />
                    <span>Call Line 1</span>
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-blue-700">
                    7666040771
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Direct Desk</div>
                </a>

                <a
                  href="tel:+918097759771"
                  className="p-3.5 rounded-xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-sm transition-all group"
                  title="Call 8097759771"
                >
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
                    <Phone className="w-3.5 h-3.5 text-blue-600" />
                    <span>Call Line 2</span>
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-blue-700">
                    8097759771
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Support Desk</div>
                </a>

                <a
                  href="https://wa.me/917666040771?text=Hello%20Safehands%20Enterprises"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-xl bg-white border border-slate-200 hover:border-emerald-400 hover:shadow-sm transition-all group"
                  title="Chat on WhatsApp"
                >
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
                    <WhatsAppIcon className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
                    <span>WhatsApp</span>
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-emerald-700">
                    7666040771
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Instant Chat</div>
                </a>
              </div>

              {/* Email & Timings */}
              <div className="p-5 rounded-xl bg-white border border-slate-200 space-y-3 text-xs text-slate-600">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <a
                    href="mailto:safehandsenterprises2024@gmail.com"
                    className="font-semibold text-slate-800 hover:text-blue-700"
                  >
                    safehandsenterprises2024@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Monday - Saturday: 9:00 AM - 7:00 PM</span>
                </div>
              </div>
            </div>

            {/* Right: Interactive Consultation Form (lg:col-span-7) */}
            <div className="lg:col-span-7">
              <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/90 shadow-sm">
                <div className="space-y-1 mb-6 border-b border-slate-100 pb-4">
                  <h2 className="text-xl font-bold text-slate-900">
                    Send an Online Consultation Request
                  </h2>
                  <p className="text-xs text-slate-500">
                    Fill in your requirement below and we will get back to you with the required checklist.
                  </p>
                </div>

                {isSubmitted ? (
                  <div className="p-6 text-center space-y-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-lg font-bold text-slate-900">
                        Inquiry Received!
                      </h3>
                      <p className="text-xs text-slate-600 max-w-sm mx-auto">
                        Thank you, {name}. Our team will contact you shortly on {mobile}.
                      </p>
                    </div>

                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-left space-y-2.5 max-w-md mx-auto">
                      <div className="text-xs font-bold text-slate-700">
                        Need an Immediate Answer?
                      </div>
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all"
                      >
                        <WhatsAppIcon className="w-4 h-4 fill-white text-white" />
                        <span>Send to Safehands on WhatsApp</span>
                      </a>
                    </div>

                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="text-xs font-bold text-blue-700 hover:underline"
                    >
                      Send Another Request
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                      <div className="p-3 rounded-lg bg-red-50 text-red-700 text-xs font-medium border border-red-200">
                        {error}
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Your Name"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600 text-xs text-slate-800 bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                          10-Digit Mobile <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          maxLength={10}
                          value={mobile}
                          onChange={(e) => setMobile(e.target.value)}
                          placeholder="98XXXXXXXX"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600 text-xs text-slate-800 bg-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                          Service Needed
                        </label>
                        <select
                          value={service}
                          onChange={(e) => setService(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600 text-xs text-slate-800 bg-white"
                        >
                          <option value="General Consultation">General Consultation</option>
                          {ALL_SERVICES_DATA.map((s) => (
                            <option key={s.id} value={s.name}>
                              {s.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                          Your Locality
                        </label>
                        <select
                          value={locality}
                          onChange={(e) => setLocality(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600 text-xs text-slate-800 bg-white"
                        >
                          <option value="Pushpak Old Panvel">Pushpak Old Panvel</option>
                          <option value="Panvel City">Panvel City</option>
                          <option value="Vadghar">Vadghar</option>
                          <option value="Karanjade">Karanjade</option>
                          <option value="Kamothe">Kamothe</option>
                          <option value="Other Area in Raigad">Other Area in Raigad</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Specific Questions or Requirements
                      </label>
                      <textarea
                        rows={3}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Tell us what you are looking to get done..."
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600 text-xs text-slate-800 bg-white resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 px-4 rounded-xl bg-[#0f2b5c] hover:bg-blue-900 text-white font-bold text-xs shadow transition-all flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4 text-amber-300" />
                      <span>Submit Inquiry</span>
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>

          {/* Google Maps Section directly below Contact Form */}
          <div className="mt-12 pt-10 border-t border-slate-200">
            <div className="rounded-2xl bg-white border border-slate-200/90 shadow-sm overflow-hidden">
              {/* Map Header with Address and Get Directions CTA */}
              <div className="p-5 sm:p-6 bg-slate-50 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1 max-w-2xl">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-700">
                    <MapPin className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <span>Safehands Enterprises Desk Location</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
                    Find Us in Pushpak Old Panvel
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-700 font-medium select-all">
                    Shop No. 4, Plot No. 284, Hari Vithal Complex, Sector R3, Pushpak Old Panvel, Vadghar, Raigad - 410220
                  </p>
                </div>

                {/* Get Directions Action Buttons */}
                <div className="flex items-center gap-2.5 flex-shrink-0">
                  <a
                    href="https://www.google.com/maps/dir/?api=1&destination=Shop+No.+4,+Plot+No.+284,+Hari+Vithal+Complex,+Sector+R3,+Pushpak+Old+Panvel,+Vadghar,+Raigad+410220"
                    target="_blank"
                    rel="noopener noreferrer"
                    id="contact-get-directions-cta"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#0f2b5c] hover:bg-blue-900 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow transition-all active:scale-95"
                    title="Open Google Maps for turn-by-turn navigation"
                  >
                    <Navigation className="w-4 h-4 text-amber-300 fill-amber-300" />
                    <span>Get Directions</span>
                  </a>

                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Shop+No.+4,+Plot+No.+284,+Hari+Vithal+Complex,+Sector+R3,+Pushpak+Old+Panvel,+Vadghar,+Raigad+410220"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 font-semibold text-xs transition-colors"
                    title="Open in Google Maps application"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                    <span>Open Map</span>
                  </a>
                </div>
              </div>

              {/* Embedded Responsive Google Map */}
              <div className="relative w-full h-80 sm:h-96 bg-slate-100">
                <iframe
                  title="Safehands Enterprises Office Location Map"
                  src="https://maps.google.com/maps?q=Shop+No.+4,+Plot+No.+284,+Hari+Vithal+Complex,+Sector+R3,+Pushpak+Old+Panvel,+Vadghar,+Raigad+410220&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  aria-label="Google Map showing Safehands Enterprises in Pushpak Old Panvel"
                />

                {/* Clickable Overlay Link to ensure user can tap to open Google Maps directly */}
                <div className="absolute bottom-3 right-3 z-10">
                  <a
                    href="https://www.google.com/maps/dir/?api=1&destination=Shop+No.+4,+Plot+No.+284,+Hari+Vithal+Complex,+Sector+R3,+Pushpak+Old+Panvel,+Vadghar,+Raigad+410220"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/95 hover:bg-white text-slate-800 text-[11px] font-bold shadow-md border border-slate-200 backdrop-blur-sm transition-transform active:scale-95"
                  >
                    <Navigation className="w-3.5 h-3.5 text-blue-600" />
                    <span>Open in Maps App</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};
