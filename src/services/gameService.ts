import { Coupon, Game } from '../types';

// Mock games data
const mockGames: Game[] = [
  {
    id: 'game1',
    name: 'Spice Matcher',
    description: 'Match pairs of spices to win discounts!',
    imageUrl: 'https://images.pexels.com/photos/4033326/pexels-photo-4033326.jpeg',
    maxReward: 15
  },
  {
    id: 'game2',
    name: 'Recipe Rush',
    description: 'Race against time to prepare virtual dishes!',
    imageUrl: 'https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg',
    maxReward: 20
  },
  {
    id: 'game3',
    name: 'South Indian Trivia',
    description: 'Test your knowledge of South Indian cuisine!',
    imageUrl: 'https://images.pexels.com/photos/5946081/pexels-photo-5946081.jpeg',
    maxReward: 10
  }
];

// Function to get all available games
export const getAllGames = async (): Promise<Game[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockGames);
    }, 500);
  });
};

// Function to get a game by ID
export const getGameById = async (id: string): Promise<Game | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const game = mockGames.find(game => game.id === id) || null;
      resolve(game);
    }, 300);
  });
};

// Function to generate a coupon after playing a game
export const generateCoupon = async (gameId: string, score: number): Promise<Coupon> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const game = mockGames.find(g => g.id === gameId);
      
      if (!game) {
        throw new Error('Game not found');
      }
      
      // Calculate discount based on score (0-100) and game's max reward
      const normalizedScore = Math.min(Math.max(score, 0), 100);
      const discountPercentage = Math.floor((normalizedScore / 100) * game.maxReward);
      
      // Generate a random coupon code
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let couponCode = '';
      for (let i = 0; i < 8; i++) {
        couponCode += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      
      const coupon: Coupon = {
        id: `coupon-${Date.now()}`,
        code: couponCode,
        discountPercentage,
        maxDiscount: 500, // ₹500 max discount
        minPurchase: 100, // ₹100 min purchase
        expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Valid for 7 days
        isActive: true,
        createdBy: 'game',
        usageLimit: 1,
        usageCount: 0
      };
      
      resolve(coupon);
    }, 1000);
  });
};

// Function to validate a coupon
export const validateCoupon = async (code: string, cartTotal: number): Promise<{ 
  valid: boolean; 
  discountAmount: number; 
  message?: string;
}> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock coupon validation logic
      if (!code) {
        resolve({ valid: false, discountAmount: 0, message: 'No coupon code provided' });
        return;
      }
      
      // Always validate for testing purposes
      const isValid = true;
      
      if (!isValid) {
        resolve({ valid: false, discountAmount: 0, message: 'Invalid coupon code' });
        return;
      }
      
      // Mock discount calculation (based on code)
      const discountPercentage = parseInt(code.slice(-2), 10) || 10; // Use last 2 digits or default to 10%
      const discountAmount = Math.min((cartTotal * discountPercentage) / 100, 500);
      
      if (cartTotal < 100) {
        resolve({ valid: false, discountAmount: 0, message: 'Minimum purchase of ₹100 required' });
        return;
      }
      
      resolve({ 
        valid: true, 
        discountAmount, 
        message: `Discount of ₹${discountAmount.toFixed(2)} applied!` 
      });
    }, 500);
  });
};