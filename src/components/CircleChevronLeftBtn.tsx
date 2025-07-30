import { CircleChevronLeft } from 'lucide-react';
import { Button } from './ui/button';

const CircleChevronLeftBtn = ({
  toggleSidebar,
}: {
  toggleSidebar: () => void;
}) => {
  return (
    <Button
      variant='ghost'
      type='button'
      onClick={toggleSidebar}
      className='fixed top-4 -right-2 bg-transparent flex items-center justify-center cursor-pointer'
    >
      <CircleChevronLeft
        size={32}
        className='text-yellow-700 font-extrabold transition-transform duration-300 hover:scale-110'
      />
    </Button>
  );
};

export default CircleChevronLeftBtn;
