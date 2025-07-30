// src/services/api.ts

import axios from 'axios';
import type {
  CreateStoreTypeRequest,
  StoreType,
  UpdateStoreTypeRequest,
} from '../types/store';

const BASE_URL = 'https://41.38.56.140/api/StoreTypes';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// عرض جميع الأقسام
export const fetchAllStoreTypes = async (): Promise<StoreType[]> => {
  try {
    const res = await api.get('/GetAllTypes');
    return res.data;
  } catch (error) {
    console.error('Error fetching store types:', error);
    throw error;
  }
};

// جلب قسم حسب ID
export const fetchStoreTypeById = async (
  id: number
): Promise<StoreType | null> => {
  try {
    const res = await api.get(`/GetStoreTypeById/${id}`);
    return res.data;
  } catch (error) {
    console.error(`Error fetching store type ${id}:`, error);
    throw error;
  }
};

// تعديل قسم
export const updateStoreType = async (
  data: UpdateStoreTypeRequest
): Promise<StoreType> => {
  try {
    const res = await api.put(`/UpdateStoreType?id=${data.id}`, data);
    return res.data;
  } catch (error) {
    console.error(`Error updating store type ${data.id}:`, error);
    throw error;
  }
};

// إنشاء قسم جديد
export const createStoreType = async (
  data: CreateStoreTypeRequest
): Promise<StoreType> => {
  try {
    const res = await api.post('/CreateStoreType', data);
    return res.data;
  } catch (error) {
    console.error('Error creating store type:', error);
    throw error;
  }
};

// حذف قسم
export const deleteStoreType = async (id: number): Promise<void> => {
  try {
    await api.delete(`/DeleteStoreType/${id}`);
  } catch (error) {
    console.error(`Error deleting store type ${id}:`, error);
    throw error;
  }
};

// تفعيل/إلغاء تفعيل قسم
export const toggleStoreTypeStatus = async (
  id: number,
  isActive: boolean
): Promise<StoreType> => {
  try {
    const res = await api.put(`/ToggleStoreTypeStatus/${id}`, { isActive });
    return res.data;
  } catch (error) {
    console.error(`Error toggling store type ${id} status:`, error);
    throw error;
  }
};
