// Sidebar toggle
import { useState } from 'react';
import Sidebar from './Sidebar';
import CircleChevronLeftBtn from './CircleChevronLeftBtn';

const SidebarOrToggle = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const toggleSidebar = () => setSidebarVisible((prev) => !prev);
  return sidebarVisible ? (
    <Sidebar isVisible={sidebarVisible} onToggle={toggleSidebar} />
  ) : (
    <CircleChevronLeftBtn toggleSidebar={toggleSidebar} />
  );
};

export default SidebarOrToggle;
