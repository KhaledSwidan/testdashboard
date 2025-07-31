// src/services/api.ts

import axios from 'axios';
import type { StoreType } from '../types/store';

const BASE_URL = 'https://41.38.56.140/api/StoreTypes';
const IMAGE_BASE_URL = 'https://41.38.56.140/Icons';

// إنشاء نسخة من axios
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
    'Access-Control-Allow-Headers': 'Content-Type',
  },
  timeout: 10000,
});

export const getImageUrl = (
  iconPath?: string,
  fallback = '/placeholderUser.png'
): string => {
  if (!iconPath) return fallback;
  return `${IMAGE_BASE_URL}/${iconPath}`;
};

// =======================
// 1. عرض كل الأقسام (GET)
// =======================
export const fetchAllStoreTypes = async (): Promise<StoreType[]> => {
  try {
    const response = await api.get('/GetAllTypes');
    return response.data;
  } catch (error) {
    console.error('فشل في تحميل الأقسام:', error);
    throw error;
  }
};

// =======================
// 2. جلب قسم واحد بالرقم (GET)
// =======================
export const fetchStoreTypeById = async (
  id: number
): Promise<StoreType | null> => {
  try {
    const response = await api.get(`/GetStoreTypeById/${id}`);
    return response.data;
  } catch (error) {
    console.error(`فشل في جلب القسم رقم ${id}:`, error);
    throw error;
  }
};

// =======================
// 3. إنشاء قسم جديد (POST)
// =======================
export const createStoreType = async (
  data: StoreType & { selectedFile?: File }
): Promise<StoreType> => {
  try {
    if (data.selectedFile) {
      const formData = new FormData();
      formData.append('nameAr', data.nameAr);
      formData.append('nameEn', data.nameEn);
      formData.append('isActive', String(data.isActive));
      formData.append('icon_path', data.selectedFile);

      const response = await axios.post(
        `${BASE_URL}/CreateStoreType`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data;
    } else {
      const response = await api.post('/CreateStoreType', {
        nameAr: data.nameAr,
        nameEn: data.nameEn,
        isActive: data.isActive,
        icon_path: data.icon_path || '',
      });
      return response.data;
    }
  } catch (error) {
    console.error('فشل في إنشاء القسم:', error);
    throw error;
  }
};

// =======================
// 4. تعديل قسم موجود (PUT)
// =======================
export const updateStoreType = async (
  data: StoreType & { selectedFile?: File }
): Promise<StoreType> => {
  try {
    if (data.selectedFile) {
      const formData = new FormData();
      formData.append('id', String(data.id));
      formData.append('nameAr', data.nameAr);
      formData.append('nameEn', data.nameEn);
      formData.append('isActive', String(data.isActive));
      formData.append('icon_path', data.selectedFile);

      const response = await axios.put(
        `${BASE_URL}/UpdateStoreType?id=${data.id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data;
    } else {
      const response = await api.put(`/UpdateStoreType?id=${data.id}`, {
        id: data.id,
        nameAr: data.nameAr,
        nameEn: data.nameEn,
        isActive: data.isActive,
        icon_path: data.icon_path,
      });
      return response.data;
    }
  } catch (error) {
    console.error(`فشل في تعديل القسم رقم ${data.id}:`, error);
    throw error;
  }
};

// =======================
// 5. حذف قسم (DELETE)
// =======================
export const deleteStoreType = async (id: number): Promise<void> => {
  try {
    await api.delete(`/DeleteStoreType/${id}`);
  } catch (error) {
    console.error(`فشل في حذف القسم رقم ${id}:`, error);
    throw error;
  }
};
