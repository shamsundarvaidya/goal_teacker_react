import { useState } from 'react';
import { FaHome, FaBullseye , FaFileAlt , FaCog ,FaCalendarAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import  type { AppDispatch, RootState } from '../appStore/store.ts';

const Sidebar: React.FC = () => {
 
    const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

    const { isLoggedIn } = useSelector((state:RootState)=> state.auth);
    if (!isLoggedIn){
      console.log("side bar not rendred");
      return null;

    }  
    
    return(
        <div
      className={`flex flex-col h-full p-2 bg-gray-800 text-white transition-all duration-300 ${
        isCollapsed ? 'w-16 items-center' : 'w-40'
      }`}
    >
      <button
        className="text-gray-300 self-end mb-6"
        onClick={() => setIsCollapsed(!isCollapsed)}
        aria-label="Toggle Sidebar"
      >
        {isCollapsed ? '→' : '←'}
      </button>

      <nav className={`flex flex-col gap-4 ${isCollapsed ? 'items-center' : ''}`}>
        <button className="flex items-center gap-2 bg-transparent rounded py-2 px-4 text-white transition duration-300
                           ease-in-out transform hover:bg-white hover:text-black focus:outline-none">
          <FaHome className="text-xl" />
          {!isCollapsed && <span>Home</span>}
        </button>
          
        <button className="flex items-center gap-2 bg-transparent rounded py-2 px-4 text-white transition duration-300
                           ease-in-out transform hover:bg-white hover:text-black focus:outline-none">
          <FaBullseye className="text-xl" />
          {!isCollapsed && <span>Goals</span>}
        </button>
          
           <button className="flex items-center gap-2 bg-transparent rounded py-2 px-4 text-white transition duration-300
                           ease-in-out transform hover:bg-white hover:text-black focus:outline-none">
          <FaFileAlt className="text-xl" />
          {!isCollapsed && <span>Reports</span>}
        </button>
         
          <button className="flex items-center gap-2 bg-transparent rounded py-2 px-4 text-white transition duration-300
                           ease-in-out transform hover:bg-white hover:text-black focus:outline-none">
          <FaCalendarAlt className="text-xl" />
          {!isCollapsed && <span>Calendar</span>}
        </button>
          
          
        <button className="flex items-center gap-2 bg-transparent rounded py-2 px-4 text-white transition duration-300
                           ease-in-out transform hover:bg-white hover:text-black focus:outline-none">
          <FaCog className="text-xl" />
          {!isCollapsed && <span>Settings</span>}
        </button>
      </nav>
    
    </div>
    );
    
}


export default Sidebar;
