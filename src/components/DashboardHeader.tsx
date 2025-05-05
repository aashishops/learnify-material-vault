
import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { BookOpen, LogOut } from 'lucide-react';

const DashboardHeader: React.FC = () => {
  const { logout, currentUser } = useAuth();

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-6 w-6 text-studious-blue" />
            <span className="text-xl font-bold text-gray-800">
              Studious Vault
            </span>
          </div>
          
          <div className="flex items-center">
            <span className="mr-4 text-sm text-gray-600 hidden sm:inline">
              {currentUser?.role === 'admin' ? 'Admin' : 'Student'}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={logout}
              className="text-gray-700 hover:text-studious-blue"
            >
              <LogOut className="h-5 w-5 mr-1" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
