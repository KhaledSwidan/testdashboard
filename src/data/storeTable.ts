// src/data/storeTable.ts

import type { StoreType } from '../types/store';

export const fallbackData = (): StoreType[] => [
  {
    id: 1,
    nameAr: 'مطاعم',
    nameEn: 'Restaurants',
    image: 'https://cdn-icons-png.flaticon.com/64/1046/1046755.png',
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    nameAr: 'صيدليات',
    nameEn: 'Pharmacies',
    image: 'https://cdn-icons-png.flaticon.com/64/883/883356.png',
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 3,
    nameAr: 'محلات',
    nameEn: 'Stores',
    image: 'https://cdn-icons-png.flaticon.com/64/869/869636.png',
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 4,
    nameAr: 'كافيهات',
    nameEn: 'Cafes',
    image: 'https://cdn-icons-png.flaticon.com/64/751/751621.png',
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 5,
    nameAr: 'سوبر ماركت',
    nameEn: 'Supermarkets',
    image: 'https://cdn-icons-png.flaticon.com/64/2329/2329068.png',
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 6,
    nameAr: 'مخابز',
    nameEn: 'Bakeries',
    image: 'https://cdn-icons-png.flaticon.com/64/2729/2729007.png',
    isActive: false,
    createdAt: new Date().toISOString(),
  },
];
