// src/types/store.ts

export interface StoreType {
  id: number;
  nameAr: string;
  nameEn: string;
  isActive: boolean;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateStoreTypeRequest {
  nameAr: string;
  nameEn: string;
  iconPath?: string;
  isActive: boolean;
}

export interface UpdateStoreTypeRequest {
  id: number;
  nameAr: string;
  nameEn: string;
  iconPath?: string;
  isActive: boolean;
}
