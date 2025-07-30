// src/store/useStoreTypes.ts

import { create } from 'zustand';
import {
  fetchAllStoreTypes,
  createStoreType,
  updateStoreType,
  deleteStoreType,
  fetchStoreTypeById,
} from '../services/api';
import type { StoreType } from '../types/store';

interface StoreTypesState {
  storeTypes: StoreType[];
  loading: boolean;
  error: string | null;

  // Actions
  getStoreTypes: () => Promise<void>;
  getStoreTypeById: (id: number) => Promise<StoreType | null>;
  addStoreType: (data: StoreType & { selectedFile?: File }) => Promise<void>;
  updateStoreType: (data: StoreType & { selectedFile?: File }) => Promise<void>;
  removeStoreType: (id: number) => Promise<void>;
}

export const useStoreTypes = create<StoreTypesState>((set, get) => ({
  storeTypes: [],
  loading: false,
  error: null,

  // 1. Get All
  getStoreTypes: async () => {
    set({ loading: true, error: null });
    try {
      const data = await fetchAllStoreTypes();
      set({ storeTypes: data });
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'حدث خطأ أثناء تحميل الأقسام';
      set({ error: message });
    } finally {
      set({ loading: false });
    }
  },

  // 2. Get By ID
  getStoreTypeById: async (id) => {
    try {
      const data = await fetchStoreTypeById(id);
      return data;
    } catch (err: unknown) {
      console.error(err);
      return null;
    }
  },

  // 3. Add - مع دعم الملفات
  addStoreType: async (data) => {
    try {
      await createStoreType(data);
      await get().getStoreTypes(); // إعادة تحميل القائمة
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'حدث خطأ أثناء إضافة القسم';
      set({ error: message });
      throw err; // رمي الخطأ للمكون
    }
  },

  // 4. Update - مع دعم الملفات
  updateStoreType: async (data) => {
    try {
      await updateStoreType(data);
      await get().getStoreTypes(); // إعادة تحميل القائمة
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'حدث خطأ أثناء تعديل القسم';
      set({ error: message });
      throw err;
    }
  },

  // 5. Delete
  removeStoreType: async (id) => {
    try {
      await deleteStoreType(id);
      await get().getStoreTypes(); // تحديث القائمة
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'حدث خطأ أثناء حذف القسم';
      set({ error: message });
      throw err;
    }
  },
}));
