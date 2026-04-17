import type { V8670Kpi, User, V8670KpiInputDetail } from "../types/types";
import {
  mockCurrentUser,
  mockUsers,
  mockKpiList,
  mockKpiInputDetails,
} from "../mocks/mockData";

// ============================================================
// Toggle this flag to switch between mock data and real API
// Set to false when the backend is available
// ============================================================
const USE_MOCK = true;

// ============================================================
// Real API setup (kept intact for when backend is ready)
// ============================================================
import axios from "axios";

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

// ============================================================
// Helper: simulate network delay for realistic UX
// ============================================================
const simulateDelay = (ms = 400): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

// ============================================================
// KPI API
// ============================================================
export const KpiAPI = {
  getAllAsync: async (): Promise<V8670Kpi[]> => {
    if (USE_MOCK) {
      await simulateDelay();
      console.log('[MOCK] KpiAPI.getAllAsync →', mockKpiList.length, 'items');
      return mockKpiList;
    }

    try {
      const response = await axiosInstance.get('/V8670Kpi');
      return response.data;
    } catch (error) {
      console.error('Error fetching all kpis:', error);
      throw error;
    }
  },

  getAllUnitsAsync: async (MesureUnit?: string, MesureLabel?: string): Promise<V8670KpiInputDetail[]> => {
    if (USE_MOCK) {
      await simulateDelay();
      let filtered = mockKpiInputDetails;
      if (MesureUnit) filtered = filtered.filter(d => d.mesureUnit === MesureUnit);
      if (MesureLabel) filtered = filtered.filter(d => d.mesureLabel === MesureLabel);
      console.log('[MOCK] KpiAPI.getAllUnitsAsync →', filtered.length, 'items');
      return filtered;
    }

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
    if (USE_MOCK) {
      await simulateDelay(600);
      const filtered = mockKpiInputDetails.filter(
        (d) => d.orgcode === orgCode
      );
      console.log('[MOCK] KpiAPI.getKpiInputsByUser →', filtered.length, 'items for', userId, orgCode);
      return filtered;
    }

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
    if (USE_MOCK) {
      await simulateDelay();
      let filtered = mockKpiInputDetails;
      if (kpiYear) filtered = filtered.filter(d => d.kpiYear === kpiYear);
      if (isManco) filtered = filtered.filter(d => d.manco === '1');
      if (isManual) filtered = filtered.filter(d => d.autoRun === '0');
      if (kpi) filtered = filtered.filter(d => d.kpi === kpi);
      if (month) filtered = filtered.filter(d => d.objmth === month);
      console.log('[MOCK] KpiAPI.getFilteredKpiInputs →', filtered.length, 'items');
      return filtered;
    }

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
    if (USE_MOCK) {
      await simulateDelay();
      let filtered = mockKpiInputDetails;
      if (GrpId) filtered = filtered.filter(d => d.grpid === GrpId);
      if (GrpLabel) filtered = filtered.filter(d => d.grplabel === GrpLabel);
      console.log('[MOCK] KpiAPI.getAllGroupsAsync →', filtered.length, 'items');
      return filtered;
    }

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

// ============================================================
// User API
// ============================================================
export const UserAPI = {
  getUserById: async (id: string): Promise<User> => {
    if (USE_MOCK) {
      await simulateDelay(300);
      const user = mockUsers.find(u => u.userId === id || u.sapnr === id);
      if (!user) throw new Error(`[MOCK] User not found: ${id}`);
      console.log('[MOCK] UserAPI.getUserById →', user.name);
      return user;
    }

    try {
      const response = await axiosInstance.get(`/Auth/user/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching user with ID ${id}:`, error);
      throw error;
    }
  },

  getAllUsers: async (): Promise<User[]> => {
    if (USE_MOCK) {
      await simulateDelay();
      console.log('[MOCK] UserAPI.getAllUsers →', mockUsers.length, 'users');
      return mockUsers;
    }

    try {
      const response = await axiosInstance.get('/Auth/users');
      return response.data;
    } catch (error) {
      console.error('Error fetching all users:', error);
      throw error;
    }
  },

  getCurrentUser: async (): Promise<User & { isAuthorized: boolean }> => {
    if (USE_MOCK) {
      await simulateDelay(500);
      console.log('[MOCK] UserAPI.getCurrentUser →', mockCurrentUser.name, '(authorized:', mockCurrentUser.isAuthorized, ')');
      return mockCurrentUser;
    }

    try {
      const response = await axiosInstance.get('/User/auth');
      return response.data;
    } catch (error) {
      console.error('Error fetching current user:', error);
      throw error;
    }
  },
};
