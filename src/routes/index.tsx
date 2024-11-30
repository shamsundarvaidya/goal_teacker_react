import  { useEffect } from 'react';
import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router'
import { LoginForm } from '@/appComponents/LoginForm'
import { useSelector } from 'react-redux';
import type { RootState } from '@/appStore/store';
import { useNavigate } from '@tanstack/react-router';


export const Route = createFileRoute('/')({
  component: IndexPage,
})


function IndexPage() {
    const navigate = useNavigate();

    useEffect(()=>{
      navigate({ to: '/home' });
    },[navigate])

    // 
    return(<> </>)


}
