import { Search, User } from 'lucide-react';
import { navItems } from '../data/controls';
import AddNewShop from './AddNewShop';
import { Input } from './ui/input';
import { Button } from './ui/button';

const Controls = () => {
  return (
    <div className='bg-white rounded-lg shadow-sm mb-6 p-6'>
      {/* Header */}
      <div className='flex items-center justify-between mb-6'>
        <div className='flex items-center gap-6'>
          {/* Brand */}
          <div className='bg-blue-100 px-4 py-2 rounded-lg text-blue-600 text-sm font-bold'>
            FOODERA
          </div>

          {/* Navigation */}
          <nav>
            <ul className='flex items-center gap-4'>
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.nameEn}>
                    <a
                      href={`/${item.nameEn}`}
                      className='flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors hover:bg-gray-100 hover:text-blue-600 text-gray-700'
                    >
                      <Icon size={16} />
                      <span>{item.name}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        {/* User Button */}
        <Button className='w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center hover:bg-yellow-500 transition-colors'>
          <User size={16} className='text-white' />
        </Button>
      </div>

      {/* Search */}
      <div className='relative mb-6'>
        <Input
          type='text'
          placeholder='بحث في أنواع المتاجر...'
          className='
            w-full bg-yellow-50 border border-yellow-200 rounded-lg 
            px-4 py-3 pr-12 pl-10 text-right placeholder-gray-500
            focus:outline-none focus:ring-2 focus:ring-yellow-400
            hover:bg-yellow-100
          '
        />
        <Search
          className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400'
          size={20}
        />
      </div>

      {/* Buttons */}
      <div className='flex gap-3'>
        <AddNewShop />
      </div>
    </div>
  );
};

export default Controls;
