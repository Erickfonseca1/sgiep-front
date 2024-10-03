import { getAdmins, getPagedAdmins, getFilteredAdmins, deleteAdmin } from '../../Services/admins';
import { api } from '@/Services/api';

jest.mock('@/Services/api');

describe('Admin Services', () => {
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch all admins', async () => {
    const adminsMock = [{ id: 1, name: 'Admin 1' }, { id: 2, name: 'Admin 2' }];
    (api.get as jest.Mock).mockResolvedValue({ data: adminsMock });

    const admins = await getAdmins();
    expect(api.get).toHaveBeenCalledWith('/api/admins');
    expect(admins).toEqual(adminsMock);
  });

  it('should handle error when fetching all admins', async () => {
    (api.get as jest.Mock).mockRejectedValue(new Error('Network error'));

    await expect(getAdmins()).rejects.toThrow('Network error');
  });

  it('should fetch paged admins', async () => {
    const pageInfoMock = {
      content: [{ id: 1, name: 'Admin 1' }],
      totalPages: 5
    };
    (api.get as jest.Mock).mockResolvedValue({ data: pageInfoMock });

    const result = await getPagedAdmins(1, 10);
    expect(api.get).toHaveBeenCalledWith('/api/admins/paged?page=1&size=10');
    expect(result).toEqual(pageInfoMock);
  });

  it('should handle error when fetching paged admins', async () => {
    (api.get as jest.Mock).mockRejectedValue(new Error('Network error'));

    await expect(getPagedAdmins(1, 10)).rejects.toThrow('Network error');
  });

  it('should fetch filtered admins', async () => {
    const filteredAdminsMock = {
      content: [{ id: 1, name: 'Admin 1', email: 'admin1@test.com' }],
      totalPages: 2
    };
    (api.get as jest.Mock).mockResolvedValue({ data: filteredAdminsMock });

    const result = await getFilteredAdmins(1, 10, 'Admin', 'admin@test.com');
    expect(api.get).toHaveBeenCalledWith('/api/admins/filter?page=1&size=10&name=Admin&email=admin@test.com');
    expect(result).toEqual(filteredAdminsMock);
  });

  it('should handle error when fetching filtered admins', async () => {
    (api.get as jest.Mock).mockRejectedValue(new Error('Network error'));

    await expect(getFilteredAdmins(1, 10, 'Admin', 'admin@test.com')).rejects.toThrow('Network error');
  });

  it('should delete an admin', async () => {
    (api.delete as jest.Mock).mockResolvedValue({ data: {} });

    const result = await deleteAdmin(1);
    expect(api.delete).toHaveBeenCalledWith('/api/admins/1');
    expect(result).toEqual({});
  });

  it('should handle error when deleting an admin', async () => {
    (api.delete as jest.Mock).mockRejectedValue(new Error('Network error'));

    await expect(deleteAdmin(1)).rejects.toThrow('Network error');
  });
});
