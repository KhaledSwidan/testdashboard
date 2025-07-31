// src/pages/StoreTypesPage.tsx

import { useEffect, useMemo } from 'react';
import { useStoreTypes } from '../store/useStoreTypes';
import { fallbackData } from '../data/storeTable';
import Loader from '../components/Loader';
import MainHeader from '../components/MainHeader';
import Controls from '../components/Controls';
import StoreTypesTable from '../components/storeTable/StoreTypesTable';
import SidebarOrToggle from '../components/SidebarToggle';
import Stats from '../components/Stats';

const StoreTypesPage = () => {
  const { storeTypes, loading, error, getStoreTypes } = useStoreTypes();
  const fallbackDataStores = useMemo(() => fallbackData(), []);

  const displayData =
    error || storeTypes.length === 0 ? fallbackDataStores : storeTypes;

  useEffect(() => {
    getStoreTypes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='min-h-screen bg-gray-50 flex' dir='rtl'>
      <SidebarOrToggle />

      <div className='flex-1 p-8'>
        <MainHeader />

        <Controls />

        {/* Network Error Notice */}
        {error && (
          <div className='bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6'>
            <div className='flex items-center gap-2'>
              <span className='text-yellow-600'>⚠️</span>
              <p className='text-yellow-800'>
                السيرفر غير متاح حالياً. يتم عرض البيانات المؤقتة.
              </p>
            </div>
            <button
              onClick={() => getStoreTypes()}
              className='mt-2 text-yellow-600 underline text-sm'
            >
              إعادة المحاولة
            </button>
          </div>
        )}

        {loading ? (
          <Loader />
        ) : (
          <>
            <StoreTypesTable storeTypes={displayData} />
            <Stats storeTypes={displayData} />
          </>
        )}
      </div>
    </div>
  );
};

export default StoreTypesPage;
