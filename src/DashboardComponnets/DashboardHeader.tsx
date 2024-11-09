import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import  type { AppDispatch, RootState } from '../appStore/store.ts';
import {logout} from '../appStore/loginSlice.ts'
import { Button } from "@/components/ui/button"

const DashboardHeader: React.FC = () => {
  const {isLoggedIn, user} =  useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  const logout_handel = ()=>{
      dispatch(logout())
  }

  return (
    <nav className=" text-white p-4 flex items-center justify-between w-full">
      {/* Title */}
      <div className="text-xl font-bold text-blue-500">Goal Tracker</div>

      {/* Menu Items */}
      <div className="flex flex-row  justify-end space-x-4">
        {!isLoggedIn ? null : (
          <>

            
            <Button
              onClick={logout_handel}
              
            >
              Logout
            </Button>
          </>
        )}
      </div>
    </nav>
  );
};

export default DashboardHeader;
