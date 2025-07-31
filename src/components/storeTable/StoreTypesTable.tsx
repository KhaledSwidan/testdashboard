import NoStoreTypesLength from './NoStoreTypesLength';
import TableStructure from './TableStructure';
import type { StoreType } from '../../types/store';

interface StoreTypesTableProps {
  storeTypes: StoreType[];
}

const StoreTypesTable = ({ storeTypes }: StoreTypesTableProps) => {
  if (storeTypes.length === 0) return <NoStoreTypesLength />;

  return (
    <div className='bg-white rounded-lg shadow-sm p-6'>
      <div className='flex items-center justify-between mb-6'>
        <h2 className='text-lg font-semibold text-gray-800'>
          أنواع المتاجر ({storeTypes.length})
        </h2>
      </div>

      <div className='rounded-md border'>
        <TableStructure storeTypes={storeTypes} />
      </div>
    </div>
  );
};

export default StoreTypesTable;
