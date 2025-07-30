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
import { Input } from '../ui/input';
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

interface StoreTypesTableProps {
  storeTypes: StoreType[];
  selectedRows: string[];
  handleSelectAll: () => void;
  handleSelectRow: (id: string) => void;
}

const TableStructure = ({
  storeTypes,
  selectedRows,
  handleSelectAll,
  handleSelectRow,
}: StoreTypesTableProps) => {
  const { removeStoreType, updateStoreType } = useStoreTypes();

  const handleEditStore = async (storeType: StoreType) => {
    try {
      await updateStoreType({ ...storeType, selectedFile: undefined });
    } catch (error) {
      console.error('حدث خطأ أثناء تعديل نوع المتجر:', error);
    }
  };
  const handleDeleteStore = async (storeType: StoreType) => {
    if (confirm(`هل أنت متأكد من حذف "${storeType.nameAr}"؟`)) {
      try {
        await removeStoreType(storeType.id);
      } catch (error) {
        console.error('حدث خطأ أثناء الحذف:', error);
      }
    }
  };

  return (
    <Table>
      <TableCaption>
        جدول يعرض جميع أنواع المتاجر المتاحة في النظام
      </TableCaption>
      <TableHeader className='bg-yellow-200'>
        <TableRow>
          <TableHead className='w-8 text-right'>
            <Input
              type='checkbox'
              checked={selectedRows.length === storeTypes.length}
              onChange={handleSelectAll}
              className='rounded border-gray-300'
            />
          </TableHead>
          <TableHead className='text-right'>الاسم بالعربية</TableHead>
          <TableHead className='text-right'>الاسم بالإنجليزية</TableHead>
          <TableHead className='text-center'>الحالة</TableHead>
          <TableHead className='text-right'>الصورة</TableHead>
          <TableHead className='text-center w-12'>الإجراءات</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {storeTypes.map((storeType, idx) => (
          <TableRow
            key={storeType.id ?? idx}
            className={`hover:bg-gray-50 ${
              selectedRows.includes(String(storeType.id)) ? 'bg-blue-50' : ''
            }`}
          >
            <TableCell>
              <Input
                type='checkbox'
                checked={selectedRows.includes(String(storeType.id))}
                onChange={() => handleSelectRow(String(storeType.id))}
                className='rounded border-gray-300'
              />
            </TableCell>

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

            <TableCell className='inline-block text-right text-gray-600 max-w-xs'>
              <div className='flex justify-end'>
                <img
                  src={getImageUrl(storeType.icon_path)}
                  alt={storeType.nameAr}
                  className='w-8 h-8 rounded object-cover border'
                />
              </div>
            </TableCell>

            <TableCell className='text-right'>
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
                  <DropdownMenuLabel>الإجراءات</DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    onClick={() => console.log('عرض التفاصيل', storeType)}
                    className='cursor-pointer text-end'
                  >
                    <Eye className='ml-2 h-4 w-4' />
                    عرض التفاصيل
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={() => handleEditStore(storeType)}
                    className='cursor-pointer text-end'
                  >
                    <Edit className='ml-2 h-4 w-4' />
                    تعديل
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    onClick={() => handleDeleteStore(storeType)}
                    className='cursor-pointer text-red-600 focus:text-red-600'
                  >
                    <Trash2 className='ml-2 h-4 w-4' />
                    حذف
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableStructure;
