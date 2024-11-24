import React from 'react';
import {useDispatch, useSelector } from 'react-redux';
import {RootState } from '../appStore/store.ts';
import { Button } from '@/components/ui/button.tsx';
import { UseDispatch } from 'react-redux';
import { useNavigate } from '@tanstack/react-router';
import { AppDispatch } from '../appStore/store.ts';
import {logout} from '../appStore/loginSlice.ts'


const UserSection: React.FC = ()=>{
    const {isLoggedIn, user} =  useSelector((state: RootState) => state.auth);
    const username = user?.username;
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate();
    const buttonHandler = () => {

        dispatch(logout())


    }

    if(!isLoggedIn){
        return null;
    }
    else{
        return(
            <div className="flex flex-row">
                <div className='align-middle'><span className='text-xl text-white'>{username}</span></div>
                <Button onClick={buttonHandler}
                        className='text-white text-lg hover:bg-slate-50 hover:text-slate-800 ml-5 mr-5'>
                    Logout
                </Button>
            </div>

        );
    }


}


const AppHeader: React.FC = () => {



    return (
    <div className='flex flex-row w-full justify-between align-middle font-bold'>
        <div id='appName' className='pl-5'><span className='text-2xl text-white'>GOAL TRACKER</span></div>
        <div className='flex flex-row align-middle p-1'>
       <UserSection />

        </div>
        
    </div>
  );
};

export default AppHeader;
