import React, {useEffect} from 'react';
import AppHeader from './AppHeader';
import { Outlet } from '@tanstack/react-router';
import Sidebar from "@/appComponents/AppSidebar.tsx";
import { useSelector } from 'react-redux';
import type { RootState } from '@/appStore/store';
import { useNavigate } from '@tanstack/react-router';
import {LoginForm} from "@/appComponents/LoginForm.tsx";

const RootLayout: React.FC = () => {

  const navigate = useNavigate();
  const {isLoggedIn} = useSelector((state:RootState)=>state.auth,(prev, next) => prev === next);



  
  return (

    <div className='flex flex-col h-screen'>

    
    <div className='bg-slate-800 pb-1'>
        <AppHeader />
        
    </div>

    <div id='main-section' className='flex-grow'>
      <div className="flex flex-row h-full">
      <Sidebar />

        {isLoggedIn ? <Outlet /> : <LoginForm />}

      </div>
    </div>

      </div>
  );
};

export default RootLayout;
