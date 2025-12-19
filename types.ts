
export interface Dress {
  id: string;
  name: string;
  price: number;
  image: string;
  category: 'Evening' | 'Casual' | 'Summer' | 'Formal';
  description: string;
  colors: string[];
}

export interface CartItem extends Dress {
  quantity: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  suggestions?: string[];
}

export enum View {
  Home = 'home',
  Shop = 'shop',
  Stylist = 'stylist',
  TryOn = 'try-on'
}
