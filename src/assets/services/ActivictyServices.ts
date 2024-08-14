import {api} from './api';


async function getAllActyvicty(){
    try {
        const response = await api.get('/api/activities');
        return response.data;
      } catch (error) {
       console.log('error')
      } 
    
}

export default getAllActyvicty;