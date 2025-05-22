// Authentication Types
export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  isAdmin?: boolean;
}

// Recipe Types
export interface Recipe {
  id: string;
  title: string;
  description: string;
  category: string;
  ingredients: Ingredient[];
  instructions: string[];
  cookTime: number; // in minutes
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  imageUrl: string;
  youtubeId: string;
  ingredientsPrice: number;
  readyMadePrice: number;
  isVegetarian: boolean;
  isPopular?: boolean;
}

export interface Ingredient {
  name: string;
  quantity: string;
  price: number;
}

// Cart Types
export interface CartItem {
  id: string;
  recipeId: string;
  recipeName: string;
  imageUrl: string;
  type: 'ingredients' | 'readyMade';
  price: number;
  quantity: number;
}

// Order Types
export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  discountAmount: number;
  finalAmount: number;
  couponCode?: string;
  status: 'pending' | 'confirmed' | 'rejected' | 'delivered';
  createdAt: Date;
  deliveryAddress: string;
  paymentMethod: 'cod' | 'online';
}

// Coupon Types
export interface Coupon {
  id: string;
  code: string;
  discountPercentage: number;
  maxDiscount: number;
  minPurchase: number;
  expiryDate: Date;
  isActive: boolean;
  createdBy: string;
  usageLimit: number;
  usageCount: number;
}

// Game Types
export interface Game {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  maxReward: number; // Maximum discount percentage
}

// AI Generation Types
export interface RecipeGenerationInput {
  diet?: 'veg' | 'non-veg' | 'both';
  mealType?: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  ingredients?: string[];
  spiceLevel?: 'mild' | 'medium' | 'spicy';
  cookTime?: number; // max cook time in minutes
}