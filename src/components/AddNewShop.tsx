import { Plus, X } from 'lucide-react';
import { Button } from './ui/button';
import * as Dialog from '@radix-ui/react-dialog';
import { useState } from 'react';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface StoreFormData {
  id: number;
  nameAr: string;
  nameEn: string;
  description: string;
  category: string;
  isActive: boolean;
  createdAt: string;
}

const AddNewShop = () => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<StoreFormData>({
    id: Date.now(),
    nameAr: '',
    nameEn: '',
    description: '',
    category: '',
    isActive: true,
    createdAt: new Date().toISOString(),
  });

  const handleInputChange = (
    field: keyof StoreFormData,
    value: string | boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.nameAr && formData.nameEn) {
      setFormData({
        nameAr: '',
        nameEn: '',
        id: Date.now(),
        createdAt: new Date().toISOString(),
        description: '',
        category: '',
        isActive: true,
      });
      setIsDialogOpen(false);
    }
  };

  const resetForm = () => {
    setFormData({
      nameAr: '',
      nameEn: '',
      description: '',
      category: '',
      isActive: true,
      id: Date.now(),
      createdAt: new Date().toISOString(),
    });
  };
  return (
    <>
      {' '}
      <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <Dialog.Trigger asChild>
          <Button className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2'>
            <Plus size={16} />
            إضافة نوع متجر جديد
          </Button>
        </Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay className='fixed inset-0 bg-black/50 z-50' />
          <Dialog.Content
            className='
              fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
              bg-white rounded-lg shadow-xl p-6 w-full max-w-md z-50
            '
          >
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

            <form onSubmit={handleSubmit} className='space-y-4'>
              {/* اسم المتجر بالعربية */}
              <div>
                <Label
                  htmlFor='store-name'
                  className='block text-sm font-medium text-gray-700 mb-1 text-right'
                >
                  اسم نوع المتجر (عربي) *
                </Label>
                <Input
                  id='store-name'
                  type='text'
                  value={formData.nameAr}
                  onChange={(e) => handleInputChange('nameAr', e.target.value)}
                  className='
                      w-full px-3 py-2 border border-gray-300 rounded-md text-right
                      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                    '
                  placeholder='مثال: مطاعم سريعة'
                  required
                />
              </div>

              {/* اسم المتجر بالإنجليزية */}
              <div>
                <Label
                  htmlFor='store-name-en'
                  className='block text-sm font-medium text-gray-700 mb-1 text-right'
                >
                  اسم نوع المتجر (إنجليزي) *
                </Label>
                <Input
                  id='store-name-en'
                  type='text'
                  value={formData.nameEn}
                  onChange={(e) => handleInputChange('nameEn', e.target.value)}
                  className='
                      w-full px-3 py-2 border border-gray-300 rounded-md
                      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                    '
                  placeholder='fast-food'
                  required
                />
              </div>

              {/* الوصف */}
              <div>
                <Label
                  htmlFor='store-description'
                  className='block text-sm font-medium text-gray-700 mb-1 text-right'
                >
                  الوصف
                </Label>
                <Textarea
                  id='store-description'
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange('description', e.target.value)
                  }
                  rows={3}
                  className='
                      w-full px-3 py-2 border border-gray-300 rounded-md text-right
                      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                      resize-none
                    '
                  placeholder='وصف مختصر لنوع المتجر...'
                />
              </div>

              {/* الفئة */}
              <div className='text-right'>
                <Label
                  htmlFor='store-category'
                  className='block text-sm font-medium text-gray-700 mb-1'
                >
                  الفئة
                </Label>
                <Select
                  value={formData.category}
                  onValueChange={(e) => handleInputChange('category', e)}
                >
                  <SelectTrigger
                    id='store-category'
                    className='w-full text-right'
                  >
                    <SelectValue placeholder='اختر الفئة' />
                  </SelectTrigger>
                  <SelectContent dir='rtl'>
                    <SelectItem value='food'>طعام</SelectItem>
                    <SelectItem value='retail'>تجارة التجزئة</SelectItem>
                    <SelectItem value='services'>خدمات</SelectItem>
                    <SelectItem value='electronics'>إلكترونيات</SelectItem>
                    <SelectItem value='fashion'>أزياء</SelectItem>
                    <SelectItem value='health'>صحة وجمال</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* حالة التفعيل */}
              <div className='flex items-center justify-between'>
                <Label
                  htmlFor='store-active'
                  className='text-sm font-medium text-gray-700'
                >
                  متجر نشط
                </Label>
                <Input
                  id='store-active'
                  type='checkbox'
                  checked={formData.isActive}
                  onChange={(e) =>
                    handleInputChange('isActive', e.target.checked)
                  }
                  className='
                      w-4 h-4 text-blue-600 border-gray-300 rounded
                      focus:ring-blue-500 focus:ring-2
                    '
                />
              </div>

              {/* الأزرار */}
              <div className='flex gap-3 pt-4'>
                <Button
                  type='submit'
                  className='flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 font-medium'
                >
                  إضافة المتجر
                </Button>
                <Button
                  type='button'
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
    </>
  );
};

export default AddNewShop;
