import { Order, CartItem } from '../types';

// Mock orders for development
let mockOrders: Order[] = [
  {
    id: 'order1',
    userId: 'user-uid-1',
    items: [
      {
        id: 'item1',
        recipeId: 'recipe1',
        recipeName: 'Masala Dosa',
        imageUrl: 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg',
        type: 'readyMade',
        price: 120,
        quantity: 2
      }
    ],
    totalAmount: 240,
    discountAmount: 0,
    finalAmount: 240,
    status: 'delivered',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    deliveryAddress: '123 Main St, Coimbatore',
    paymentMethod: 'cod'
  }
];

// Function to create a new order
export const createOrder = async (
  userId: string,
  items: CartItem[],
  totalAmount: number,
  discountAmount: number,
  couponCode: string | undefined,
  deliveryAddress: string,
  paymentMethod: 'cod' | 'online'
): Promise<Order> => {
  // In a real app, this would create an order in Firebase
  return new Promise((resolve) => {
    setTimeout(() => {
      const newOrder: Order = {
        id: `order-${Date.now()}`,
        userId,
        items,
        totalAmount,
        discountAmount,
        finalAmount: totalAmount - discountAmount,
        couponCode,
        status: 'pending',
        createdAt: new Date(),
        deliveryAddress,
        paymentMethod
      };
      
      // Add to mock orders
      mockOrders = [newOrder, ...mockOrders];
      
      resolve(newOrder);
    }, 800);
  });
};

// Function to get orders for a user
export const getUserOrders = async (userId: string): Promise<Order[]> => {
  // In a real app, this would fetch from Firebase
  return new Promise((resolve) => {
    setTimeout(() => {
      const orders = mockOrders.filter(order => order.userId === userId);
      resolve(orders);
    }, 500);
  });
};

// Function to get order by ID
export const getOrderById = async (orderId: string): Promise<Order | null> => {
  // In a real app, this would fetch from Firebase
  return new Promise((resolve) => {
    setTimeout(() => {
      const order = mockOrders.find(order => order.id === orderId) || null;
      resolve(order);
    }, 300);
  });
};

// Function to get all orders (admin only)
export const getAllOrders = async (): Promise<Order[]> => {
  // In a real app, this would fetch from Firebase with admin privileges
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockOrders);
    }, 500);
  });
};

// Function to update order status (admin only)
export const updateOrderStatus = async (
  orderId: string, 
  status: 'pending' | 'confirmed' | 'rejected' | 'delivered'
): Promise<Order | null> => {
  // In a real app, this would update in Firebase
  return new Promise((resolve) => {
    setTimeout(() => {
      const orderIndex = mockOrders.findIndex(order => order.id === orderId);
      
      if (orderIndex === -1) {
        resolve(null);
        return;
      }
      
      mockOrders[orderIndex] = {
        ...mockOrders[orderIndex],
        status
      };
      
      resolve(mockOrders[orderIndex]);
    }, 500);
  });
};