const Loader = () => {
  return (
    <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
      <div className='text-center'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4'></div>
        <p className='text-gray-600'>جاري تحميل أنواع المتاجر...</p>
      </div>
    </div>
  );
};

export default Loader;
