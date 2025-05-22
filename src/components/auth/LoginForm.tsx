import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn, UserCog } from 'lucide-react';
import { signInWithEmailAndPassword, signInWithGoogle } from '../../firebase/auth';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';
import Input from '../ui/Input';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { setCurrentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';
  
  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const user = await signInWithEmailAndPassword(email, password);
      
      if (user) {
        setCurrentUser(user);
        navigate(from);
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      setError('Failed to sign in. Please check your credentials.');
      console.error(error);
    }
    
    setLoading(false);
  };
  
  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);
    
    try {
      const user = await signInWithGoogle();
      
      if (user) {
        setCurrentUser(user);
        navigate(from);
      } else {
        setError('Failed to sign in with Google');
      }
    } catch (error) {
      setError('Failed to sign in with Google');
      console.error(error);
    }
    
    setLoading(false);
  };
  
  const handleAdminLogin = () => {
    setEmail('admin@suvaichaalai.com');
    setPassword('admin123');
  };
  
  return (
    <motion.div 
      className="max-w-md w-full mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-display font-bold text-gray-900 mb-2">Welcome Back</h2>
        <p className="text-gray-600">Sign in to your Suvai Chaalai account</p>
      </div>
      
      {error && (
        <div className="bg-red-50 text-red-700 p-3 rounded-md mb-6">
          {error}
        </div>
      )}
      
      <form onSubmit={handleEmailLogin} className="space-y-6">
        <Input
          type="email"
          label="Email Address"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          fullWidth
          leftIcon={<Mail size={16} />}
        />
        
        <Input
          type="password"
          label="Password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          fullWidth
          leftIcon={<Lock size={16} />}
        />
        
        <div className="space-y-3">
          <Button 
            type="submit" 
            variant="primary" 
            size="lg" 
            fullWidth 
            isLoading={loading}
            leftIcon={<LogIn size={16} />}
          >
            Sign In as Customer
          </Button>
          
          <Button 
            type="button" 
            variant="secondary" 
            size="lg" 
            fullWidth 
            isLoading={loading}
            leftIcon={<UserCog size={16} />}
            onClick={handleAdminLogin}
          >
            Sign In as Admin
          </Button>
        </div>
      </form>
      
      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>
        
        <div className="mt-6">
          <Button 
            type="button" 
            variant="outline" 
            size="lg" 
            fullWidth 
            onClick={handleGoogleLogin}
            isLoading={loading}
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path 
                fill="currentColor" 
                d="M12.545,12.151L12.545,12.151c0,1.054,0.855,1.909,1.909,1.909h3.536c-0.684,1.91-2.532,3.273-4.69,3.273c-2.769,0-5.01-2.241-5.01-5.01s2.241-5.01,5.01-5.01c1.636,0,3.09,0.792,4.009,2.011l-1.01,1.01c-0.583-0.794-1.522-1.311-2.582-1.311c-1.778,0-3.219,1.441-3.219,3.219c0,1.778,1.441,3.219,3.219,3.219c1.778,0,3.219-1.441,3.219-3.219v-0.309h-3.219V12.151z M21.543,12.151v-1.91h-1.91v1.91h-1.91v1.91h1.91v1.91h1.91v-1.91h1.91v-1.91H21.543z"
              />
            </svg>
            Sign in with Google
          </Button>
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <p className="text-gray-600">
          Don't have an account?{' '}
          <Link to="/signup" className="text-primary-600 hover:text-primary-700 font-medium">
            Sign Up
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default LoginForm;