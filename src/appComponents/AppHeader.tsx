import React from 'react';
import {useSelector } from 'react-redux';
import {RootState } from '../appStore/store.ts';

const Username: React.FC = ()=>{
    const {isLoggedIn, user} =  useSelector((state: RootState) => state.auth);
    const username = user?.username;
    console.log(user);
    if(!isLoggedIn){
        return null;
    }

    else{
        return(
            <div><span className='text-xl text-white'>{username}</span></div>
        );
    }


}

const AppHeader: React.FC = () => {
  
  return (
    <div className='flex flex-row w-full justify-between p-5 align-middle font-bold'>
        <div id='appName'><span className='text-2xl text-white'>GOAL TRACKER</span></div>
        <Username />
    </div>
  );
};

export default AppHeader;
