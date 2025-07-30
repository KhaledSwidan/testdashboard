import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorMessageProps {
  error: string | null;
  handleRetry: () => void;
}

const ErrorMessage = ({ error, handleRetry }: ErrorMessageProps) => {
  return (
    <>
      {' '}
      {error && (
        <div className='mb-6 bg-red-50 border border-red-200 rounded-lg p-4'>
          <div className='flex items-start gap-3'>
            <AlertCircle className='text-red-500 mt-0.5' size={20} />
            <div className='flex-1'>
              <p className='text-red-700 font-medium'>خطأ في تحميل البيانات</p>
              <p className='text-red-600 text-sm mt-1'>{error}</p>
              <p className='text-red-500 text-xs mt-1'>
                يتم عرض بيانات تجريبية مؤقتاً
              </p>
            </div>
            <button
              onClick={handleRetry}
              className='bg-red-100 text-red-700 px-3 py-2 rounded text-sm hover:bg-red-200 transition-colors flex items-center gap-1'
            >
              <RefreshCw size={14} />
              إعادة المحاولة
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ErrorMessage;
