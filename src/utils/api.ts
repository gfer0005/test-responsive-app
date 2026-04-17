import axios from "axios";
import type { V8670Kpi, User, V8670KpiInputDetail } from "../types/types";

const axiosInstance = axios.create({
  baseURL: "https://localhost:7060", // Use HTTPS backend URL
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  withCredentials: true, // Send Windows auth credentials cross-origin
});

// Add interceptors for debugging requests and responses
axiosInstance.interceptors.request.use((config) => {
  return config;
}, (error) => {
  console.error('[DEBUG] Axios Request Error:', error);
  return Promise.reject(error);
});

axiosInstance.interceptors.response.use((response) => {
  return response;
}, (error) => {
  console.error('[DEBUG] Axios Response Error:', error.response || error);
  return Promise.reject(error);
});

export const KpiAPI = {
  getAllAsync: async (): Promise<V8670Kpi[]> => {
    try {
      const response = await axiosInstance.get('/V8670Kpi');
      return response.data;
    } catch (error) {
      console.error('Error fetching all kpis:', error);
      throw error;
    }
  },

  getAllUnitsAsync: async (MesureUnit?: string, MesureLabel?: string): Promise<V8670KpiInputDetail[]> => {
    try {
      const response = await axiosInstance.get('/V8670Kpi/all-units', {
        params: { MesureUnit, MesureLabel },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching all units:', error);
      throw error;
    }
  },

  getKpiInputsByUser: async (userId: string, orgCode: string): Promise<V8670KpiInputDetail[]> => {
    if (!userId || !orgCode) {
      throw new Error('Invalid parameters: userId and orgCode are required.');
    }

    try {
      const response = await axiosInstance.get(`/V8670Kpi/user-kpis`, {
        params: { userId, orgCode },
      });
      return response.data;
    } catch (error:any) {
      console.error('Error fetching KPI inputs by user:', error.response?.data || error.message);
      throw error;
    }
  },

  getFilteredKpiInputs: async (kpiYear?: number, isManco?: boolean, isManual?: boolean, kpi?: string, month?: number): Promise<V8670KpiInputDetail[]> => {
    try {
        const response = await axiosInstance.get('/V8670Kpi/filtered-kpis', {
            params: { kpiYear, isManco, isManual, kpi, month }, // Ensure correct parameter names
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching filtered KPI inputs:', error);
        throw error;
    }
  },

  getAllGroupsAsync: async (GrpId?: string, GrpLabel?: string): Promise<V8670KpiInputDetail[]> => {
    try {
      const response = await axiosInstance.get('/V8670Kpi/all-groups', {
        params: { GrpId, GrpLabel },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching all groups:', error);
      throw error;
    } 
  },

};

export const UserAPI = {
  getUserById: async (id: string): Promise<User> => {
    try {
      const response = await axiosInstance.get(`/Auth/user/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching user with ID ${id}:`, error);
      throw error;
    }
  },

  getAllUsers: async (): Promise<User[]> => {
    try {
      const response = await axiosInstance.get('/Auth/users');
      return response.data;
    } catch (error) {
      console.error('Error fetching all users:', error);
      throw error;
    }
  },

  getCurrentUser: async (): Promise<User & { isAuthorized: boolean }> => {
    try {
      const response = await axiosInstance.get('/User/auth');
      return response.data;
    } catch (error) {
      console.error('Error fetching current user:', error);
      throw error;
    }
  },
};
