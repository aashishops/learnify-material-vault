
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { getSubjects } from '@/services/data.service';
import DashboardHeader from '@/components/DashboardHeader';

const Dashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const subjects = getSubjects();

  return (
    <div className="min-h-screen bg-studious-gray">
      <DashboardHeader />
      
      <main className="container px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome, {currentUser?.name}
          </h1>
          {currentUser?.role === 'student' && currentUser?.regNumber && (
            <p className="text-gray-600">
              Registration Number: {currentUser.regNumber}
            </p>
          )}
        </div>

        <h2 className="text-xl font-semibold mb-4 text-gray-700">Your Subjects</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((subject) => (
            <Card key={subject.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="h-2 bg-studious-blue"></div>
              <CardContent className="p-6">
                <div className="flex flex-col h-full">
                  <div className="mb-4">
                    <h3 className="text-xl font-medium">{subject.name}</h3>
                    <p className="text-sm text-gray-500">{subject.code}</p>
                  </div>
                  
                  <p className="text-gray-600 mb-4 flex-grow">{subject.description}</p>
                  
                  <div className="flex justify-between items-center mt-auto">
                    <span className="text-xs text-gray-500">{subject.materials.length} materials</span>
                    <Link to={`/subject/${subject.id}`}>
                      <Button variant="outline" size="sm" className="hover:bg-studious-blue hover:text-white transition-colors">
                        View Materials
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
