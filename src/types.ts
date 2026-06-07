/**
 * Type declarations for the Meditrip responsive visa assistant portal.
 */

export interface VisaService {
  id: string;
  title: string;
  description: string;
  points?: string[];
  icon: string; // Dynamic icon lookup key
  colorClass: string;
  badgeText?: string;
  isClosed?: boolean;
}

export interface TimelineStep {
  stepNumber: number;
  label: string;
  description: string;
  icon: string;
}

export interface RequirementItem {
  text: string;
  note?: string;
}

export interface RequirementGroup {
  title: string;
  iconName: string;
  items: RequirementItem[];
  extraAlert?: string;
}

export interface DocumentCheckPackage {
  title: string;
  badgeText: string;
  badgeStyle: 'free' | 'pro' | 'complete';
  price: number;
  periodText: string;
  description: string;
  features: string[];
  ctaLabel: string;
  isPopular?: boolean;
}

export interface SlotService {
  id: string;
  category: 'Medical' | 'Business' | 'Double Entry' | 'Entry' | 'Tourist';
  icon: string;
  title: string;
  approxPrice?: number;
  deliveryTime?: string;
  isClosed?: boolean;
  notes: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ChatAttachment {
  id?: string;
  name: string;
  type: string;
  data?: string; // Base64 data string
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model' | 'admin';
  text: string;
  timestamp: Date | string | number;
  attachment?: ChatAttachment;
  synced?: boolean;
}

export interface ChatSession {
  id: string;
  userId: string; // Anonymous user ID stored in localStorage
  messages: ChatMessage[];
  updatedAt: Date | string | number;
  userName?: string;
  phone?: string;
}

export interface TestimonialItem {
  id: number;
  name: string;
  stars: number;
  reviewText: string;
  avatarInitials: string;
  avatarColorClass: string;
  visaCategory: string;
}

