import React, { useEffect } from 'react';
import { createFileRoute } from '@tanstack/react-router'
import { LoginForm } from '@/appComponents/LoginForm'
import { useSelector } from 'react-redux';
import type { RootState } from '@/appStore/store';
import { useNavigate } from '@tanstack/react-router';


export const Route = createFileRoute('/')({
  component: HomeComponent,
})

function HomeComponent() {
    const navigate = useNavigate();
    const {isLoggedIn} = useSelector((state:RootState)=>state.auth,(prev, next) => prev === next);

    if(isLoggedIn){
      navigate({ to: '/home' });
      return null;
  }

    useEffect(()=>{
        if(isLoggedIn){
            navigate({ to: '/home' });
        }

    },[isLoggedIn])

  return (
    <div className="bg-gradient-to-r from-slate-900 to-slate-500 text-white p-8 h-full">
        <div className='flex flex-row  mt-10 ml-5 w-full'>
            <div id="login" className='w-1/2'>
                <LoginForm />
            </div>
        </div>

    </div>
  )
}
