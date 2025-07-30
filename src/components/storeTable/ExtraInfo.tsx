import type { StoreType } from '../../types/store';

const ExtraInfo = ({ storeTypes }: { storeTypes: StoreType[] }) => {
  return (
    <div className='mt-4 flex items-center justify-between text-sm text-gray-500'>
      <div>
        عرض {storeTypes.length} من إجمالي {storeTypes.length} نوع متجر
      </div>
      <div className='flex items-center gap-4'>
        <span>نشط: {storeTypes.filter((s) => s.isActive).length}</span>
        <span>غير نشط: {storeTypes.filter((s) => !s.isActive).length}</span>
      </div>
    </div>
  );
};

export default ExtraInfo;
