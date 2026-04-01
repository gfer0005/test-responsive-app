import axios from "axios";
import type { V8670Kpi } from "../types/types";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5215/api",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
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
};
