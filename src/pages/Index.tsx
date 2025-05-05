
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  
  useEffect(() => {
    if (currentUser) {
      navigate('/dashboard');
    } else {
      navigate('/');
    }
  }, [currentUser, navigate]);
  
  return null; // This component just handles redirection
};

export default Index;
