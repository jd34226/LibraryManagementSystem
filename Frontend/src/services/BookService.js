import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL+`/api/books`;

// Search books from the backend
export const searchBooks = async ({ id, title, author, genre, year, availability }) => {
  const params = new URLSearchParams();

  if (id) params.append('id', id);
  if (title) params.append('title', title);
  if (author) params.append('author', author);
  if (genre) params.append('genre', genre);
  if (year) params.append('year', year);
  if (availability === true) params.append('availability', true);

  const response = await axios.get(`${BASE_URL}/search?${params.toString()}`);
  return Array.isArray(response.data) ? response.data : [response.data];
};

// Add a new book
export const addBook = async (data) => {
  return axios.post(`${BASE_URL}`, data);
};

// Update an existing book by ID
export const updateBookById = async (id, data) => {
  return axios.put(`${BASE_URL}/${id}`, data);
};

// Delete a book by ID
export const deleteBookById = async (id) => {
  return axios.delete(`${BASE_URL}/${id}`);
};

// Get a single book by ID
export async function getBookById(id) {
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response.data;
}

