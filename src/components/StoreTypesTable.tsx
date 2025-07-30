import { useState } from 'react';
import { ShoppingCart, Edit, Trash2, MoreHorizontal, Eye } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

// نوع البيانات
interface StoreType {
  id: string;
  nameAr: string;
  nameEn?: string;
  isActive: boolean;
  description?: string;
  createdAt?: string;
}

interface StoreTypesTableProps {
  storeTypes: StoreType[];
  onEdit?: (storeType: StoreType) => void;
  onDelete?: (storeType: StoreType) => void;
  onView?: (storeType: StoreType) => void;
}

const StoreTypesTable = ({
  storeTypes,
  onEdit,
  onDelete,
  onView,
}: StoreTypesTableProps) => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const handleSelectRow = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    setSelectedRows(
      selectedRows.length === storeTypes.length
        ? []
        : storeTypes.map((store) => store.id)
    );
  };

  if (storeTypes.length === 0) {
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
  }

  return (
    <div className='bg-white rounded-lg shadow-sm p-6'>
      <div className='flex items-center justify-between mb-6'>
        <h2 className='text-lg font-semibold text-gray-800'>
          أنواع المتاجر ({storeTypes.length})
        </h2>
        {selectedRows.length > 0 && (
          <div className='flex items-center gap-2'>
            <span className='text-sm text-gray-600'>
              تم تحديد {selectedRows.length} عنصر
            </span>
            <Button
              variant='destructive'
              size='sm'
              onClick={() => {
                // حذف العناصر المحددة
                console.log('Delete selected:', selectedRows);
                setSelectedRows([]);
              }}
            >
              <Trash2 size={16} className='ml-2' />
              حذف المحدد
            </Button>
          </div>
        )}
      </div>

      <div className='rounded-md border'>
        <Table>
          <TableCaption>
            جدول يعرض جميع أنواع المتاجر المتاحة في النظام
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className='w-12'>
                <input
                  type='checkbox'
                  checked={selectedRows.length === storeTypes.length}
                  onChange={handleSelectAll}
                  className='rounded border-gray-300'
                />
              </TableHead>
              <TableHead className='text-right'>الاسم بالعربية</TableHead>
              <TableHead className='text-right'>الاسم بالإنجليزية</TableHead>
              <TableHead className='text-center'>الحالة</TableHead>
              <TableHead className='text-right'>الوصف</TableHead>
              <TableHead className='text-center'>تاريخ الإنشاء</TableHead>
              <TableHead className='text-center w-12'>الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {storeTypes.map((storeType) => (
              <TableRow
                key={storeType.id}
                className={`hover:bg-gray-50 ${
                  selectedRows.includes(storeType.id) ? 'bg-blue-50' : ''
                }`}
              >
                <TableCell>
                  <input
                    type='checkbox'
                    checked={selectedRows.includes(storeType.id)}
                    onChange={() => handleSelectRow(storeType.id)}
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

                <TableCell className='text-right text-gray-600 max-w-xs'>
                  <div className='truncate' title={storeType.description}>
                    {storeType.description || '-'}
                  </div>
                </TableCell>

                <TableCell className='text-center text-gray-500'>
                  {storeType.createdAt
                    ? new Date(storeType.createdAt).toLocaleDateString(
                        'ar-EG',
                        {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        }
                      )
                    : '-'}
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
                    <DropdownMenuContent align='end' className='w-48'>
                      <DropdownMenuLabel>الإجراءات</DropdownMenuLabel>
                      <DropdownMenuSeparator />

                      <DropdownMenuItem
                        onClick={() => onView?.(storeType)}
                        className='cursor-pointer'
                      >
                        <Eye className='ml-2 h-4 w-4' />
                        عرض التفاصيل
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        onClick={() => onEdit?.(storeType)}
                        className='cursor-pointer'
                      >
                        <Edit className='ml-2 h-4 w-4' />
                        تعديل
                      </DropdownMenuItem>

                      <DropdownMenuSeparator />

                      <DropdownMenuItem
                        onClick={() => onDelete?.(storeType)}
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
      </div>

      {/* معلومات إضافية */}
      <div className='mt-4 flex items-center justify-between text-sm text-gray-500'>
        <div>
          عرض {storeTypes.length} من إجمالي {storeTypes.length} نوع متجر
        </div>
        <div className='flex items-center gap-4'>
          <span>نشط: {storeTypes.filter((s) => s.isActive).length}</span>
          <span>غير نشط: {storeTypes.filter((s) => !s.isActive).length}</span>
        </div>
      </div>
    </div>
  );
};

export default StoreTypesTable;
