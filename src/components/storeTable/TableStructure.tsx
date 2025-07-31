// src/components/storeTable/TableStructure.tsx

import { Edit, Eye, MoreHorizontal, Trash2 } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import type { StoreType } from '../../types/store';
import { useStoreTypes } from '../../store/useStoreTypes';
import { getImageUrl } from '../../services/api';
import EditStore from './EditStore';

interface StoreTypesTableProps {
  storeTypes: StoreType[];
}

const TableStructure = ({ storeTypes }: StoreTypesTableProps) => {
  const { removeStoreType } = useStoreTypes();

  const handleDeleteStore = async (storeType: StoreType) => {
    if (confirm(`هل أنت متأكد من حذف "${storeType.nameAr}"؟`)) {
      try {
        await removeStoreType(storeType.id);
      } catch (error) {
        console.error('حدث خطأ أثناء الحذف:', error);
        alert('حدث خطأ أثناء الحذف');
      }
    }
  };

  const handleViewDetails = (storeType: StoreType) => {
    // يمكنك إضافة modal للعرض أو التوجه لصفحة التفاصيل
    console.log('عرض تفاصيل المتجر:', storeType);
    alert(
      `تفاصيل المتجر:\nالاسم: ${storeType.nameAr}\nالحالة: ${
        storeType.isActive ? 'نشط' : 'غير نشط'
      }`
    );
  };

  return (
    <Table>
      <TableCaption>
        جدول يعرض جميع أنواع المتاجر المتاحة في النظام ({storeTypes.length} نوع
        متجر)
      </TableCaption>
      <TableHeader className='bg-yellow-200'>
        <TableRow>
          <TableHead className='text-right'>الاسم بالعربية</TableHead>
          <TableHead className='text-right'>الاسم بالإنجليزية</TableHead>
          <TableHead className='text-center'>الحالة</TableHead>
          <TableHead className='text-center'>الصورة</TableHead>
          <TableHead className='text-center w-12'>الإجراءات</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {storeTypes.length === 0 ? (
          <TableRow>
            <TableCell colSpan={5} className='text-center py-8 text-gray-500'>
              لا توجد أنواع متاجر حالياً
            </TableCell>
          </TableRow>
        ) : (
          storeTypes.map((storeType, idx) => (
            <TableRow key={storeType.id ?? idx} className='hover:bg-gray-50'>
              <TableCell className='font-medium text-right'>
                {storeType.nameAr}
              </TableCell>

              <TableCell className='text-right text-gray-600'>
                {storeType.nameEn || '-'}
              </TableCell>

              <TableCell className='text-center'>
                <Badge
                  variant={storeType.isActive ? 'default' : 'secondary'}
                  className={`
                    ${
                      storeType.isActive
                        ? 'bg-green-100 text-green-800 hover:bg-green-200'
                        : 'bg-red-100 text-red-800 hover:bg-red-200'
                    }
                  `}
                >
                  {storeType.isActive ? 'نشط' : 'غير نشط'}
                </Badge>
              </TableCell>

              <TableCell className='text-center'>
                <div className='flex justify-center'>
                  {storeType.icon_path ? (
                    <img
                      src={
                        `${storeType.icon_path}` ||
                        getImageUrl(storeType.icon_path)
                      }
                      alt={storeType.nameAr}
                      className='w-10 h-10 rounded-lg object-cover border shadow-sm'
                      onError={(e) => {
                        e.currentTarget.src = '/placeholderUser.png';
                      }}
                    />
                  ) : (
                    <div className='w-10 h-10 rounded-lg border bg-gray-100 flex items-center justify-center shadow-sm'>
                      <span className='text-xs text-gray-500'>لا توجد</span>
                    </div>
                  )}
                </div>
              </TableCell>

              <TableCell className='text-center'>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant='ghost'
                      className='h-8 w-8 p-0 hover:bg-gray-100'
                    >
                      <span className='sr-only'>فتح القائمة</span>
                      <MoreHorizontal className='h-4 w-4' />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align='center' className='w-48'>
                    <DropdownMenuLabel className='text-right'>
                      الإجراءات
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                      onClick={() => handleViewDetails(storeType)}
                      className='cursor-pointer text-right flex-row-reverse'
                    >
                      <Eye className='mr-2 h-4 w-4' />
                      عرض التفاصيل
                    </DropdownMenuItem>

                    {/* استخدام EditStore كمكون منفصل */}
                    <div className='flex justify-end'>
                      {' '}
                      <EditStore
                        storeType={storeType}
                        trigger={
                          <DropdownMenuItem
                            onSelect={(e) => e.preventDefault()}
                            className='cursor-pointer text-right flex-row-reverse'
                          >
                            <Edit className='mr-2 h-4 w-4' />
                            تعديل
                          </DropdownMenuItem>
                        }
                      />
                    </div>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                      onClick={() => handleDeleteStore(storeType)}
                      className='cursor-pointer text-red-600 focus:text-red-600 text-right flex-row-reverse'
                    >
                      <Trash2 className='mr-2 h-4 w-4' />
                      حذف
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default TableStructure;
