import { CircleChevronRight, Power } from 'lucide-react';
import { sidebarItems } from '../data/sidebar';
import { Button } from './ui/button';

type SidebarProps = {
  isVisible: boolean;
  onToggle: () => void;
};

const Sidebar = ({ isVisible, onToggle }: SidebarProps) => {
  return (
    <div
      className={`transition-all duration-300 ${
        isVisible ? 'w-20' : 'w-0 overflow-hidden'
      } bg-yellow-600 flex flex-col items-center py-5 space-y-5`}
    >
      <Button
        variant='secondary'
        type='button'
        onClick={onToggle}
        className='bg-transparent flex items-center justify-center cursor-pointer'
      >
        <CircleChevronRight
          className='text-zinc-700 font-bold transition-transform duration-300'
          size={20}
        />
      </Button>

      {isVisible &&
        sidebarItems.map((item, index) => (
          <Button
            key={index}
            variant='link'
            type='button'
            className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${
              item.active
                ? 'bg-white text-yellow-400'
                : 'text-white hover:bg-yellow-300'
            }`}
            title={item.label}
          >
            <item.icon size={20} />
          </Button>
        ))}

      <div className='flex-1' />

      {isVisible && (
        <button className='w-12 h-12 rounded-lg flex items-center justify-center text-white hover:bg-yellow-300 transition-colors'>
          <Power size={20} />
        </button>
      )}
    </div>
  );
};

export default Sidebar;
