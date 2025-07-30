import type { StoreType } from "../types/store";

// Stats Component
const Stats = ({ storeTypes }: { storeTypes: StoreType[] }) => (
  <div className='mt-6 grid grid-cols-1 md:grid-cols-4 gap-4'>
    <StatCard title='إجمالي الأنواع' value={storeTypes.length} color='blue' />
    <StatCard
      title='نشط'
      value={storeTypes.filter((s) => s.isActive).length}
      color='green'
    />
    <StatCard
      title='غير نشط'
      value={storeTypes.filter((s) => !s.isActive).length}
      color='red'
    />
    <StatCard title='نتائج البحث' value={storeTypes.length} color='yellow' />
  </div>
);

const StatCard = ({
  title,
  value,
  color,
}: {
  title: string;
  value: number;
  color: string;
}) => (
  <div className='bg-white rounded-lg p-4 text-center shadow-sm'>
    <div className={`text-2xl font-bold text-${color}-600`}>{value}</div>
    <div className='text-sm text-gray-500'>{title}</div>
  </div>
);

export default Stats;