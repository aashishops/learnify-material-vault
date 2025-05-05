
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { BookOpen } from 'lucide-react';

const Signup: React.FC = () => {
  const { signup, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState<string>('student');
  
  // Student form state
  const [studentName, setStudentName] = useState<string>('');
  const [regNumber, setRegNumber] = useState<string>('');
  const [studentPassword, setStudentPassword] = useState<string>('');
  
  // Admin form state
  const [adminName, setAdminName] = useState<string>('');
  const [adminPassword, setAdminPassword] = useState<string>('');

  const handleStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signup({
      name: studentName,
      regNumber: regNumber,
      password: studentPassword,
      role: 'student'
    });
  };

  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signup({
      name: adminName,
      password: adminPassword,
      role: 'admin'
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-studious-gray p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6">
          <div className="bg-studious-blue rounded-full p-3">
            <BookOpen size={40} className="text-white" />
          </div>
        </div>
        
        <Card className="border-none shadow-lg">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold">Create an Account</CardTitle>
          </CardHeader>
          
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-2">
                <TabsTrigger value="student">Student</TabsTrigger>
                <TabsTrigger value="admin">Admin</TabsTrigger>
              </TabsList>
              
              <TabsContent value="student">
                <form onSubmit={handleStudentSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Input
                      id="studentName"
                      placeholder="Full Name"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      required
                      className="border-studious-lightblue focus:border-studious-blue"
                    />
                  </div>
                  <div className="space-y-2">
                    <Input
                      id="regNumber"
                      placeholder="Registration Number (RA2211028010236)"
                      value={regNumber}
                      onChange={(e) => setRegNumber(e.target.value)}
                      required
                      className="border-studious-lightblue focus:border-studious-blue"
                    />
                    <p className="text-xs text-gray-500">Format: RA followed by 16 digits</p>
                  </div>
                  <div className="space-y-2">
                    <Input
                      id="studentPassword"
                      type="password"
                      placeholder="Password"
                      value={studentPassword}
                      onChange={(e) => setStudentPassword(e.target.value)}
                      required
                      className="border-studious-lightblue focus:border-studious-blue"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-studious-blue hover:bg-studious-darkblue"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Creating Account...' : 'Create Student Account'}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="admin">
                <form onSubmit={handleAdminSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Input
                      id="adminName"
                      placeholder="Admin Name"
                      value={adminName}
                      onChange={(e) => setAdminName(e.target.value)}
                      required
                      className="border-studious-lightblue focus:border-studious-blue"
                    />
                  </div>
                  <div className="space-y-2">
                    <Input
                      id="adminPassword"
                      type="password"
                      placeholder="Password"
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      required
                      className="border-studious-lightblue focus:border-studious-blue"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-studious-blue hover:bg-studious-darkblue"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Creating Account...' : 'Create Admin Account'}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
          
          <CardFooter className="flex justify-center">
            <p className="text-sm text-gray-500">
              Already have an account?{" "}
              <Link to="/" className="text-studious-blue hover:underline">
                Sign in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
