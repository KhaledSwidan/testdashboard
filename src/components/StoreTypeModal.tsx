// src/components/StoreTypeModal.tsx

import { useState, useEffect } from 'react';
import { X, Upload, Image as ImageIcon } from 'lucide-react';
import type {
  StoreType,
  CreateStoreTypeRequest,
  UpdateStoreTypeRequest,
} from '../types/store';

interface StoreTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    data: CreateStoreTypeRequest | UpdateStoreTypeRequest
  ) => Promise<void>;
  storeType?: StoreType | null;
  mode: 'create' | 'edit';
}

const StoreTypeModal = ({
  isOpen,
  onClose,
  onSubmit,
  storeType,
  mode,
}: StoreTypeModalProps) => {
  const [formData, setFormData] = useState({
    nameAr: '',
    nameEn: '',
    iconPath: '',
    isActive: true,
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isOpen) {
      if (mode === 'edit' && storeType) {
        setFormData({
          nameAr: storeType.nameAr || '',
          nameEn: storeType.nameEn || '',
          iconPath: storeType.iconPath || storeType.image || '',
          isActive: storeType.isActive,
        });
      } else {
        setFormData({
          nameAr: '',
          nameEn: '',
          iconPath: '',
          isActive: true,
        });
      }
      setErrors({});
    }
  }, [isOpen, mode, storeType]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.nameAr.trim()) {
      newErrors.nameAr = 'الاسم العربي مطلوب';
    }

    if (!formData.nameEn.trim()) {
      newErrors.nameEn = 'الاسم الإنجليزي مطلوب';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      const submitData =
        mode === 'edit' && storeType
          ? { id: storeType.id, ...formData }
          : formData;

      await onSubmit(submitData);
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'
      dir='rtl'
    >
      <div className='bg-white rounded-lg w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto'>
        {/* Header */}
        <div className='flex items-center justify-between p-6 border-b'>
          <h2 className='text-xl font-bold text-gray-800'>
            {mode === 'create' ? 'إضافة نوع متجر جديد' : 'تعديل نوع المتجر'}
          </h2>
          <button
            onClick={onClose}
            className='text-gray-400 hover:text-gray-600 transition-colors'
            disabled={loading}
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className='p-6 space-y-4'>
          {/* الاسم العربي */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              الاسم العربي *
            </label>
            <input
              type='text'
              value={formData.nameAr}
              onChange={(e) => handleInputChange('nameAr', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
                errors.nameAr ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder='أدخل الاسم العربي'
              dir='rtl'
            />
            {errors.nameAr && (
              <p className='text-red-500 text-sm mt-1'>{errors.nameAr}</p>
            )}
          </div>

          {/* الاسم الإنجليزي */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              الاسم الإنجليزي *
            </label>
            <input
              type='text'
              value={formData.nameEn}
              onChange={(e) => handleInputChange('nameEn', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
                errors.nameEn ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder='Enter English name'
              dir='ltr'
            />
            {errors.nameEn && (
              <p className='text-red-500 text-sm mt-1'>{errors.nameEn}</p>
            )}
          </div>

          {/* رابط الأيقونة */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              رابط الأيقونة
            </label>
            <div className='relative'>
              <input
                type='url'
                value={formData.iconPath}
                onChange={(e) => handleInputChange('iconPath', e.target.value)}
                className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 pr-10'
                placeholder='https://example.com/icon.png'
                dir='ltr'
              />
              <Upload
                className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400'
                size={16}
              />
            </div>
            {formData.iconPath && (
              <div className='mt-2 flex items-center gap-2'>
                <div className='w-8 h-8 border rounded overflow-hidden bg-gray-50 flex items-center justify-center'>
                  {formData.iconPath ? (
                    <img
                      src={formData.iconPath}
                      alt='Preview'
                      className='w-full h-full object-cover'
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const sibling = e.currentTarget
                          .nextElementSibling as HTMLElement | null;
                        if (sibling) sibling.style.display = 'block';
                      }}
                    />
                  ) : (
                    <ImageIcon size={16} className='text-gray-400' />
                  )}
                  <ImageIcon
                    size={16}
                    className='text-gray-400'
                    style={{ display: 'none' }}
                  />
                </div>
                <span className='text-sm text-gray-500'>معاينة الأيقونة</span>
              </div>
            )}
          </div>

          {/* حالة التفعيل */}
          <div className='flex items-center justify-between'>
            <label className='text-sm font-medium text-gray-700'>
              حالة التفعيل
            </label>
            <label className='flex items-center cursor-pointer'>
              <input
                type='checkbox'
                checked={formData.isActive}
                onChange={(e) =>
                  handleInputChange('isActive', e.target.checked)
                }
                className='sr-only'
              />
              <div
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  formData.isActive ? 'bg-green-400' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    formData.isActive ? 'translate-x-1' : 'translate-x-7'
                  }`}
                />
              </div>
              <span
                className={`mr-2 text-sm ${
                  formData.isActive ? 'text-green-600' : 'text-gray-500'
                }`}
              >
                {formData.isActive ? 'نشط' : 'غير نشط'}
              </span>
            </label>
          </div>

          {/* Buttons */}
          <div className='flex gap-3 pt-4'>
            <button
              type='submit'
              disabled={loading}
              className='flex-1 bg-yellow-400 text-white py-2 px-4 rounded-lg hover:bg-yellow-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {loading
                ? 'جاري الحفظ...'
                : mode === 'create'
                ? 'إضافة'
                : 'تحديث'}
            </button>
            <button
              type='button'
              onClick={onClose}
              disabled={loading}
              className='flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors disabled:opacity-50'
            >
              إلغاء
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StoreTypeModal;
