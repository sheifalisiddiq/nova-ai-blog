
export enum NavTab {
  ABOUT = 'About',
  BLOG = 'Weekly Blog Posts',
  LOG = 'Supervisor Meeting Log',
  GALLERY = 'Gallery',
  CONTACT = 'Contact'
}

export interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  isAdmin?: boolean;
}

export interface BlogPost {
  id: string;
  week: number;
  date: string;
  title: string;
  concept: string;
  rationale: string;
  details: {
    significance: string;
    approach: {
      capture: string;
      ai: string;
      ui: string;
    };
  };
  reflections: string;
  tags: string[];
  comments?: Comment[];
}

export interface MeetingLogEntry {
  id: string;
  date: string;
  supervisor: string;
  discussion: string;
  actionItems: string[];
}

export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
}
