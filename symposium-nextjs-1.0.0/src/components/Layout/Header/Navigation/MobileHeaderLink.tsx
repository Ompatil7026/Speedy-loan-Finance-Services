import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { HeaderItem } from '../../../../types/menu';

interface Props {
  item: HeaderItem;
  onNavigate?: () => void;
}

const MobileHeaderLink: React.FC<Props> = ({ item, onNavigate }) => {
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const router = useRouter();
  const path = usePathname();

  const handleToggle = () => {
    setSubmenuOpen((prev) => !prev);
  };

  const handleNavigate = () => {
    setSubmenuOpen(false);
    onNavigate?.();          // ✅ CLOSE MOBILE MENU
    router.push(item.href);
  };

  return (
    <div className="relative w-full">
      <button
        type="button"
        onClick={item.submenu ? handleToggle : handleNavigate}
        className={`flex items-center justify-between w-full py-2 text-black dark:text-white focus:outline-none ${
          path === item.href ? '!text-primary' : ''
        } ${
          path.startsWith(`/${item.label.toLowerCase()}`) ? '!text-primary' : ''
        }`}
      >
        {item.label}
        {item.submenu && (
          <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 15 15">
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1"
              d="m7 10l5 5l5-5"
            />
          </svg>
        )}
      </button>

      {submenuOpen && item.submenu && (
        <div className="bg-white p-2 w-full">
          {item.submenu.map((subItem, index) => (
            <Link
              key={index}
              href={subItem.href}
              onClick={() => {
                setSubmenuOpen(false);
                onNavigate?.();        // ✅ CLOSE MOBILE MENU
              }}
              className="block py-2 text-gray-500 hover:bg-gray-200"
            >
              {subItem.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default MobileHeaderLink;

