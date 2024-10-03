import {
    getPagedManagers,
    getActiveManagers,
    getFilteredManagers,
    getManager,
    changeManagerStatus,
  } from '../../Services/managers';
  import { api } from '@/Services/api';
  
  jest.mock('@/Services/api'); // Mockando o axios
  
  describe('Manager Services', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    it('should fetch paged managers', async () => {
      const mockResponse = {
        content: [{ id: 1, name: 'Manager 1' }, { id: 2, name: 'Manager 2' }],
        totalPages: 5,
      };
      (api.get as jest.Mock).mockResolvedValue({ data: mockResponse });
  
      const result = await getPagedManagers(1, 10);
      expect(api.get).toHaveBeenCalledWith('/api/managers/paged?page=1&size=10');
      expect(result).toEqual(mockResponse);
    });
  
    it('should handle error when fetching paged managers', async () => {
      (api.get as jest.Mock).mockRejectedValue(new Error('Network error'));
  
      await expect(getPagedManagers(1, 10)).rejects.toThrow('Network error');
      expect(api.get).toHaveBeenCalledWith('/api/managers/paged?page=1&size=10');
    });
  
    it('should fetch active managers', async () => {
      const mockManagers = [{ id: 1, name: 'Active Manager 1' }];
      (api.get as jest.Mock).mockResolvedValue({ data: mockManagers });
  
      const result = await getActiveManagers();
      expect(api.get).toHaveBeenCalledWith('/api/managers/active');
      expect(result).toEqual(mockManagers);
    });
  
    it('should handle error when fetching active managers', async () => {
      (api.get as jest.Mock).mockRejectedValue(new Error('Network error'));
  
      await expect(getActiveManagers()).rejects.toThrow('Network error');
      expect(api.get).toHaveBeenCalledWith('/api/managers/active');
    });
  
    it('should fetch filtered managers', async () => {
      const mockResponse = {
        content: [{ id: 1, name: 'Filtered Manager 1' }],
        totalPages: 3,
      };
      (api.get as jest.Mock).mockResolvedValue({ data: mockResponse });
  
      const result = await getFilteredManagers(1, 10, 'Manager', 'manager@example.com');
      expect(api.get).toHaveBeenCalledWith('/api/managers/filter?page=1&size=10&name=Manager&email=manager@example.com');
      expect(result).toEqual(mockResponse);
    });
  
    it('should handle error when fetching filtered managers', async () => {
      (api.get as jest.Mock).mockRejectedValue(new Error('Network error'));
  
      await expect(getFilteredManagers(1, 10, 'Manager', 'manager@example.com')).rejects.toThrow('Network error');
      expect(api.get).toHaveBeenCalledWith('/api/managers/filter?page=1&size=10&name=Manager&email=manager@example.com');
    });
  
    it('should fetch a manager by id', async () => {
      const mockManager = { id: 1, name: 'Manager 1' };
      (api.get as jest.Mock).mockResolvedValue({ data: mockManager });
  
      const result = await getManager(1);
      expect(api.get).toHaveBeenCalledWith('/api/managers/1');
      expect(result).toEqual(mockManager);
    });
  
    it('should handle error when fetching a manager by id', async () => {
      (api.get as jest.Mock).mockRejectedValue(new Error('Network error'));
  
      await expect(getManager(1)).rejects.toThrow('Network error');
      expect(api.get).toHaveBeenCalledWith('/api/managers/1');
    });
  
    it('should change manager status', async () => {
      const mockResponse = { message: 'Status changed' };
      (api.put as jest.Mock).mockResolvedValue({ data: mockResponse });
  
      const result = await changeManagerStatus(1);
      expect(api.put).toHaveBeenCalledWith('/api/managers/1/status');
      expect(result).toEqual(mockResponse);
    });
  
    it('should handle error when changing manager status', async () => {
      (api.put as jest.Mock).mockRejectedValue(new Error('Network error'));
  
      await expect(changeManagerStatus(1)).rejects.toThrow('Network error');
      expect(api.put).toHaveBeenCalledWith('/api/managers/1/status');
    });
  });
  