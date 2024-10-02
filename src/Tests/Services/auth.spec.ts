import { authenticateUser, registerUser } from '../../Services/auth';
import { api } from '@/Services/api';
import { AuthType } from '@/Types/auth';
import { UserType } from '@/Types/user';

jest.mock('@/Services/api');

describe('Auth Services', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should authenticate user with valid credentials', async () => {
    const authMock: AuthType = {
        token: 'mocked_token',
        role: '',
        name: '',
        id: 0
    };
    (api.post as jest.Mock).mockResolvedValue({ data: authMock });

    const result = await authenticateUser('john@example.com', 'password123');
    expect(api.post).toHaveBeenCalledWith('/api/auth/login', {
      email: 'john@example.com',
      password: 'password123',
    });
    expect(result).toEqual(authMock);
  });

  it('should handle error during user authentication', async () => {
    (api.post as jest.Mock).mockRejectedValue(new Error('Invalid credentials'));

    await expect(authenticateUser('john@example.com', 'wrong_password')).rejects.toThrow('Invalid credentials');
  });

  it('should register a new user with valid data', async () => {
    const newUserMock = {
      id: 1,
      name: 'Jane Doe',
      email: 'jane@example.com',
      role: 'ADMIN' as UserType,
    };
    (api.post as jest.Mock).mockResolvedValue({ data: newUserMock });

    const result = await registerUser('Jane Doe', 'jane@example.com', 'password123', 'ADMIN' as UserType);
    expect(api.post).toHaveBeenCalledWith('/api/auth/register', {
      name: 'Jane Doe',
      email: 'jane@example.com',
      password: 'password123',
      role: 'ADMIN',
    });
    expect(result).toEqual(newUserMock);
  });

  it('should handle error during user registration', async () => {
    (api.post as jest.Mock).mockRejectedValue(new Error('Email already exists'));

    await expect(registerUser('John Doe', 'john@example.com', 'password123', 'CITIZEN' as UserType))
      .rejects
      .toThrow('Email already exists');
  });
});
