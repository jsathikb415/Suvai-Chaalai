import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Tag, AlertCircle } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import { validateCoupon } from '../../services/gameService';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';
import Input from '../ui/Input';

const CartSummary: React.FC = () => {
  const { items, getTotalAmount, couponCode, setCouponCode, setDiscountAmount, discountAmount, getFinalAmount } = useCartStore();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  const [couponInput, setCouponInput] = useState('');
  const [couponMessage, setCouponMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [isValidatingCoupon, setIsValidatingCoupon] = useState(false);
  
  const totalAmount = getTotalAmount();
  const finalAmount = getFinalAmount();
  
  const handleApplyCoupon = async () => {
    if (!couponInput.trim()) return;
    
    setIsValidatingCoupon(true);
    setCouponMessage(null);
    
    try {
      const result = await validateCoupon(couponInput, totalAmount);
      
      if (result.valid) {
        setCouponCode(couponInput);
        setDiscountAmount(result.discountAmount);
        setCouponMessage({ text: result.message || 'Coupon applied successfully!', type: 'success' });
      } else {
        setCouponMessage({ text: result.message || 'Invalid coupon code', type: 'error' });
      }
    } catch (error) {
      setCouponMessage({ text: 'Error validating coupon', type: 'error' });
    }
    
    setIsValidatingCoupon(false);
  };
  
  const handleCheckout = () => {
    if (!currentUser) {
      navigate('/login', { state: { from: '/cart' } });
    } else {
      navigate('/checkout');
    }
  };
  
  if (items.length === 0) {
    return (
      <motion.div
        className="bg-white rounded-lg shadow-lg p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center py-8">
          <ShoppingBag size={48} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">Your cart is empty</h3>
          <p className="text-gray-600 mb-6">Start adding delicious South Indian recipes to your cart!</p>
          <Button
            variant="primary"
            onClick={() => navigate('/recipes')}
          >
            Browse Recipes
          </Button>
        </div>
      </motion.div>
    );
  }
  
  return (
    <motion.div
      className="bg-white rounded-lg shadow-lg p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
      
      <div className="border-t border-gray-200 py-4">
        <div className="flex justify-between text-base mb-2">
          <p>Subtotal</p>
          <p>₹{totalAmount.toFixed(2)}</p>
        </div>
        
        {discountAmount > 0 && (
          <div className="flex justify-between text-base text-green-600 mb-2">
            <p>Discount</p>
            <p>-₹{discountAmount.toFixed(2)}</p>
          </div>
        )}
        
        <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
          <p>Total</p>
          <p>₹{finalAmount.toFixed(2)}</p>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="flex items-center mb-3">
          <Tag size={16} className="mr-2 text-primary-500" />
          <span className="text-sm font-medium text-gray-700">Apply Coupon</span>
        </div>
        
        <div className="flex space-x-2">
          <Input
            type="text"
            placeholder="Enter coupon code"
            value={couponInput}
            onChange={(e) => setCouponInput(e.target.value)}
            fullWidth
          />
          <Button
            variant="outline"
            onClick={handleApplyCoupon}
            isLoading={isValidatingCoupon}
          >
            Apply
          </Button>
        </div>
        
        {couponMessage && (
          <div className={`mt-2 text-sm ${couponMessage.type === 'success' ? 'text-green-600' : 'text-red-600'} flex items-center`}>
            {couponMessage.type === 'error' && <AlertCircle size={14} className="mr-1" />}
            {couponMessage.text}
          </div>
        )}
        
        {couponCode && discountAmount > 0 && (
          <div className="mt-2 text-sm text-green-600">
            Coupon '{couponCode}' applied!
          </div>
        )}
      </div>
      
      <Button
        variant="primary"
        size="lg"
        fullWidth
        onClick={handleCheckout}
      >
        Proceed to Checkout
      </Button>
      
      <div className="mt-4 text-center">
        <Button
          variant="ghost"
          onClick={() => navigate('/games')}
          className="text-primary-600"
        >
          Play games to earn discount coupons!
        </Button>
      </div>
    </motion.div>
  );
};

export default CartSummary;