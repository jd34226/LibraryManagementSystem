import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL+`/api/transaction`;

export const getOverdueTransactions = async () => {
  const response = await axios.get(`${BASE_URL}/overdue`);
  return response.data;
};

export const getUpcomingTransactions = async () => {
  const response = await axios.get(`${BASE_URL}/next10`);
  return response.data;
};

export const searchTransactions = async (id) => {
  const url = id?.trim()
    ? `${BASE_URL}?id=${id}`
    : `${BASE_URL}?id`; // triggers "all" behavior
  const response = await axios.get(url);
  return Array.isArray(response.data) ? response.data : [response.data];
};

export const deleteTransaction = async (id) => {
  const response = await axios.delete(`${BASE_URL}/${id}`);
  return response.data;
};

export const addTransaction = async (data) => {
  return axios.post(`${BASE_URL}`, data);
};

export const getTransactionById = async (id) => {
  const response = await axios.get(BASE_URL, {
    params: { id }
  });

  return response.data;
};


export const updateTransactionById = async (id, payload) => {
  const response = await axios.put(`${BASE_URL}/${id}`, payload);
  return response.data;
};

