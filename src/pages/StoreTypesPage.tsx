// src/pages/StoreTypesPage.tsx

import { useState, useEffect, useCallback, useMemo } from 'react';
import { fetchAllStoreTypes } from '../services/api';
import type { StoreType } from '../types/store';
import { fallbackData } from '../data/storeTable';
import Loader from '../components/Loader';
import Sidebar from '../components/Sidebar';
import CircleChevronLeftBtn from '../components/CircleChevronLeftBtn';
import MainHeader from '../components/MainHeader';
import ErrorMessage from '../components/ErrorMessage';
import SuccessAfterFallback from '../components/SuccessAfterFallback';
import Controls from '../components/Controls';
import StoreTypesTable from '../components/StoreTypesTable';

const StoreTypesPage = () => {
  const [storeTypes, setStoreTypes] = useState<StoreType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [wasFallbackUsed, setWasFallbackUsed] = useState<boolean>(false);
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => setSidebarVisible((prev) => !prev);

  const fallbackDataStores = useMemo(() => fallbackData(), []);

  const getData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data: StoreType[] | { data: StoreType[] } =
        await fetchAllStoreTypes();

      if (Array.isArray(data)) {
        setStoreTypes(data);
      } else if (
        data &&
        typeof data === 'object' &&
        'data' in data &&
        Array.isArray((data as { data?: StoreType[] }).data)
      ) {
        setStoreTypes((data as { data: StoreType[] }).data);
      } else {
        throw new Error('تنسيق البيانات غير صحيح');
      }

      setWasFallbackUsed(false); // البيانات الأصلية وصلت
    } catch (err) {
      console.error('Error fetching store types:', err);

      let errorMessage = 'حدث خطأ في تحميل البيانات';

      if (err instanceof TypeError && err.message === 'Failed to fetch') {
        errorMessage = 'لا يمكن الاتصال بالخادم. تحقق من اتصال الإنترنت';
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }

      setError(errorMessage);
      setStoreTypes(fallbackDataStores); // استخدام البيانات البديلة
      setWasFallbackUsed(true); // تم تفعيل fallback
    } finally {
      setLoading(false);
    }
  }, [fallbackDataStores]);

  useEffect(() => {
    getData();
  }, [getData]);

  const handleRetry = () => {
    getData();
  };

  // معالجات الأحداث للجدول
  const handleAddStore = (storeData: StoreType) => {
    console.log('إضافة متجر جديد:', storeData);
    // يمكنك إضافة المتجر الجديد للحالة المحلية
    const newStore: StoreType = {
      id: Date.now(),
      nameAr: storeData.nameAr,
      nameEn: storeData.nameEn,
      isActive: storeData.isActive,
      createdAt: new Date().toISOString(),
    };
    setStoreTypes((prev) => [newStore, ...prev]);
  };

  const handleEditStore = (storeType: StoreType) => {
    console.log('تعديل المتجر:', storeType);
    // يمكنك فتح نموذج التعديل هنا
  };

  const handleDeleteStore = (storeType: StoreType) => {
    console.log('حذف المتجر:', storeType);
    // يمكنك إظهار تأكيد الحذف هنا
    if (confirm(`هل أنت متأكد من حذف "${storeType.nameAr}"؟`)) {
      setStoreTypes((prev) =>
        prev.filter((store) => store.id !== storeType.id)
      );
    }
  };

  const handleViewStore = (storeType: StoreType) => {
    console.log('عرض تفاصيل المتجر:', storeType);
    // يمكنك فتح نافذة تفاصيل المتجر هنا
  };

  if (loading) return <Loader />;

  return (
    <div className='min-h-screen bg-gray-50 flex' dir='rtl'>
      {/* Sidebar */}
      {sidebarVisible ? (
        <Sidebar isVisible={sidebarVisible} onToggle={toggleSidebar} />
      ) : (
        <CircleChevronLeftBtn toggleSidebar={toggleSidebar} />
      )}

      {/* Main Content */}
      <div className='flex-1 p-8'>
        <MainHeader />

        {/* Error Message */}
        {error && <ErrorMessage error={error} handleRetry={handleRetry} />}

        {/* Success After Fallback */}
        {!error && wasFallbackUsed && (
          <SuccessAfterFallback
            error={error}
            wasFallbackUsed={wasFallbackUsed}
          />
        )}

        {/* Controls */}
        <Controls />

        {/* جدول أنواع المتاجر */}
        <StoreTypesTable
          storeTypes={storeTypes}
          onEdit={handleEditStore}
          onDelete={handleDeleteStore}
          onView={handleViewStore}
        />

        {/* Stats */}
        <div className='mt-6 grid grid-cols-1 md:grid-cols-4 gap-4'>
          <div className='bg-white rounded-lg p-4 text-center shadow-sm'>
            <div className='text-2xl font-bold text-blue-600'>
              {storeTypes.length}
            </div>
            <div className='text-sm text-gray-500'>إجمالي الأنواع</div>
          </div>
          <div className='bg-white rounded-lg p-4 text-center shadow-sm'>
            <div className='text-2xl font-bold text-green-600'>
              {storeTypes.filter((s) => s.isActive).length}
            </div>
            <div className='text-sm text-gray-500'>نشط</div>
          </div>
          <div className='bg-white rounded-lg p-4 text-center shadow-sm'>
            <div className='text-2xl font-bold text-red-600'>
              {storeTypes.filter((s) => !s.isActive).length}
            </div>
            <div className='text-sm text-gray-500'>غير نشط</div>
          </div>
          <div className='bg-white rounded-lg p-4 text-center shadow-sm'>
            <div className='text-2xl font-bold text-yellow-600'>
              {storeTypes.length}
            </div>
            <div className='text-sm text-gray-500'>نتائج البحث</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreTypesPage;
