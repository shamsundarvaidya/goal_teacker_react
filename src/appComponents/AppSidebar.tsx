import { useState } from 'react';
import { FaHome, FaBullseye , FaFileAlt , FaCog ,FaCalendarAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import  type { AppDispatch, RootState } from '../appStore/store.ts';
import {useNavigate, useMatchRoute  } from '@tanstack/react-router'

const NavButton = ({label,link, collapsed,children}) => {

  const button_style = "flex items-center gap-2 bg-transparent rounded py-2 px-4  transition duration-300 \
  ease-in-out transform hover:bg-slate-200 hover:text-black focus:outline-none"
  const matchRoute = useMatchRoute()
  const active = matchRoute({ to: link })
  const navigate = useNavigate();

  return(
    <button className={`${button_style} ${active ?' bg-white text-black ' : 'text-white' }`}

                           onClick={() => navigate({ to: link })}>
          
          {children}
          {!collapsed && <span>{label}</span>}
          
        </button>
  );

}

const Sidebar: React.FC = () => {

    const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

    const { isLoggedIn } = useSelector((state:RootState)=> state.auth);
    if (!isLoggedIn){
      console.log("side bar not rendred");
      return null;

    }  

    return(
        <div
      className={`flex flex-col p-2 bg-slate-600 text-white transition-all duration-300 ${
        isCollapsed ? 'w-16 items-center' : 'w-40'
      }`}
    >
      <button
        className="text-gray-300 self-end mb-6 text-2xl"
        onClick={() => setIsCollapsed(!isCollapsed)}
        aria-label="Toggle Sidebar"
      >
        {isCollapsed ? '→' : '←'}
      </button>

      <nav className={`flex flex-col  gap-4 ${isCollapsed ? 'items-center' : ''}`}>

        <NavButton label='Home' collapsed = {isCollapsed} link="/home"><FaHome className="text-xl" /></NavButton>
        <NavButton label='Goals' collapsed = {isCollapsed} link="/home/goals"><FaBullseye className="text-xl" /></NavButton>
        <NavButton label='Reports' collapsed = {isCollapsed} link="/home/reports" ><FaFileAlt className="text-xl" /></NavButton>
        <NavButton label='Calendar' collapsed = {isCollapsed} link="/home/calendar" > <FaCalendarAlt className="text-xl" /></NavButton>
        <NavButton label='Settings' collapsed = {isCollapsed} link="/home/settings" ><FaCog className="text-xl" /></NavButton>
          
      </nav>
    
    </div>
    );
    
}


export default Sidebar;
