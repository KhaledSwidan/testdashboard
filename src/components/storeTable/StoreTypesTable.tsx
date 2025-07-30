import { useState } from 'react';
import type { StoreType } from '../../types/store';
import NoStoreTypesLength from './NoStoreTypesLength';
import SelectedRowsLength from './SelectedRowsLength';
import TableStructure from './TableStructure';
import ExtraInfo from './ExtraInfo';

interface StoreTypesTableProps {
  storeTypes: StoreType[];
}

const StoreTypesTable = ({ storeTypes }: StoreTypesTableProps) => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const handleSelectRow = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    setSelectedRows(
      selectedRows.length === storeTypes.length
        ? []
        : storeTypes.map((store) => String(store.id))
    );
  };

  if (storeTypes.length === 0) return <NoStoreTypesLength />;

  return (
    <div className='bg-white rounded-lg shadow-sm p-6'>
      <div className='flex items-center justify-between mb-6'>
        <h2 className='text-lg font-semibold text-gray-800'>
          أنواع المتاجر ({storeTypes.length})
        </h2>
        <SelectedRowsLength
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
        />
      </div>

      <div className='rounded-md border'>
        <TableStructure
          storeTypes={storeTypes}
          selectedRows={selectedRows}
          handleSelectAll={handleSelectAll}
          handleSelectRow={handleSelectRow}
        />
      </div>

      {/* معلومات إضافية */}
      <ExtraInfo storeTypes={storeTypes} />
    </div>
  );
};

export default StoreTypesTable;
