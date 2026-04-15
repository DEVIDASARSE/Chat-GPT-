import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginPage from './LoginPage';

const RegisterPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // RegisterPage just shows LoginPage with register mode enabled
    // This is handled by the LoginPage component itself
  }, []);

  return <LoginPage />;
};

export default RegisterPage;
