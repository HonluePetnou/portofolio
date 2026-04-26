export type BlogStatus = "draft" | "scheduled" | "published";

export interface AuthResponse {
  access_token: string;
  token_type: string;
}

export interface Profile {
  id: number;
  name: string;
  heroTitle: string;
  heroSubtitle: string;
  bioSummary: string;
  aboutText: string;
  profileImageUrl?: string | null;
  cvUrl?: string | null;
}

export interface ProfileUpdate extends Partial<Profile> {}

export interface Project {
  id: string;
  title: string;
  slug: string;
  clientName?: string | null;
  industry?: string | null;
  services: string[];
  description: Record<string, string>;
  results: Array<Record<string, string>>;
  stack: string[];
  timeline?: string | null;
  projectUrl?: string | null;
  githubUrl?: string | null;
  mainImage?: string | null;
  screenshots: string[];
  interveners: Array<Record<string, string>>;
  isFeatured: boolean;
  userId?: number | null;
  agencyVisible?: boolean;
  createdAt: string;
}

export interface ProjectCreate extends Omit<Project, "id" | "createdAt"> {}
export interface ProjectUpdate extends Partial<ProjectCreate> {}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage?: string | null;
  content: Record<string, unknown>;
  cta: Record<string, string>;
  relatedProjectId?: string | null;
  tags: string[];
  seo: Record<string, unknown>;
  published: boolean;
  archived: boolean;
  readingTime: number;
  agencyVisible?: boolean;
  publishedAt?: string | null;
  status?: BlogStatus;
  aiGenerated?: boolean;
  aiMode?: "manual" | "assisted" | null;
  createdAt: string;
}

export interface ArticleCreate extends Omit<Article, "id" | "createdAt"> {}
export interface ArticleUpdate extends Partial<ArticleCreate> {}

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  subject: string;
  message: string;
  service?: string | null;
  budget?: number | null;
  status: "NEW" | "READ" | "REPLIED" | "ARCHIVED";
  priority: "LOW" | "MEDIUM" | "HIGH";
  internalNotes?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ContactUpdate {
  status?: "NEW" | "READ" | "REPLIED" | "ARCHIVED";
  priority?: "LOW" | "MEDIUM" | "HIGH";
  internalNotes?: string | null;
}

export interface Settings {
  aiProvider?: string | null;
  emailProvider?: string | null;
  notificationEmail?: string | null;
  aiApiKey: { configured: boolean };
  emailApiKey: { configured: boolean };
}

export interface SettingsUpdate {
  aiProvider?: "GEMINI" | "OPENAI" | "CLAUDE";
  aiApiKey?: string;
  emailProvider?: "RESEND" | "SENDGRID" | "NONE";
  emailApiKey?: string;
  notificationEmail?: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company?: string | null;
  content: string;
  rating: number;
  imageUrl?: string | null;
  linkedinUrl?: string | null;
  userId?: number | null;
}

export interface TestimonialCreate extends Omit<Testimonial, "id"> {}
export interface TestimonialUpdate extends Partial<TestimonialCreate> {}

export interface GeneratedContent {
  title: string;
  excerpt: string;
  content: Record<string, unknown>;
}

export interface SocialGenerated {
  blog_id: string;
  linkedin: { storytelling: string; value_driven: string };
  twitter: { thread_tweets: string[]; thread_combined: string; short: string };
  instagram: { caption: string };
  facebook: { post: string };
}

