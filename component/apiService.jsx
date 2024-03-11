// apiService.js

import axios from 'axios';
import { API_URL } from './config';

const apiService = axios.create({
  baseURL: API_URL,
});

const login = async (loginform) => {
  try {
    const response = await apiService.post(`${API_URL}/login`,loginform);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const words = async () => {
    const accessToken = localStorage.getItem('AccessToken');
    console.log('accessToken',accessToken);
    try {
      const response = await apiService.get(`${API_URL}/words`,{
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
    });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  const wordGroups = async () => {
    const accessToken = localStorage.getItem('AccessToken');
    console.log('accessToken',accessToken);
    try {
      const response = await apiService.get(`${API_URL}/WordGroups`,{
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
    });
      
      const formattedData = response.data.map(item => {
        // Her bir öğe için yeni bir nesne oluştur
        return {
          key: item.wg_id.toString(), // Key değeri wg_id'nin bir dize olarak dönüştürülmüş hali
          value: item.wg_name, // Value değeri wg_name'in kendisi
          child:item.child
        };
      });
      return formattedData;
    } catch (error) {
      throw error;
    }
  };

  const meansType = async () => {
    const accessToken = localStorage.getItem('AccessToken');
    console.log('accessToken',accessToken);
    try {
      const response = await apiService.get(`${API_URL}/MeansType`,{
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
    });
      
      const formattedData = response.data.map(item => {
        // Her bir öğe için yeni bir nesne oluştur
        return {
          key: item.mt_short_name, 
          value: item.mt_name          
        };
      });
      return formattedData;

    } catch (error) {
      throw error;
    }
  };


  const meansTypeList = async () => {
    const accessToken = localStorage.getItem('AccessToken');
        try {
        const response = await apiService.get(`${API_URL}/MeansType`,{
            headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
            }
        });
      return response.data;

    } catch (error) {
      throw error;
    }
  };

  const meansTypeAdd = async (formdata) => {
    const accessToken = localStorage.getItem('AccessToken');
        try {
        const response = await apiService.post(`${API_URL}/MeansType`,formdata,{
            headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
            }
        });
      return response.data;

    } catch (error) {
      throw error;
    }
  };

  const meansTypeUpdate = async (formdata) => {
    const accessToken = localStorage.getItem('AccessToken');
        try {
        const response = await apiService.put(`${API_URL}/MeansType`,formdata,{
            headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
            }
        });
      return response.data;

    } catch (error) {
      throw error;
    }
  };

  const meansTypeDelete = async (id) => {
    const accessToken = localStorage.getItem('AccessToken');
        try {
        const response = await apiService.delete(`${API_URL}/MeansType/${id}`,{
            headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
            }
        });
      return response.data;

    } catch (error) {
      throw error;
    }
  };


  const wordGroupList = async () => {
    const accessToken = localStorage.getItem('AccessToken');
        try {
        const response = await apiService.get(`${API_URL}/WordGroups`,{
            headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
            }
        });
      return response.data;

    } catch (error) {
      throw error;
    }
  };

  const wordGroupAdd = async (formdata) => {
    const accessToken = localStorage.getItem('AccessToken');
        try {
        const response = await apiService.post(`${API_URL}/WordGroups`,formdata,{
            headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
            }
        });
      return response.data;

    } catch (error) {
      throw error;
    }
  };

  const wordGroupUpdate = async (formdata) => {
    const accessToken = localStorage.getItem('AccessToken');
        try {
        const response = await apiService.put(`${API_URL}/WordGroups`,formdata,{
            headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
            }
        });
      return response.data;

    } catch (error) {
      throw error;
    }
  };

  const wordGroupDelete = async (id) => {
    const accessToken = localStorage.getItem('AccessToken');
        try {
        const response = await apiService.delete(`${API_URL}/WordGroups/${id}`,{
            headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
            }
        });
      return response.data;

    } catch (error) {
      throw error;
    }
  };

  

// const getUserProfile = async (userId) => {
//   try {
//     const response = await apiService.get(`${USER_PROFILE_URL}/${userId}`);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

export { login,words,wordGroups,meansType,meansTypeList,meansTypeAdd,meansTypeUpdate,meansTypeDelete,
    wordGroupList,wordGroupAdd,wordGroupUpdate,wordGroupDelete };
