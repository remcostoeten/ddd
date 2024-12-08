export type User = {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  avatar: string;
  role: string;
  preferences: {
    theme: string;
    notifications: boolean;
    language: string;
  };
  lastLogin: Date;
};

export const mockUser: User = {
  id: 1,
  name: 'Remco Stoeten',
  email: 'remcostoeten@hotmail.com',
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-01'),
  avatar: 'https://api.dicebear.com/6.x/avataaars/svg?seed=RemcoStoeten',
  role: 'admin',
  preferences: {
    theme: 'dark',
    notifications: true,
    language: 'en',
  },
  lastLogin: new Date('2024-01-01'),
};

export async function getUser(userId: number): Promise<User> {
  try {
    return mockUser;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw new Error('Failed to fetch user');
  }
}

