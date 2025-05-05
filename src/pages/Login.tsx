
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { BookOpen } from 'lucide-react';

const Login: React.FC = () => {
  const { login, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState<string>('student');
  const [identifier, setIdentifier] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({ identifier, password });
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
            <CardTitle className="text-2xl font-bold">Studious Vault</CardTitle>
          </CardHeader>
          
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-2">
                <TabsTrigger value="student">Student</TabsTrigger>
                <TabsTrigger value="admin">Admin</TabsTrigger>
              </TabsList>
              
              <TabsContent value="student">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Input
                      id="regNumber"
                      placeholder="Registration Number (RA2211028010236)"
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      required
                      className="border-studious-lightblue focus:border-studious-blue"
                    />
                  </div>
                  <div className="space-y-2">
                    <Input
                      id="password"
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="border-studious-lightblue focus:border-studious-blue"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-studious-blue hover:bg-studious-darkblue"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Signing in...' : 'Sign In'}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="admin">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Input
                      id="adminName"
                      placeholder="Admin Name"
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      required
                      className="border-studious-lightblue focus:border-studious-blue"
                    />
                  </div>
                  <div className="space-y-2">
                    <Input
                      id="password"
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="border-studious-lightblue focus:border-studious-blue"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-studious-blue hover:bg-studious-darkblue"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Signing in...' : 'Sign In'}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
          
          <CardFooter className="flex justify-center">
            <p className="text-sm text-gray-500">
              Don't have an account?{" "}
              <Link to="/signup" className="text-studious-blue hover:underline">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
