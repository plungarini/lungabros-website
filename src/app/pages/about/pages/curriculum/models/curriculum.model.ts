import { Timestamp } from "@angular/fire/firestore";

export interface Story {
  title: string;
  desc: string;
  time?: Timestamp;
  isWorkingExperience: boolean;
}

interface Language {
  flag: 'it' | 'en' | 'fr' | 'de';
  name: string;
  level: number;
}

export interface Specs {
  passions: string[];
  lang: Language[];
  memberId: number;
  socials: Social[];
}

export interface Certification {
  id: string;
  title: string;
  priority?: number;
  isPro: boolean;
}

interface Contacts {
  email: string;
  phone: string;
}

interface Social {
  id: 'ig' | 'fb' | 'in' | 'tw';
  username: string;
}

export interface Curriculum {
  name: string;
  birthday: Timestamp;
  desc: string;
  stories: Story[];
  specs: Specs;
  certs: Certification[];
  contacts: Contacts;
}