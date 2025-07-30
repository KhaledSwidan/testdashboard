// src/components/AddNewShop.tsx

import { Plus, X } from 'lucide-react';
import { Button } from './ui/button';
import * as Dialog from '@radix-ui/react-dialog';
import { useState } from 'react';
import { Label } from './ui/label';
import { Input } from './ui/input';
import type { StoreType } from '../types/store';
import { useStoreTypes } from '../store/useStoreTypes';

const generateId = () => Date.now() + Math.random();

const AddNewShop = () => {
  const { addStoreType } = useStoreTypes();

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [formData, setFormData] = useState<StoreType>({
    id: generateId(),
    nameAr: '',
    nameEn: '',
    icon_path: '',
    isActive: true,
  });

  const handleInputChange = (
    field: keyof StoreType,
    value: string | boolean
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('يرجى اختيار ملف صورة');
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nameAr || !formData.nameEn) {
      alert('يرجى ملء الحقول المطلوبة');
      return;
    }

    setIsSubmitting(true);

    try {
      const newStoreType = {
        ...formData,
        id: generateId(),
        ...(selectedFile ? { selectedFile } : {}),
      };

      await addStoreType(newStoreType);
      resetForm();
      setIsDialogOpen(false);
    } catch (error) {
      console.error('خطأ في إضافة المتجر:', error);
      alert('حدث خطأ في إضافة المتجر');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      id: generateId(),
      nameAr: '',
      nameEn: '',
      icon_path: '',
      isActive: true,
    });
    setSelectedFile(null);
  };

  return (
    <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <Dialog.Trigger asChild>
        <Button className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2'>
          <Plus size={16} />
          إضافة نوع متجر جديد
        </Button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className='fixed inset-0 bg-black/50 z-50' />
        <Dialog.Content className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl p-6 w-full max-w-md z-50'>
          <div className='flex items-center justify-between mb-4'>
            <Dialog.Title className='text-lg font-semibold text-gray-900'>
              إضافة نوع متجر جديد
            </Dialog.Title>
            <Dialog.Close asChild>
              <button className='text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100'>
                <X size={20} />
              </button>
            </Dialog.Close>
          </div>

          <Dialog.Description className='text-sm text-gray-500 mb-4'>
            أدخل تفاصيل نوع المتجر الجديد
          </Dialog.Description>

          <form onSubmit={handleSubmit} className='space-y-4'>
            {/* الاسم العربي */}
            <div>
              <Label className='block text-sm font-medium text-gray-700 mb-1 text-right'>
                اسم نوع المتجر (عربي) *
              </Label>
              <Input
                type='text'
                value={formData.nameAr}
                onChange={(e) => handleInputChange('nameAr', e.target.value)}
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
                onChange={(e) => handleInputChange('nameEn', e.target.value)}
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                placeholder='fast-food'
                required
                disabled={isSubmitting}
              />
            </div>

            {/* الصورة */}
            <div>
              <Label className='block text-sm font-medium text-gray-700 mb-1 text-right'>
                صورة نوع المتجر
              </Label>
              <Input
                type='file'
                accept='image/*'
                onChange={handleFileChange}
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                disabled={isSubmitting}
              />
              {selectedFile && (
                <p className='text-xs text-gray-500 mt-1 text-right'>
                  تم اختيار: {selectedFile.name}
                </p>
              )}
            </div>

            {/* حالة التفعيل */}
            <div className='flex items-center justify-between'>
              <Label className='text-sm font-medium text-gray-700'>
                متجر نشط
              </Label>
              <Input
                type='checkbox'
                checked={formData.isActive}
                onChange={(e) =>
                  handleInputChange('isActive', e.target.checked)
                }
                className='w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500'
                disabled={isSubmitting}
              />
            </div>

            {/* الأزرار */}
            <div className='flex gap-3 pt-4'>
              <Button
                type='submit'
                disabled={isSubmitting}
                className='flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 font-medium disabled:opacity-50'
              >
                {isSubmitting ? 'جاري الإضافة...' : 'إضافة المتجر'}
              </Button>
              <Button
                type='button'
                disabled={isSubmitting}
                onClick={() => {
                  resetForm();
                  setIsDialogOpen(false);
                }}
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

export default AddNewShop;
