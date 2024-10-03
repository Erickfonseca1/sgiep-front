import axios from 'axios'
import axiosRetry from 'axios-retry'

export const api = axios.create({
  baseURL: 'http://localhost:8080',
})

axiosRetry(api, {
  retries: 3, // Número de tentativas
  retryDelay: (retryCount) => {
    console.log(`Tentativa de requisição: ${retryCount}`)
    return retryCount * 1000;
  },
  retryCondition: (error) => {
    return (error.response?.status ?? 0) >= 500 || error.code === 'ECONNABORTED';
  },
})
