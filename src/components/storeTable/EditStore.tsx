import { Edit, X, Upload } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import { useState, useEffect } from 'react';
import type { StoreType } from '../../types/store';
import { useStoreTypes } from '../../store/useStoreTypes';
import { getImageUrl } from '../../services/api';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Input } from '../ui/input';

interface EditStoreProps {
  storeType: StoreType;
  trigger?: React.ReactNode;
}

const EditStore: React.FC<EditStoreProps> = ({ storeType, trigger }) => {
  const { updateStoreType } = useStoreTypes();

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');

  const [formData, setFormData] = useState({
    id: storeType.id,
    nameAr: storeType.nameAr,
    nameEn: storeType.nameEn,
    icon_path: storeType.icon_path || '',
    isActive: storeType.isActive,
  });

  // تحديث البيانات عند تغيير storeType
  useEffect(() => {
    setFormData({
      id: storeType.id,
      nameAr: storeType.nameAr,
      nameEn: storeType.nameEn,
      icon_path: storeType.icon_path || '',
      isActive: storeType.isActive,
    });
    setPreviewUrl(getImageUrl(storeType.icon_path));
  }, [storeType]);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // التحقق من نوع الملف
      if (!file.type.startsWith('image/')) {
        alert('يرجى اختيار ملف صورة');
        return;
      }

      // التحقق من حجم الملف (5MB حد أقصى)
      if (file.size > 5 * 1024 * 1024) {
        alert('حجم الصورة كبير جداً. الحد الأقصى 5MB');
        return;
      }

      setSelectedFile(file);

      // إنشاء معاينة للصورة الجديدة
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setPreviewUrl(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // التحقق من البيانات المطلوبة
    if (!formData.nameAr.trim() || !formData.nameEn.trim()) {
      alert('يرجى ملء الحقول المطلوبة');
      return;
    }

    setIsSubmitting(true);

    try {
      const updateData = {
        ...formData,
        nameAr: formData.nameAr.trim(),
        nameEn: formData.nameEn.trim(),
        ...(selectedFile ? { selectedFile } : {}),
      };

      await updateStoreType(updateData as StoreType & { selectedFile?: File });
      setIsDialogOpen(false);
      setSelectedFile(null);
    } catch (error) {
      console.error('خطأ في تعديل المتجر:', error);
      alert('حدث خطأ في تعديل المتجر');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      id: storeType.id,
      nameAr: storeType.nameAr,
      nameEn: storeType.nameEn,
      icon_path: storeType.icon_path || '',
      isActive: storeType.isActive,
    });
    setSelectedFile(null);
    setPreviewUrl(getImageUrl(storeType.icon_path));
  };

  const handleDialogOpenChange = (open: boolean) => {
    setIsDialogOpen(open);
    if (!open) {
      resetForm();
    }
  };

  // مُشغل افتراضي إذا لم يتم تمرير trigger مخصص
  const defaultTrigger = (
    <Button
      variant='outline'
      size='sm'
      className='bg-yellow-50 text-yellow-700 border-yellow-200 hover:bg-yellow-100 flex items-center gap-1'
    >
      <Edit size={14} />
      تعديل
    </Button>
  );

  return (
    <Dialog.Root open={isDialogOpen} onOpenChange={handleDialogOpenChange}>
      <Dialog.Trigger asChild>{trigger || defaultTrigger}</Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className='fixed inset-0 bg-black/50 z-50' />
        <Dialog.Content className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl p-6 w-full max-w-md z-50 max-h-[90vh] overflow-y-auto'>
          <div className='flex items-center justify-between mb-4'>
            <Dialog.Title className='text-lg font-semibold text-gray-900'>
              تعديل نوع المتجر
            </Dialog.Title>
            <Dialog.Close asChild>
              <button className='text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100'>
                <X size={20} />
              </button>
            </Dialog.Close>
          </div>

          <Dialog.Description className='text-sm text-gray-500 mb-4'>
            تعديل تفاصيل نوع المتجر: {storeType.nameAr}
          </Dialog.Description>

          <form onSubmit={handleSubmit} className='space-y-4'>
            {/* معاينة الصورة الحالية */}
            {previewUrl && (
              <div className='flex justify-center mb-4'>
                <div className='relative'>
                  <img
                    src={previewUrl}
                    alt='معاينة الصورة'
                    className='w-20 h-20 object-cover rounded-lg border-2 border-gray-200'
                    onError={(e) => {
                      e.currentTarget.src = '/placeholderUser.png';
                    }}
                  />
                  {selectedFile && (
                    <div className='absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-1'>
                      <Upload size={12} />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* الاسم العربي */}
            <div>
              <Label className='block text-sm font-medium text-gray-700 mb-1 text-right'>
                اسم نوع المتجر (عربي) *
              </Label>
              <Input
                type='text'
                value={formData.nameAr}
                onChange={(e: { target: { value: string | boolean } }) =>
                  handleInputChange('nameAr', e.target.value)
                }
                className='w-full px-3 py-2 border border-gray-300 rounded-md text-right focus:outline-none focus:ring-2 focus:ring-blue-500'
                placeholder='مثال: مطاعم سريعة'
                required
                disabled={isSubmitting}
              />
            </div>

            {/* الاسم الإنجليزي */}
            <div>
              <Label className='block text-sm font-medium text-gray-700 mb-1 text-right'>
                اسم نوع المتجر (إنجليزي) *
              </Label>
              <Input
                type='text'
                value={formData.nameEn}
                onChange={(e: { target: { value: string | boolean } }) =>
                  handleInputChange('nameEn', e.target.value)
                }
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                placeholder='fast-food'
                required
                disabled={isSubmitting}
              />
            </div>

            {/* الصورة */}
            <div>
              <Label className='block text-sm font-medium text-gray-700 mb-1 text-right'>
                تغيير صورة نوع المتجر
              </Label>
              <Input
                type='file'
                accept='image/*'
                onChange={handleFileChange}
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                disabled={isSubmitting}
              />
              {selectedFile && (
                <p className='text-xs text-green-600 mt-1 text-right'>
                  سيتم تحديث الصورة: {selectedFile.name}
                </p>
              )}
              <p className='text-xs text-gray-400 mt-1 text-right'>
                اتركه فارغاً للاحتفاظ بالصورة الحالية
              </p>
            </div>

            {/* معلومات الصورة الحالية */}
            {storeType.icon_path && !selectedFile && (
              <div className='text-xs text-gray-500 bg-gray-50 p-2 rounded text-right'>
                الصورة الحالية: {storeType.icon_path}
              </div>
            )}

            {/* حالة التفعيل */}
            <div className='flex items-center justify-between'>
              <Label className='text-sm font-medium text-gray-700'>
                متجر نشط
              </Label>
              <input
                type='checkbox'
                checked={formData.isActive}
                onChange={(e) =>
                  handleInputChange('isActive', e.target.checked)
                }
                className='w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500'
                disabled={isSubmitting}
              />
            </div>

            {/* معرف المتجر (للمرجع فقط) */}
            <div className='text-xs text-gray-400 bg-gray-50 p-2 rounded text-right'>
              معرف المتجر: #{storeType.id}
            </div>

            {/* الأزرار */}
            <div className='flex gap-3 pt-4'>
              <Button
                type='submit'
                disabled={isSubmitting}
                className='flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 font-medium disabled:opacity-50'
              >
                {isSubmitting ? 'جاري التحديث...' : 'حفظ التغييرات'}
              </Button>
              <Button
                type='button'
                disabled={isSubmitting}
                onClick={() => setIsDialogOpen(false)}
                className='px-4 bg-gray-100 text-gray-700 py-2 rounded-md hover:bg-gray-200 font-medium'
              >
                إلغاء
              </Button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default EditStore;
