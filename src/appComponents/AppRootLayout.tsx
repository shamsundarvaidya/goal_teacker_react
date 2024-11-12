import React from 'react';
import AppHeader from './AppHeader';
import { Outlet } from '@tanstack/react-router';



const RootLayout: React.FC = () => {
  
  return (
    <div className='flex flex-col h-screen'>

    
    <div className='bg-slate-800'>
        <AppHeader />
        
    </div>
    <div id='main-section' className='flex flex-grow bg-orange-100'>
      <Outlet />
    </div>
      </div>
  );
};

export default RootLayout;
