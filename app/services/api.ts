// Helper function to get cookie value by name
function getCookie(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined;
  
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift();
  }
  return undefined;
}

const API_BASE_URL = 'http://localhost:3001/api';

// Generic API request function
const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config: RequestInit = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    }
  };

  try {
    const response = await fetch(url, config);
    
    // Handle successful responses
    if (response.ok) {
      const data = await response.json();
      return { data, error: null };
    }
    
    // Handle error responses
    let errorMessage = 'Erro desconhecido';
    try {
      const errorData = await response.json();
      errorMessage = errorData.error || `HTTP Error: ${response.status}`;
    } catch {
      errorMessage = `HTTP Error: ${response.status}`;
    }
    
    return { data: null, error: errorMessage };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro de conexão';
    return { data: null, error: errorMessage };
  }
};

// HTTP Methods
export const api = {
  get: (endpoint: string, token?: string) => {
    const headers: HeadersInit = {
      'Content-Type': 'application/json'
    };
    
    // Use provided token or get from cookies
    const tokenToUse = token || getCookie('token');
    
    if (tokenToUse) {
      headers['Authorization'] = `Bearer ${tokenToUse}`;
    }
    
    return apiRequest(endpoint, { 
      method: 'GET', 
      headers 
    });
  },
  post: (endpoint: string, body: any, token?: string) => {
    const headers: HeadersInit = {
      'Content-Type': 'application/json'
    };
    
    // Use provided token or get from cookies
    const tokenToUse = token || getCookie('token');
    
    if (tokenToUse) {
      headers['Authorization'] = `Bearer ${tokenToUse}`;
    }
    
    return apiRequest(endpoint, { 
      method: 'POST', 
      headers,
      body: JSON.stringify(body) 
    });
  },
  put: (endpoint: string, body: any, token?: string) => {
    const headers: HeadersInit = {
      'Content-Type': 'application/json'
    };
    
    // Use provided token or get from cookies
    const tokenToUse = token || getCookie('token');
    
    if (tokenToUse) {
      headers['Authorization'] = `Bearer ${tokenToUse}`;
    }
    
    return apiRequest(endpoint, { 
      method: 'PUT', 
      headers,
      body: JSON.stringify(body) 
    });
  },
  delete: (endpoint: string, token?: string) => {
    const headers: HeadersInit = {
      'Content-Type': 'application/json'
    };
    
    // Use provided token or get from cookies
    const tokenToUse = token || getCookie('token');
    
    if (tokenToUse) {
      headers['Authorization'] = `Bearer ${tokenToUse}`;
    }
    
    return apiRequest(endpoint, { 
      method: 'DELETE', 
      headers
    });
  }
};