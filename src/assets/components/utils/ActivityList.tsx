import React, { useState, useEffect } from 'react';
import './style-table.css';
import getAllActivity from '../../services/ActivictyServices';
//import { useTable } from 'react-table';  Install react-table: npm install react-table

const ActivityList = () => {
  const [activities, setActivities] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
  
       setActivities(await getAllActivity());
    };

    fetchData();
   
  }, []);

 
 

    return(
      
      <div>
       
      {activities.length > 0 ? ( // Check if activities has elements
        
          <table className='table-styled'>
      <thead>
        <tr>
          <th  >ID</th>
          <th >Nome</th>
          <th >Descrição</th>
          <th >Local</th>
          <th >Agendamentos</th>
        </tr>
      </thead>
      <tbody>
        {activities.map((activity) => (
          <tr key={activity}>
            <td>{activity?.id}</td>
            <td>{activity?.name}</td>
            <td>{activity?.description}</td>
            <td>{activity?.location}</td>
          </tr>
        ))}
        
      </tbody>
      </table>
      ) : (
        <p>Loading activities...</p>
      )}
    </div>
  );
}

export default ActivityList;
