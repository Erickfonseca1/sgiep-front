import {api} from './api';

export const getActivities = async () => {
    try {
        const response = await api.get('/api//activities');
        return response.data;
    } catch (error) {
        console.error(error);
    }
}
