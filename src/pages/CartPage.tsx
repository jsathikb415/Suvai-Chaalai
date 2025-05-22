import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import { useCartStore } from '../store/cartStore';

const CartPage: React.FC = () => {
  const { items } = useCartStore();
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">Your Cart</h1>
        <p className="text-gray-600">
          {items.length > 0 
            ? `You have ${items.length} item${items.length > 1 ? 's' : ''} in your cart`
            : 'Your cart is empty'}
        </p>
      </motion.div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-lg p-6">
            {items.length > 0 ? (
              <div>
                <div className="flow-root">
                  <ul className="-my-6 divide-y divide-gray-200">
                    {items.map((item) => (
                      <li key={item.id} className="py-6">
                        <CartItem item={item} />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <ShoppingCart size={48} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No items in your cart</h3>
                <p className="text-gray-600">
                  Browse our delicious recipes and add them to your cart.
                </p>
              </div>
            )}
          </div>
        </div>
        
        <div>
          <CartSummary />
        </div>
      </div>
    </div>
  );
};

export default CartPage;