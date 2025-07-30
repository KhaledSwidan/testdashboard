// src/pages/StoreTypesPage.tsx

import { useEffect, useMemo } from 'react';
import { useStoreTypes } from '../store/useStoreTypes';
import { fallbackData } from '../data/storeTable';
import Loader from '../components/Loader';
import MainHeader from '../components/MainHeader';
import ErrorMessage from '../components/ErrorMessage';
import SuccessAfterFallback from '../components/SuccessAfterFallback';
import Controls from '../components/Controls';
import StoreTypesTable from '../components/storeTable/StoreTypesTable';
import SidebarOrToggle from '../components/SidebarToggle';
import Stats from '../components/Stats';

const StoreTypesPage = () => {
  const { storeTypes, loading, error, getStoreTypes } = useStoreTypes();

  const fallbackDataStores = useMemo(() => fallbackData(), []);
  const wasFallbackUsed = storeTypes.length && error ? true : false;

  const handleRetry = () => {
    getStoreTypes();
  };

  useEffect(() => {
    getStoreTypes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='min-h-screen bg-gray-50 flex' dir='rtl'>
      {/* Sidebar */}
      <SidebarOrToggle />

      {/* Main Content */}
      <div className='flex-1 p-8'>
        <MainHeader />

        {/* Error */}
        {error && <ErrorMessage error={error} handleRetry={handleRetry} />}

        {/* Fallback Notice */}
        {!error && wasFallbackUsed && (
          <SuccessAfterFallback
            error={error}
            wasFallbackUsed={wasFallbackUsed}
          />
        )}

        {/* Controls */}
        <Controls />

        {/* Table */}
        {loading ? (
          <Loader />
        ) : (
          <StoreTypesTable
            storeTypes={storeTypes.length ? storeTypes : fallbackDataStores}
          />
        )}

        {/* Stats */}
        <Stats
          storeTypes={storeTypes.length ? storeTypes : fallbackDataStores}
        />
      </div>
    </div>
  );
};

export default StoreTypesPage;
