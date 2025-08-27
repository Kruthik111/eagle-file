import { API_BASE_URL } from "../constants";

export const checkServerConnectivity = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/`, {
      method: 'GET',
    });
    return response.status < 500; // Consider any non-5xx response as "online"
  } catch (error) {
    return false;
  }
};

export const handleServerError = (error: any): string => {
  if (error.message?.includes('Failed to fetch') || error.message?.includes('NetworkError')) {
    return "Server is not running. Please start the backend server.";
  }
  
  if (error.status === 0 || error.status >= 500) {
    return "Server is not running. Please start the backend server.";
  }
  
  return error.message || "An unexpected error occurred";
};

export const safeFetch = async (url: string, options?: RequestInit): Promise<Response> => {
  try {
    const response = await fetch(url, options);
    return response;
  } catch (error: any) {
    if (error.message?.includes('Failed to fetch') || error.message?.includes('NetworkError')) {
      throw new Error("Server is not running. Please start the backend server.");
    }
    throw error;
  }
};
