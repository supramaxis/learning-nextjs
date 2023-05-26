import { useState } from 'react';

interface DropDownProps {
  id: number;
  onUrlDeleted: () => void;
}

const TailwindDropdown: React.FC<DropDownProps> = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='relative inline-block text-left'>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
        Options
        <svg
          className='-mr-1 ml-2 h-5 w-5'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 20 20'
          fill='currentColor'
          aria-hidden='true'>
          <path
            fillRule='evenodd'
            d='M10 12a2 2 0 100-4 2 2 0 000 4zm0 1a3 3 0 100-6 3 3 0 000 6zm-7-3a2 2 0 114 0 2 2 0 01-4 0zm1 0a1 1 0 100-2 1 1 0 000 2zm3 1a3 3 0 11-6 0 3 3 0 016 0zm7-3a2 2 0 100-4 2 2 0 000 4zm0 1a3 3 0 100-6 3 3 0 000 6zm7-3a2 2 0 11-4 0 2 2 0 014 0zm-1 0a1 1 0 100-2 1 1 0 000 2zm-3 1a3 3 0 116 0 3 3 0 01-6 0z'
            clipRule='evenodd'
          />
        </svg>
      </button>
      {isOpen && (
        <div className='origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5'>
          <div
            className='py-1'
            role='menu'
            aria-orientation='vertical'
            aria-labelledby='options-menu'>
            <button
              className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              role='menuitem'>
              Edit
            </button>
            <button
              className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              role='menuitem'>
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TailwindDropdown;

