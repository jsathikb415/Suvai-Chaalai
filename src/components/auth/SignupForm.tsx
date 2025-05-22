import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User, UserPlus } from 'lucide-react';
import { signUpWithEmail, signInWithGoogle } from '../../firebase/auth';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';
import Input from '../ui/Input';

const SignupForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { setCurrentUser } = useAuth();
  const navigate = useNavigate();
  
  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }
    
    setLoading(true);
    
    try {
      const user = await signUpWithEmail(email, password, name);
      
      if (user) {
        setCurrentUser(user);
        navigate('/');
      } else {
        setError('Failed to create account');
      }
    } catch (error) {
      setError('Failed to create account');
      console.error(error);
    }
    
    setLoading(false);
  };
  
  const handleGoogleSignup = async () => {
    setError('');
    setLoading(true);
    
    try {
      const user = await signInWithGoogle();
      
      if (user) {
        setCurrentUser(user);
        navigate('/');
      } else {
        setError('Failed to sign up with Google');
      }
    } catch (error) {
      setError('Failed to sign up with Google');
      console.error(error);
    }
    
    setLoading(false);
  };
  
  return (
    <motion.div 
      className="max-w-md w-full mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-display font-bold text-gray-900 mb-2">Create Account</h2>
        <p className="text-gray-600">Join Suvai Chaalai for delicious South Indian recipes</p>
      </div>
      
      {error && (
        <div className="bg-red-50 text-red-700 p-3 rounded-md mb-6">
          {error}
        </div>
      )}
      
      <form onSubmit={handleEmailSignup} className="space-y-6">
        <Input
          type="text"
          label="Full Name"
          placeholder="John Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          fullWidth
          leftIcon={<User size={16} />}
        />
        
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
        
        <Input
          type="password"
          label="Confirm Password"
          placeholder="••••••••"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          fullWidth
          leftIcon={<Lock size={16} />}
        />
        
        <div>
          <Button 
            type="submit" 
            variant="primary" 
            size="lg" 
            fullWidth 
            isLoading={loading}
            leftIcon={<UserPlus size={16} />}
          >
            Sign Up
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
            onClick={handleGoogleSignup}
            isLoading={loading}
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path 
                fill="currentColor" 
                d="M12.545,12.151L12.545,12.151c0,1.054,0.855,1.909,1.909,1.909h3.536c-0.684,1.91-2.532,3.273-4.69,3.273c-2.769,0-5.01-2.241-5.01-5.01s2.241-5.01,5.01-5.01c1.636,0,3.09,0.792,4.009,2.011l-1.01,1.01c-0.583-0.794-1.522-1.311-2.582-1.311c-1.778,0-3.219,1.441-3.219,3.219c0,1.778,1.441,3.219,3.219,3.219c1.778,0,3.219-1.441,3.219-3.219v-0.309h-3.219V12.151z M21.543,12.151v-1.91h-1.91v1.91h-1.91v1.91h1.91v1.91h1.91v-1.91h1.91v-1.91H21.543z"
              />
            </svg>
            Sign up with Google
          </Button>
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <p className="text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium">
            Sign In
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default SignupForm;