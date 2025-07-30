import { CheckCircle } from 'lucide-react';

interface SuccessAfterFallbackProps {
  error: string | null;
  wasFallbackUsed: boolean;
}

const SuccessAfterFallback = ({
  error,
  wasFallbackUsed,
}: SuccessAfterFallbackProps) => {
  return (
    <>
      {' '}
      {!error && wasFallbackUsed === false && (
        <div className='mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-2'>
          <CheckCircle className='text-green-500' size={20} />
          <p className='text-green-700 text-sm'>
            ✅ تم تحميل البيانات الأصلية بنجاح بعد عرض بيانات بديلة.
          </p>
        </div>
      )}
    </>
  );
};

export default SuccessAfterFallback;
