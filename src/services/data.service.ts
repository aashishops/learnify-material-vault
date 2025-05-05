
import { Subject, Material } from '@/types';

// Mock data for subjects and materials
export const subjects: Subject[] = [
  {
    id: '1',
    name: 'Mathematics',
    code: 'MATH101',
    description: 'Introduction to Calculus and Linear Algebra',
    materials: []
  },
  {
    id: '2',
    name: 'Physics',
    code: 'PHYS101',
    description: 'Principles of Mechanics and Thermodynamics',
    materials: []
  },
  {
    id: '3',
    name: 'Computer Science',
    code: 'CS101',
    description: 'Introduction to Programming and Data Structures',
    materials: []
  },
  {
    id: '4',
    name: 'Chemistry',
    code: 'CHEM101',
    description: 'General Chemistry Principles',
    materials: []
  },
  {
    id: '5',
    name: 'Engineering Drawing',
    code: 'ED101',
    description: 'Basic Engineering Graphics and Design',
    materials: []
  },
  {
    id: '6',
    name: 'English Communication',
    code: 'ENG101',
    description: 'Technical Writing and Communication Skills',
    materials: []
  }
];

// Mock materials data
const mockMaterials: Material[] = [
  {
    id: '1',
    title: 'Calculus Assignment 1',
    description: 'Differentiation problems set',
    type: 'assignment',
    url: '/assets/calculus_assignment.pdf',
    uploadedAt: '2023-03-15T14:30:00Z',
    uploadedBy: 'Prof. Smith'
  },
  {
    id: '2',
    title: 'Introduction to Limits',
    description: 'PDF lecture notes on limits and continuity',
    type: 'pdf',
    url: '/assets/limits_notes.pdf',
    uploadedAt: '2023-03-10T09:15:00Z',
    uploadedBy: 'Prof. Smith'
  },
  {
    id: '3',
    title: 'Calculus Explained - Video Lecture',
    description: 'Video explanation of fundamental theorem of calculus',
    type: 'youtube',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    uploadedAt: '2023-03-05T16:45:00Z',
    uploadedBy: 'Prof. Smith'
  },
  {
    id: '4',
    title: 'Newton\'s Laws Assignment',
    description: 'Problem set on classical mechanics',
    type: 'assignment',
    url: '/assets/physics_assignment.pdf',
    uploadedAt: '2023-03-18T13:20:00Z',
    uploadedBy: 'Dr. Johnson'
  },
  {
    id: '5',
    title: 'Physics Formulas Cheat Sheet',
    description: 'Comprehensive list of physics equations',
    type: 'pdf',
    url: '/assets/physics_formulas.pdf',
    uploadedAt: '2023-03-12T11:00:00Z',
    uploadedBy: 'Dr. Johnson'
  },
  {
    id: '6',
    title: 'Understanding Thermodynamics',
    description: 'Video tutorial on heat and energy',
    type: 'youtube',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    uploadedAt: '2023-03-08T15:30:00Z',
    uploadedBy: 'Dr. Johnson'
  },
  {
    id: '7',
    title: 'Programming Assignment 1',
    description: 'Basic algorithms implementation',
    type: 'assignment',
    url: '/assets/programming_assignment.pdf',
    uploadedAt: '2023-03-20T10:45:00Z',
    uploadedBy: 'Prof. Williams'
  },
  {
    id: '8',
    title: 'Introduction to Python',
    description: 'PDF guide to Python programming basics',
    type: 'pdf',
    url: '/assets/python_intro.pdf',
    uploadedAt: '2023-03-14T09:30:00Z',
    uploadedBy: 'Prof. Williams'
  },
  {
    id: '9',
    title: 'Data Structures Tutorial',
    description: 'Video lecture on arrays, linked lists, and trees',
    type: 'youtube',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    uploadedAt: '2023-03-09T14:15:00Z',
    uploadedBy: 'Prof. Williams'
  }
];

// Assign materials to subjects
mockMaterials.forEach(material => {
  if (material.id.startsWith('1') || material.id.startsWith('2') || material.id.startsWith('3')) {
    const subject = subjects.find(s => s.id === '1'); // Mathematics
    if (subject) subject.materials.push(material);
  } else if (material.id.startsWith('4') || material.id.startsWith('5') || material.id.startsWith('6')) {
    const subject = subjects.find(s => s.id === '2'); // Physics
    if (subject) subject.materials.push(material);
  } else {
    const subject = subjects.find(s => s.id === '3'); // Computer Science
    if (subject) subject.materials.push(material);
  }
});

// Function to get all subjects
export const getSubjects = (): Subject[] => {
  return subjects;
};

// Function to get a subject by ID
export const getSubjectById = (id: string): Subject | undefined => {
  return subjects.find(subject => subject.id === id);
};

// Function to filter materials by type for a specific subject
export const getMaterialsByType = (subjectId: string, type: Material['type']): Material[] => {
  const subject = getSubjectById(subjectId);
  if (!subject) return [];
  
  return subject.materials.filter(material => material.type === type);
};

// Function to add a new material to a subject
export const addMaterial = (subjectId: string, material: Omit<Material, 'id'>): Material | null => {
  const subject = getSubjectById(subjectId);
  if (!subject) return null;
  
  // Generate a new ID (in a real app, this would be handled by the database)
  const newId = `${Date.now()}`;
  
  const newMaterial: Material = {
    id: newId,
    ...material
  };
  
  subject.materials.push(newMaterial);
  return newMaterial;
};
