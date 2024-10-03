import { getCitizens, getPagedCitizens, getFilteredCitizens, getCitizen, changeCitizenStatus } from '../../Services/citizens';
import { api } from '@/Services/api';
import { CitizenType } from '@/Types/user';

jest.mock('@/Services/api'); // Mock do axios

describe('Citizen Services', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch all citizens', async () => {
    const citizensMock: CitizenType[] = [{
        id: 1, name: 'John Doe', email: 'john@example.com',
        role: ''
    }];
    (api.get as jest.Mock).mockResolvedValue({ data: citizensMock });

    const citizens = await getCitizens();
    expect(api.get).toHaveBeenCalledWith('/api/citizens');
    expect(citizens).toEqual(citizensMock);
  });

  it('should handle error when fetching all citizens', async () => {
    (api.get as jest.Mock).mockRejectedValue(new Error('Network error'));

    await expect(getCitizens()).rejects.toThrow('Network error');
    expect(api.get).toHaveBeenCalledWith('/api/citizens');
  });

  it('should fetch paged citizens', async () => {
    const pagedCitizensMock = {
      content: [{ id: 1, name: 'John Doe', email: 'john@example.com' }],
      totalPages: 5,
    };
    (api.get as jest.Mock).mockResolvedValue({ data: pagedCitizensMock });

    const result = await getPagedCitizens(1, 10);
    expect(api.get).toHaveBeenCalledWith('/api/citizens/paged?page=1&size=10');
    expect(result).toEqual(pagedCitizensMock);
  });

  it('should handle error when fetching paged citizens', async () => {
    (api.get as jest.Mock).mockRejectedValue(new Error('Network error'));

    await expect(getPagedCitizens(1, 10)).rejects.toThrow('Network error');
    expect(api.get).toHaveBeenCalledWith('/api/citizens/paged?page=1&size=10');
  });

  it('should fetch filtered citizens', async () => {
    const filteredCitizensMock = {
      content: [{ id: 1, name: 'John Doe', email: 'john@example.com' }],
      totalPages: 3,
    };
    (api.get as jest.Mock).mockResolvedValue({ data: filteredCitizensMock });

    const result = await getFilteredCitizens(1, 10, 'John', 'john@example.com');
    expect(api.get).toHaveBeenCalledWith('/api/citizens/filter?page=1&size=10&name=John&email=john@example.com');
    expect(result).toEqual(filteredCitizensMock);
  });

  it('should handle error when fetching filtered citizens', async () => {
    (api.get as jest.Mock).mockRejectedValue(new Error('Network error'));

    await expect(getFilteredCitizens(1, 10, 'John', 'john@example.com')).rejects.toThrow('Network error');
    expect(api.get).toHaveBeenCalledWith('/api/citizens/filter?page=1&size=10&name=John&email=john@example.com');
  });

  it('should fetch a single citizen by id', async () => {
    const citizenMock: CitizenType = {
        id: 1, name: 'John Doe', email: 'john@example.com',
        role: ''
    };
    (api.get as jest.Mock).mockResolvedValue({ data: citizenMock });

    const result = await getCitizen(1);
    expect(api.get).toHaveBeenCalledWith('/api/citizens/1');
    expect(result).toEqual(citizenMock);
  });

  it('should handle error when fetching citizen by id', async () => {
    (api.get as jest.Mock).mockRejectedValue(new Error('Network error'));

    await expect(getCitizen(1)).rejects.toThrow('Network error');
    expect(api.get).toHaveBeenCalledWith('/api/citizens/1');
  });

  it('should change the status of a citizen', async () => {
    const updatedStatusMock = { success: true };
    (api.put as jest.Mock).mockResolvedValue({ data: updatedStatusMock });

    const result = await changeCitizenStatus(1);
    expect(api.put).toHaveBeenCalledWith('/api/citizens/1/status');
    expect(result).toEqual(updatedStatusMock);
  });

  it('should handle error when changing citizen status', async () => {
    (api.put as jest.Mock).mockRejectedValue(new Error('Network error'));

    await expect(changeCitizenStatus(1)).rejects.toThrow('Network error');
    expect(api.put).toHaveBeenCalledWith('/api/citizens/1/status');
  });
});
