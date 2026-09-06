import React, { useState, useEffect } from 'react';
import { ALL_SERVICES_DATA } from '../data/servicesData';
import { X, Send, CheckCircle2, Phone, Sparkles, MapPin } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledServiceName?: string;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({
  isOpen,
  onClose,
  prefilledServiceName,
}) => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [locality, setLocality] = useState('Panvel');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setIsSubmitted(false);
      setError('');
      if (prefilledServiceName) {
        setSelectedService(prefilledServiceName);
      } else {
        setSelectedService('General Consultation');
      }
    }
  }, [isOpen, prefilledServiceName]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please provide your full name.');
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
    `Hello Safehands Enterprises,\nMy Name: ${name}\nMobile: ${mobile}\nLocality: ${locality}\nService Required: ${selectedService}\nDetails: ${message || 'I would like more information and a document checklist.'}`
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="bg-[#0f2b5c] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-white/10 text-amber-300">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold leading-tight">Request Service Assistance</h3>
              <p className="text-xs text-blue-200">Safehands Enterprises • Panvel &amp; Raigad</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {isSubmitted ? (
            <div className="text-center py-4 space-y-4">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h4 className="text-lg font-extrabold text-slate-900">
                  Thank You, {name}!
                </h4>
                <p className="text-sm text-slate-600 max-w-sm mx-auto">
                  We have received your request for <strong>{selectedService}</strong>. Our team in Panvel will get in touch with you shortly on <strong>{mobile}</strong>.
                </p>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-left space-y-3">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Get Faster Response Via WhatsApp:
                </div>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-bold shadow transition-all"
                >
                  <WhatsAppIcon className="w-4 h-4 fill-white text-white" />
                  <span>Send Details on WhatsApp</span>
                </a>
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href="tel:+917666040771"
                    className="flex items-center justify-center gap-1.5 py-2.5 px-2 bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 rounded-xl text-xs font-bold transition-all truncate"
                    title="Call 7666040771"
                  >
                    <Phone className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                    <span>7666040771</span>
                  </a>
                  <a
                    href="tel:+918097759771"
                    className="flex items-center justify-center gap-1.5 py-2.5 px-2 bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 rounded-xl text-xs font-bold transition-all truncate"
                    title="Call 8097759771"
                  >
                    <Phone className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                    <span>8097759771</span>
                  </a>
                </div>
              </div>

              <div className="pt-2 text-xs text-slate-400 flex items-center justify-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-500" />
                <span>Shop No. 4, Hari Vithal Complex, Pushpak Old Panvel</span>
              </div>

              <button
                onClick={onClose}
                className="text-xs font-semibold text-slate-500 hover:text-slate-800 underline"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 rounded-lg bg-red-50 text-red-700 text-xs font-medium border border-red-200">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Your Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ramesh Patil"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-blue-600 text-sm text-slate-800 bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="10-digit mobile"
                    maxLength={10}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-blue-600 text-sm text-slate-800 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Your Locality
                  </label>
                  <select
                    value={locality}
                    onChange={(e) => setLocality(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-blue-600 text-sm text-slate-800 bg-white"
                  >
                    <option value="Panvel">Panvel</option>
                    <option value="Old Panvel">Old Panvel</option>
                    <option value="Pushpak Nagar">Pushpak Nagar</option>
                    <option value="Vadghar">Vadghar</option>
                    <option value="Karanjade">Karanjade</option>
                    <option value="Kamothe / Khanda Colony">Kamothe / Khanda Colony</option>
                    <option value="Other Area">Other Area in Raigad/Navi Mumbai</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Service You Need
                </label>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-blue-600 text-sm text-slate-800 bg-white"
                >
                  <option value="General Consultation">General Consultation / Not Sure</option>
                  {ALL_SERVICES_DATA.map((service) => (
                    <option key={service.id} value={service.name}>
                      {service.name} ({service.categoryName})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Brief Note or Questions (Optional)
                </label>
                <textarea
                  rows={2}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="e.g. Need help with required documents for MSME registration or home loan..."
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-blue-600 text-sm text-slate-800 bg-white resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#0f2b5c] hover:bg-blue-900 text-white font-bold text-sm shadow hover:shadow-md transition-all active:scale-98"
                >
                  <Send className="w-4 h-4 text-amber-300" />
                  <span>Submit Consultation Request</span>
                </button>
              </div>

              <p className="text-[11px] text-slate-400 text-center leading-relaxed">
                By submitting, you agree to receive a helpful callback or WhatsApp message from Safehands Enterprises. We respect your document confidentiality.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
