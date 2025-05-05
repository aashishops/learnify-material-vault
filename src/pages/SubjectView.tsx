
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getSubjectById, getMaterialsByType } from '@/services/data.service';
import DashboardHeader from '@/components/DashboardHeader';
import { FileText, Youtube, Download, FileCode, ArrowLeft } from 'lucide-react';
import { Material } from '@/types';

const SubjectView: React.FC = () => {
  const { subjectId } = useParams<{ subjectId: string }>();
  const subject = getSubjectById(subjectId || '');
  const [activeTab, setActiveTab] = useState<Material['type']>('assignment');

  if (!subject) {
    return (
      <div className="min-h-screen bg-studious-gray flex items-center justify-center">
        <Card className="w-full max-w-lg">
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-bold mb-4">Subject not found</h2>
            <Link to="/dashboard">
              <Button>Return to Dashboard</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const materials = getMaterialsByType(subject.id, activeTab);

  const getIconForType = (type: Material['type']) => {
    switch (type) {
      case 'assignment':
        return <FileCode className="h-5 w-5" />;
      case 'pdf':
        return <FileText className="h-5 w-5" />;
      case 'youtube':
        return <Youtube className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-studious-gray">
      <DashboardHeader />
      
      <main className="container px-4 py-8">
        <div className="flex items-center mb-6">
          <Link to="/dashboard" className="flex items-center text-studious-blue hover:underline mr-6">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Dashboard
          </Link>
          
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{subject.name}</h1>
            <p className="text-gray-600">{subject.code} • {subject.description}</p>
          </div>
        </div>

        <Tabs 
          defaultValue="assignment" 
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as Material['type'])}
          className="mt-8"
        >
          <TabsList className="grid grid-cols-3 w-full max-w-md mb-8">
            <TabsTrigger value="assignment" className="data-[state=active]:bg-studious-blue">Assignments</TabsTrigger>
            <TabsTrigger value="pdf" className="data-[state=active]:bg-studious-blue">PDFs</TabsTrigger>
            <TabsTrigger value="youtube" className="data-[state=active]:bg-studious-blue">YouTube</TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab} className="mt-0">
            {materials.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {materials.map((material) => (
                  <Card key={material.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="flex flex-col sm:flex-row sm:items-center p-4">
                        <div className="flex-grow mb-4 sm:mb-0">
                          <div className="flex items-center space-x-3">
                            <div className="bg-studious-gray p-2 rounded-full text-studious-blue">
                              {getIconForType(material.type)}
                            </div>
                            <div>
                              <h3 className="font-medium">{material.title}</h3>
                              <p className="text-sm text-gray-500">{material.description}</p>
                            </div>
                          </div>
                          <div className="mt-2 ml-12 text-xs text-gray-500">
                            Uploaded by {material.uploadedBy} • {new Date(material.uploadedAt).toLocaleDateString()}
                          </div>
                        </div>
                        
                        <div className="flex space-x-2 sm:justify-end">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="border-studious-blue text-studious-blue hover:bg-studious-blue hover:text-white w-full sm:w-auto"
                            onClick={() => {
                              if (material.type === 'youtube') {
                                window.open(material.url, '_blank');
                              } else {
                                // For PDF and assignments, simulate download
                                console.log(`Downloading ${material.title}`);
                              }
                            }}
                          >
                            {material.type === 'youtube' ? 'Watch' : 'View'}
                          </Button>
                          {material.type !== 'youtube' && (
                            <Button 
                              size="sm"
                              className="bg-studious-blue hover:bg-studious-darkblue w-full sm:w-auto"
                            >
                              <Download className="h-4 w-4 mr-1" />
                              Download
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-md shadow-sm">
                <p className="text-gray-500">No {activeTab} materials available</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default SubjectView;
