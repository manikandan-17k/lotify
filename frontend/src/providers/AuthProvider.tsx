import { getToken, useAuth } from '@clerk/react'
import { useEffect, useState } from 'react';
import api from '../lib/axios';
const updateApiToken = async (token:string | null) => {
    if(token){
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete api.defaults.headers.common['Authorization'];        
    }
};
const AuthProvider = ({children}: {children: React.ReactNode}) => {
    const {getToken, userId} = useAuth();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const initAuth = async () => {
        try{
            const token = await getToken();
            updateApiToken(token);
        }catch(error){
            updateApiToken(null);
            console.error('Error fetching token:', error);
        }finally{
            setLoading(false);
        }
    };
    initAuth();
    }, [getToken]);
    if(loading) {
        return <div className='flex items-center justify-center h-screen w-full'>
            <div className="flex items-end gap-1 h-10">
                    <div className="w-1 bg-red-500 animate-[bounce_1s_infinite] h-2"></div>
                    <div className="w-1 bg-red-500 animate-[bounce_1s_infinite_0.2s] h-4"></div>
                    <div className="w-1 bg-red-500 animate-[bounce_1s_infinite_0.4s] h-3"></div>
                    <div className="w-1 bg-red-500 animate-[bounce_1s_infinite_0.6s] h-2"></div>
            </div>
        </div>
    }
  return <div>{children}</div>
}

export default AuthProvider