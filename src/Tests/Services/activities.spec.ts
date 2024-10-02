import { getActivities, getPagedActivities, getActivityCitizens, getActivitySchedules, getActivityById, createActivity, updateActivity, deleteActivity, getFilteredActivities, filterActivitiesByLocation } from '../../Services/activities';
import { api } from '@/Services/api'; // Importar o mock do axios

jest.mock('@/Services/api'); // Mockando o axios

describe('Activity Services', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch all activities', async () => {
    const activitiesMock = [{ id: 1, name: 'Futebol' }, { id: 2, name: 'Vôlei' }];
    (api.get as jest.Mock).mockResolvedValue({ data: activitiesMock });

    const activities = await getActivities();
    expect(api.get).toHaveBeenCalledWith('/api/activities');
    expect(activities).toEqual(activitiesMock);
  });

  it('should handle error when fetching all activities', async () => {
    (api.get as jest.Mock).mockRejectedValue(new Error('Network error'));

    const result = await getActivities();
    expect(api.get).toHaveBeenCalledWith('/api/activities');
    expect(result).toBeUndefined();
  });

  it('should fetch paged activities', async () => {
    const pageInfoMock = {
      content: [{ id: 1, name: 'Futebol' }],
      totalPages: 5,
      totalElements: 50,
    };
    (api.get as jest.Mock).mockResolvedValue({
      data: {
        _embedded: { activityList: pageInfoMock.content },
        page: { totalPages: pageInfoMock.totalPages, totalElements: pageInfoMock.totalElements },
      },
    });

    const result = await getPagedActivities(1, 10);
    expect(api.get).toHaveBeenCalledWith('/api/activities/paged?page=1&size=10');
    expect(result).toEqual(pageInfoMock);
  });

  it('should handle error when fetching paged activities', async () => {
    (api.get as jest.Mock).mockRejectedValue(new Error('Network error'));

    await expect(getPagedActivities(1, 10)).rejects.toThrow('Network error');
  });

  it('should fetch citizens for an activity', async () => {
    const citizensMock = [{ id: 1, name: 'John Doe' }];
    (api.get as jest.Mock).mockResolvedValue({ data: citizensMock });

    const citizens = await getActivityCitizens(1);
    expect(api.get).toHaveBeenCalledWith('/api/activities/1/citizens');
    expect(citizens).toEqual(citizensMock);
  });

  it('should fetch activity schedules', async () => {
    const schedulesMock = [{ dayOfWeek: 'Monday', startTime: '08:00', endTime: '09:00' }];
    (api.get as jest.Mock).mockResolvedValue({ data: schedulesMock });

    const schedules = await getActivitySchedules(1);
    expect(api.get).toHaveBeenCalledWith('/api/activities/1/schedules');
    expect(schedules).toEqual(schedulesMock);
  });

  it('should fetch activity by id', async () => {
    const activityMock = { id: 1, name: 'Futebol' };
    (api.get as jest.Mock).mockResolvedValue({ data: activityMock });

    const activity = await getActivityById(1);
    expect(api.get).toHaveBeenCalledWith('/api/activities/1');
    expect(activity).toEqual(activityMock);
  });

  it('should return null if activity by id not found', async () => {
    (api.get as jest.Mock).mockRejectedValue(new Error('Not found'));

    const activity = await getActivityById(999);
    expect(api.get).toHaveBeenCalledWith('/api/activities/999');
    expect(activity).toBeNull();
  });

  it('should create an activity', async () => {
    const newActivity = { 
      id: 1, 
      name: 'Futebol', 
      description: 'Descrição do Futebol', 
      location: 'Quadra 1', 
      maxVacancies: 20, 
      professor: { id: 1, name: 'Professor A' }, 
      schedules: [{ dayOfWeek: 'Monday', startTime: '08:00', endTime: '09:00' }]
    };
    (api.post as jest.Mock).mockResolvedValue({ data: newActivity });
    
    const result = await createActivity(newActivity);
    expect(api.post).toHaveBeenCalledWith('/api/activities', newActivity);
    expect(result).toEqual(newActivity);
  });

  it('should update an activity', async () => {
    const updatedActivity = { 
      id: 1, 
      name: 'Futebol Atualizado', 
      description: 'Updated Description', 
      location: 'Updated Location', 
      maxVacancies: 25, 
      professor: { id: 1, name: 'Updated Professor' }, 
      schedules: [{ dayOfWeek: 'Tuesday', startTime: '10:00', endTime: '11:00' }]
    };
    (api.put as jest.Mock).mockResolvedValue({ data: updatedActivity });
    
    const result = await updateActivity(1, updatedActivity);
    expect(api.put).toHaveBeenCalledWith('/api/activities/1', updatedActivity);
    expect(result).toEqual(updatedActivity);
  });

  it('should delete an activity', async () => {
    (api.delete as jest.Mock).mockResolvedValue({ data: {} });

    const result = await deleteActivity(1);
    expect(api.delete).toHaveBeenCalledWith('/api/activities/1');
    expect(result).toEqual({});
  });

  // Adicionando os testes para getFilteredActivities
  it('should fetch filtered activities by professor', async () => {
    const filteredActivitiesMock = [{ id: 1, name: 'Yoga' }];
    (api.get as jest.Mock).mockResolvedValue({ data: filteredActivitiesMock });

    const result = await getFilteredActivities(1, 10, 1);
    expect(api.get).toHaveBeenCalledWith('/api/activities/professor/1/filter', {
      params: { page: 1, size: 10, name: undefined, location: undefined }
    });
    expect(result).toEqual(filteredActivitiesMock);
  });

  it('should fetch activities filtered by location', async () => {
    const locationFilteredActivitiesMock = [{ id: 2, name: 'Corrida' }];
    (api.get as jest.Mock).mockResolvedValue({ data: locationFilteredActivitiesMock });

    const result = await filterActivitiesByLocation('Parque', 1, 10);
    expect(api.get).toHaveBeenCalledWith('/api/activities/paged?location=Parque&page=1&size=10');
    expect(result).toEqual(locationFilteredActivitiesMock);
  });
  
  // Teste de erro para o filtro
  it('should handle error when fetching activities by location', async () => {
    (api.get as jest.Mock).mockRejectedValue(new Error('Network error'));
    
    await expect(filterActivitiesByLocation('Parque', 1, 10)).rejects.toThrow('Network error');
  });
});
