import { useStoreTypes } from '../../store/useStoreTypes';
import { Button } from '../ui/button';
import { Trash2 } from 'lucide-react';

interface SelectedRowsLengthProps {
  selectedRows: string[];
  setSelectedRows: React.Dispatch<React.SetStateAction<string[]>>;
}

const SelectedRowsLength = ({
  selectedRows,
  setSelectedRows,
}: SelectedRowsLengthProps) => {
  const { removeStoreType } = useStoreTypes();
  return (
    <>
      {' '}
      {selectedRows.length > 0 && (
        <div className='flex items-center gap-2'>
          <span className='text-sm text-gray-600'>
            تم تحديد {selectedRows.length} عنصر
          </span>
          <Button
            variant='destructive'
            size='sm'
            onClick={() => {
              console.log('Delete selected:', selectedRows);
              selectedRows.forEach(async (id) => {
                await removeStoreType(parseInt(id));
              });
              setSelectedRows([]);
            }}
          >
            <Trash2 size={16} className='ml-2' />
            حذف المحدد
          </Button>
        </div>
      )}
    </>
  );
};

export default SelectedRowsLength;
