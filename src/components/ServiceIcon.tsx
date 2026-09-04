import React from 'react';
import {
  Building2,
  Briefcase,
  Landmark,
  FileCheck,
  BadgeCheck,
  Printer,
  FileSpreadsheet,
  ReceiptText,
  Building,
  Store,
  CreditCard,
  Fingerprint,
  Globe,
  Car,
  Laptop,
  FileCode,
  Coins,
  Home,
  Users,
  HeartHandshake,
  Utensils,
  Wallet,
  ShieldCheck,
  TrainTrack,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  Mail,
  ChevronDown,
  Search,
  X,
  Menu,
  Sparkles,
  ExternalLink,
  Shield,
  FileText,
  Calendar,
  Share2,
} from 'lucide-react';

interface ServiceIconProps {
  name: string;
  className?: string;
}

export const ServiceIcon: React.FC<ServiceIconProps> = ({ name, className = 'w-5 h-5' }) => {
  switch (name) {
    case 'Building2': return <Building2 className={className} />;
    case 'Briefcase': return <Briefcase className={className} />;
    case 'Landmark': return <Landmark className={className} />;
    case 'FileCheck': return <FileCheck className={className} />;
    case 'BadgeCheck': return <BadgeCheck className={className} />;
    case 'Printer': return <Printer className={className} />;
    case 'FileSpreadsheet': return <FileSpreadsheet className={className} />;
    case 'ReceiptText': return <ReceiptText className={className} />;
    case 'Building': return <Building className={className} />;
    case 'Store': return <Store className={className} />;
    case 'CreditCard': return <CreditCard className={className} />;
    case 'Fingerprint': return <Fingerprint className={className} />;
    case 'Globe': return <Globe className={className} />;
    case 'Car': return <Car className={className} />;
    case 'Laptop': return <Laptop className={className} />;
    case 'FileCode': return <FileCode className={className} />;
    case 'Coins': return <Coins className={className} />;
    case 'Home': return <Home className={className} />;
    case 'Users': return <Users className={className} />;
    case 'HeartHandshake': return <HeartHandshake className={className} />;
    case 'Utensils': return <Utensils className={className} />;
    case 'Wallet': return <Wallet className={className} />;
    case 'ShieldCheck': return <ShieldCheck className={className} />;
    case 'TrainTrack': return <TrainTrack className={className} />;
    case 'CheckCircle2': return <CheckCircle2 className={className} />;
    case 'AlertCircle': return <AlertCircle className={className} />;
    case 'ArrowRight': return <ArrowRight className={className} />;
    case 'Phone': return <Phone className={className} />;
    case 'MessageCircle': return <MessageCircle className={className} />;
    case 'MapPin': return <MapPin className={className} />;
    case 'Clock': return <Clock className={className} />;
    case 'Mail': return <Mail className={className} />;
    case 'ChevronDown': return <ChevronDown className={className} />;
    case 'Search': return <Search className={className} />;
    case 'X': return <X className={className} />;
    case 'Menu': return <Menu className={className} />;
    case 'Sparkles': return <Sparkles className={className} />;
    case 'ExternalLink': return <ExternalLink className={className} />;
    case 'Shield': return <Shield className={className} />;
    case 'FileText': return <FileText className={className} />;
    case 'Calendar': return <Calendar className={className} />;
    case 'Share2': return <Share2 className={className} />;
    default: return <HelpCircle className={className} />;
  }
};
