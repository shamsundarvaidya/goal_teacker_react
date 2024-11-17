import  { useEffect } from 'react';
import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router'
import { LoginForm } from '@/appComponents/LoginForm'
import { useSelector } from 'react-redux';
import type { RootState } from '@/appStore/store';
import { useNavigate } from '@tanstack/react-router';


export const Route = createFileRoute('/')({
  component: LoginPage,
})


function LoginPage() {
    const navigate = useNavigate();
    const {isLoggedIn} = useSelector((state:RootState)=>state.auth,(prev, next) => prev === next);

    useEffect(()=>{
        if(isLoggedIn){
            navigate({ to: '/home' });
        }

    },[isLoggedIn,navigate])


    if(isLoggedIn){
        navigate({ to: '/home'  });
        return null;
    }


    return (
    <div className="bg-gradient-to-r from-slate-900 to-slate-500 text-white p-8 h-full">
        <div className='flex flex-row justify-end '>
            <div className='w-1/4 mt-10'>
                <LoginForm />
            </div>
        </div>

    </div>
  )
}
