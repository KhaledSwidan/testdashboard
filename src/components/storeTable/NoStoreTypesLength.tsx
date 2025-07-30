import { ShoppingCart } from 'lucide-react';

const NoStoreTypesLength = () => {
  return (
    <div className='bg-white rounded-lg shadow-sm p-6'>
      <h2 className='text-lg font-semibold text-gray-800 mb-4'>
        أنواع المتاجر (0)
      </h2>
      <div className='text-center py-12'>
        <div className='text-gray-400 mb-4'>
          <ShoppingCart size={48} className='mx-auto' />
        </div>
        <p className='text-gray-500 text-lg'>لا توجد أنواع متاجر متاحة</p>
        <p className='text-gray-400 text-sm mt-2'>
          يمكنك إضافة نوع متجر جديد من خلال الضغط على زر "إضافة نوع متجر جديد"
        </p>
      </div>
    </div>
  );
};

export default NoStoreTypesLength;
