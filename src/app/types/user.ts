export type User = {
  id: number;
  name: string;
  email: string;
  avatar: string;
};

export async function getUser(id: number): Promise<User> {
  // Mock user data
  return {
    id,
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'
  }
}

