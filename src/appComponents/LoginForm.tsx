import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../appStore/store.ts';
import {login} from '../appStore/loginSlice.ts'
import { Button } from "@/components/ui/button"



interface Credentials {
  username: string;
  password: string;
}



export const LoginForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [credentials, setCredentials] = useState<Credentials>({ username: '', password: '' });
  const {loading, error } = useSelector((state: RootState) => state.auth);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login(credentials));

  };
  
  console.log(error)

  return (
      <div className="bg-gradient-to-r from-slate-900 to-slate-500 text-white p-8 h-full w-full">
        <div className='flex flex-row justify-end '>
          <div className='w-1/4 mt-10'>
      <div>
    <div>
    <form onSubmit={handleSubmit} className="w-full mx-auto p-4">
      
      <div className="mb-4">
        <label className="block text-xl mb-2">Username</label>
        <input
          type="text"
          value={credentials.username}
          onChange={(e) => setCredentials((state) => ({
                    ...state,
                    username: e.target.value,
                    }))}
          className="border rounded w-full p-2 text-slate-800"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-xl mb-2">Password</label>
        <input
          type="password"
          value={credentials.password}
          onChange={(e) => setCredentials((state) => ({
                    ...state,
                    password: e.target.value,
                    }))}
          className="border rounded w-full p-2 text-slate-800"
          required
        />
      </div>
      <Button type="submit" className='border border-transparent hover:border-slate-200 rounded px-4 py-2 bg-slate-100 text-slate-800 hover:text-slate-200 hover:bg-slate-800'>
        Login
      </Button>
    </form>
      {error && <p className=" text-white">{error}</p>}
      </div>

    {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
            <div className="animate-spin border-t-2 border-white rounded-full h-12 w-12"></div>
        </div>
    )}
    </div>
          </div>
        </div>

      </div>
  );
}


