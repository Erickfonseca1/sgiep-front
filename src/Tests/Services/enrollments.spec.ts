import { enrollStudent } from '../../Services/enrollments';
import { api } from '@/Services/api';

jest.mock('@/Services/api'); // Mockando o axios

describe('Enrollment Services', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should enroll a student successfully', async () => {
    const successMessage = 'Student enrolled successfully';
    (api.post as jest.Mock).mockResolvedValue({ data: successMessage });

    const result = await enrollStudent(1, 2);
    expect(api.post).toHaveBeenCalledWith('/api/enrollments/enroll', null, {
      params: { activityId: 1, citizenId: 2 },
    });
    expect(result).toBe(successMessage);
  });

  it('should handle error when enrolling a student', async () => {
    const errorMessage = 'Enrollment failed';
    (api.post as jest.Mock).mockRejectedValue({
      response: { data: errorMessage },
    });

    await expect(enrollStudent(1, 2)).rejects.toThrow('Enrollment failed');
    expect(api.post).toHaveBeenCalledWith('/api/enrollments/enroll', null, {
      params: { activityId: 1, citizenId: 2 },
    });
  });

  it('should handle network error when enrolling a student', async () => {
    (api.post as jest.Mock).mockRejectedValue(new Error('Network error'));

    await expect(enrollStudent(1, 2)).rejects.toThrow('Failed to enroll student');
    expect(api.post).toHaveBeenCalledWith('/api/enrollments/enroll', null, {
      params: { activityId: 1, citizenId: 2 },
    });
  });
});
