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
    return "Unable to connect to our servers. Please check your internet connection and try again.";
  }
  
  if (error.status === 0 || error.status >= 500) {
    return "Our servers are temporarily unavailable. Please try again in a few moments.";
  }
  
  return error.message || "Something went wrong. Please try again.";
};

export const safeFetch = async (url: string, options?: RequestInit): Promise<Response> => {
  try {
    const response = await fetch(url, options);
    return response;
  } catch (error: any) {
    if (error.message?.includes('Failed to fetch') || error.message?.includes('NetworkError')) {
      throw new Error("Unable to connect to our servers. Please check your internet connection and try again.");
    }
    throw error;
  }
};
