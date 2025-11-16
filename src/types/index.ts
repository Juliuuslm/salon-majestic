// Tipos generales del sitio

export interface SeoProps {
  title: string;
  description: string;
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  author?: string;
  schema?: any;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
  active?: boolean;
}

export interface SocialLink {
  platform: 'facebook' | 'instagram' | 'twitter' | 'linkedin' | 'youtube' | 'pinterest';
  url: string;
}

// Blog
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  description: string;
  author: string;
  date: string;
  category: string;
  image: string;
  content: string;
  tags: string[];
}

// Equipo
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
  email?: string;
  social?: SocialLink[];
}

// Servicios
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  image?: string;
  features: string[];
  link?: string;
}

// Eventos
export interface Event {
  id: string;
  title: string;
  slug: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image: string;
  speaker?: string;
  attendees?: number;
  link?: string;
}

// Galería
export interface GalleryItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  image: string;
  description?: string;
}

// Testimonios
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  quote: string;
  rating?: number;
}

// Precios
export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  currency: string;
  period: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  cta: {
    text: string;
    href: string;
  };
}

// FAQ
export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

// Hero Slider
export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  location: string;
  dateTime: string;
  image: string;
  ctaText: string;
  ctaLink: string;
}
