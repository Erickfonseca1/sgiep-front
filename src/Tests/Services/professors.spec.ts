import { getActiveProfessors, getPagedProfessors, getFilteredProfessors, getProfessor, getProfessorActivities, updateProfessor, changeProfessorStatus } from '@/Services/professors';
import { api } from '@/Services/api';
import { ProfessorType } from '@/Types/user';
import { ActivityType } from '@/Types/activity';

jest.mock('@/Services/api');

describe('Professor Services', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch active professors', async () => {
    const professorsMock: ProfessorType[] = [{
        id: 1, name: 'Professor 1',
        role: '',
        email: ''
    }, {
        id: 2, name: 'Professor 2',
        role: '',
        email: ''
    }];
    (api.get as jest.Mock).mockResolvedValue({ data: professorsMock });

    const result = await getActiveProfessors();
    expect(api.get).toHaveBeenCalledWith('/api/professors/active');
    expect(result).toEqual(professorsMock);
  });

  it('should handle error when fetching active professors', async () => {
    (api.get as jest.Mock).mockRejectedValue(new Error('Network error'));

    await expect(getActiveProfessors()).rejects.toThrow('Network error');
    expect(api.get).toHaveBeenCalledWith('/api/professors/active');
  });

  it('should fetch paged professors', async () => {
    const pageInfoMock = {
      content: [{ id: 1, name: 'Professor 1' }],
      totalPages: 5,
    };
    (api.get as jest.Mock).mockResolvedValue({
      data: pageInfoMock,
    });

    const result = await getPagedProfessors(1, 10);
    expect(api.get).toHaveBeenCalledWith('/api/professors/paged?page=1&size=10');
    expect(result).toEqual(pageInfoMock);
  });

  it('should fetch filtered professors', async () => {
    const pageInfoMock = {
      content: [{ id: 1, name: 'Professor 1' }],
      totalPages: 2,
    };
    (api.get as jest.Mock).mockResolvedValue({
      data: pageInfoMock,
    });

    const result = await getFilteredProfessors(1, 10, 'Professor 1', 'professor1@example.com');
    expect(api.get).toHaveBeenCalledWith('/api/professors/filter?page=1&size=10&name=Professor 1&email=professor1@example.com');
    expect(result).toEqual(pageInfoMock);
  });

  it('should fetch a professor by ID', async () => {
    const professorMock = { id: 1, name: 'Professor 1' };
    (api.get as jest.Mock).mockResolvedValue({ data: professorMock });

    const result = await getProfessor(1);
    expect(api.get).toHaveBeenCalledWith('/api/professors/1');
    expect(result).toEqual(professorMock);
  });

  it('should fetch professor activities', async () => {
    const activitiesMock: ActivityType[] = [{
        id: 1, name: 'Activity 1',
        description: '',
        location: '',
        maxVacancies: 0,
        professor: {
            id: 0,
            name: undefined
        },
        schedules: []
    }];
    (api.get as jest.Mock).mockResolvedValue({ data: activitiesMock });

    const result = await getProfessorActivities(1);
    expect(api.get).toHaveBeenCalledWith('/api/professors/1/activities');
    expect(result).toEqual(activitiesMock);
  });

  it('should update a professor', async () => {
    const updatedProfessor: ProfessorType = { id: 1, name: 'Updated Professor', email: 'updated@example.com', role: 'Admin' };
    (api.put as jest.Mock).mockResolvedValue({ data: updatedProfessor });

    const result = await updateProfessor(1, updatedProfessor);
    expect(api.put).toHaveBeenCalledWith('/api/professors/1', updatedProfessor);
    expect(result).toEqual(updatedProfessor);
  });

  it('should change the status of a professor', async () => {
    const statusChangeResponse = { success: true };
    (api.put as jest.Mock).mockResolvedValue({ data: statusChangeResponse });

    const result = await changeProfessorStatus(1);
    expect(api.put).toHaveBeenCalledWith('/api/professors/1/status');
    expect(result).toEqual(statusChangeResponse);
  });
});
