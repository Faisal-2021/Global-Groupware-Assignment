
import { LoginCredentials, LoginResponse, UpdateUserPayload, User, UserResponse } from '@/types/user';

const BASE_URL = 'https://reqres.in/api';

// Helper function for handling API responses
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    // Get error message from the response body or use a default message
    const errorData = await response.json().catch(() => ({}));
    const errorMessage = errorData.error || `API error: ${response.status}`;
    throw new Error(errorMessage);
  }
  
  // For 204 No Content responses (like successful DELETE)
  if (response.status === 204) {
    return null;
  }
  
  return response.json();
};

// Fetch authentication token
export const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
  
  return handleResponse(response);
};

// Fetch users with pagination
export const getUsers = async (page: number = 1): Promise<UserResponse> => {
  const response = await fetch(`${BASE_URL}/users?page=${page}`);
  return handleResponse(response);
};

// Get a single user
export const getUser = async (id: number): Promise<{ data: User }> => {
  const response = await fetch(`${BASE_URL}/users/${id}`);
  return handleResponse(response);
};

// Update a user
export const updateUser = async (id: number, data: UpdateUserPayload): Promise<{ updatedAt: string }> => {
  const response = await fetch(`${BASE_URL}/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  return handleResponse(response);
};

// Delete a user
export const deleteUser = async (id: number): Promise<null> => {
  const response = await fetch(`${BASE_URL}/users/${id}`, {
    method: 'DELETE',
  });
  
  return handleResponse(response);
};
