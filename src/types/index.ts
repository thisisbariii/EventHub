export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  rawDate: string; // ISO format for sorting and filtering
  time: string;
  location: string;
  image: string;
  category: string;
  attendees: number;
  isFree: boolean;
  price: number;
  availability: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  profileImage?: string;
  bio?: string;
  joinedDate: string;
  eventsCreated?: string[]; // Array of event IDs
  eventsAttending?: string[]; // Array of event IDs
  savedEvents?: string[]; // Array of event IDs
}

export interface EventOrganizer {
  id: string;
  name: string;
  description: string;
  logoImage: string;
  website?: string;
  socialMedia?: {
    twitter?: string;
    facebook?: string;
    instagram?: string;
    linkedin?: string;
  };
  eventsHosted: string[]; // Array of event IDs
}