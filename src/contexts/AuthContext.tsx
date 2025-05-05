
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/sonner';
import { User } from '@/types';

interface AuthContextType {
  currentUser: User | null;
  login: (credentials: { identifier: string; password: string }) => void;
  signup: (userData: { name: string; regNumber?: string; password: string; role: 'student' | 'admin' }) => void;
  logout: () => void;
  isLoading: boolean;
}

// Mock users for demonstration
const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    role: 'student',
    regNumber: 'RA2211028010236',
  },
  {
    id: '2',
    name: 'Admin User',
    role: 'admin',
  },
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Check for saved user on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem('studiousVaultUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = (credentials: { identifier: string; password: string }) => {
    setIsLoading(true);
    
    // Simple validation check - updated to use regex that matches RA + 16 digits
    const isRegNumber = /^RA\d{16}$/.test(credentials.identifier);
    
    setTimeout(() => {
      let foundUser;
      
      if (isRegNumber) {
        // Login as student
        foundUser = mockUsers.find(user => 
          user.regNumber === credentials.identifier && user.role === 'student'
        );
      } else {
        // Login as admin
        foundUser = mockUsers.find(user => 
          user.name === credentials.identifier && user.role === 'admin'
        );
      }
      
      if (foundUser) {
        // In a real app, we would validate password here
        setCurrentUser(foundUser);
        localStorage.setItem('studiousVaultUser', JSON.stringify(foundUser));
        toast.success(`Welcome back, ${foundUser.name}!`);
        navigate('/dashboard');
      } else {
        toast.error('Invalid credentials. Please try again.');
      }
      
      setIsLoading(false);
    }, 1000); // Simulate network delay
  };

  const signup = (userData: { 
    name: string; 
    regNumber?: string; 
    password: string;
    role: 'student' | 'admin'
  }) => {
    setIsLoading(true);
    
    setTimeout(() => {
      // Check if user already exists - updated to check by registration number for students
      const userExists = mockUsers.some(user => 
        (userData.role === 'student' && user.regNumber === userData.regNumber) ||
        (userData.role === 'admin' && user.name === userData.name)
      );
      
      if (userExists) {
        toast.error('User already exists');
        setIsLoading(false);
        return;
      }
      
      // Validate registration number format for students - updated to use regex pattern
      if (userData.role === 'student') {
        if (!userData.regNumber || !/^RA\d{16}$/.test(userData.regNumber)) {
          toast.error('Invalid registration number format. It should start with RA followed by 16 digits');
          setIsLoading(false);
          return;
        }
      }
      
      // Create new user
      const newUser: User = {
        id: `${mockUsers.length + 1}`,
        name: userData.name,
        role: userData.role,
        ...(userData.role === 'student' && { regNumber: userData.regNumber })
      };
      
      // In a real app, we would save the user to a database
      mockUsers.push(newUser);
      
      setCurrentUser(newUser);
      localStorage.setItem('studiousVaultUser', JSON.stringify(newUser));
      
      toast.success('Account created successfully!');
      navigate('/dashboard');
      setIsLoading(false);
    }, 1000); // Simulate network delay
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('studiousVaultUser');
    navigate('/');
    toast.success('Logged out successfully');
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
