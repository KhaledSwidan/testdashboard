// src/data/storeTable.ts

import type { StoreType } from '../types/store';

export const fallbackData = (): StoreType[] => [
  {
    id: 1,
    nameAr: 'مطاعم',
    nameEn: 'Restaurants',
    icon_path: 'https://cdn-icons-png.flaticon.com/64/1046/1046755.png',
    isActive: true,
  },
  {
    id: 2,
    nameAr: 'صيدليات',
    nameEn: 'Pharmacies',
    icon_path: 'https://cdn-icons-png.flaticon.com/64/883/883356.png',
    isActive: true,
  },
  {
    id: 3,
    nameAr: 'محلات',
    nameEn: 'Stores',
    icon_path: 'https://cdn-icons-png.flaticon.com/64/869/869636.png',
    isActive: false,
  },
  {
    id: 4,
    nameAr: 'كافيهات',
    nameEn: 'Cafes',
    icon_path: 'https://cdn-icons-png.flaticon.com/64/751/751621.png',
    isActive: true,
  },
  {
    id: 5,
    nameAr: 'سوبر ماركت',
    nameEn: 'Supermarkets',
    icon_path: 'https://cdn-icons-png.flaticon.com/64/2329/2329068.png',
    isActive: true,
  },
  {
    id: 6,
    nameAr: 'مخابز',
    nameEn: 'Bakeries',
    icon_path: 'https://cdn-icons-png.flaticon.com/64/2729/2729007.png',
    isActive: false,
  },
];
