
export interface User {
  id: string;
  name: string;
  role: 'student' | 'admin';
  regNumber?: string;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  description: string;
  materials: Material[];
}

export interface Material {
  id: string;
  title: string;
  description: string;
  type: 'assignment' | 'pdf' | 'youtube' | 'other';
  url: string;
  uploadedAt: string;
  uploadedBy: string;
}
