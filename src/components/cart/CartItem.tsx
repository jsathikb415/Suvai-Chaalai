import React from 'react';
import { motion } from 'framer-motion';
import { Trash2, Minus, Plus } from 'lucide-react';
import { CartItem as CartItemType } from '../../types';
import { useCartStore } from '../../store/cartStore';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeItem } = useCartStore();
  
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(item.id, newQuantity);
  };
  
  return (
    <motion.div 
      className="flex items-center py-4 border-b border-gray-200"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <img
          src={item.imageUrl}
          alt={item.recipeName}
          className="h-full w-full object-cover object-center"
        />
      </div>
      
      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>{item.recipeName}</h3>
            <p className="ml-4">₹{item.price * item.quantity}</p>
          </div>
          <p className="mt-1 text-sm text-gray-500 capitalize">
            {item.type === 'ingredients' ? 'Ingredients' : 'Ready-Made Food'}
          </p>
        </div>
        
        <div className="flex flex-1 items-end justify-between text-sm">
          <div className="flex items-center border rounded-md">
            <button
              className="p-1 px-2 text-gray-600 hover:text-gray-800"
              onClick={() => handleQuantityChange(item.quantity - 1)}
            >
              <Minus size={16} />
            </button>
            <span className="px-2 py-1 text-gray-700">{item.quantity}</span>
            <button
              className="p-1 px-2 text-gray-600 hover:text-gray-800"
              onClick={() => handleQuantityChange(item.quantity + 1)}
            >
              <Plus size={16} />
            </button>
          </div>
          
          <button
            type="button"
            className="font-medium text-red-600 hover:text-red-500 flex items-center"
            onClick={() => removeItem(item.id)}
          >
            <Trash2 size={16} className="mr-1" />
            Remove
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default CartItem;