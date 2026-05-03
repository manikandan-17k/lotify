import { getToken, useAuth } from '@clerk/react'
import { useEffect, useState } from 'react';
import api from '../lib/axios';
import { Loader } from 'lucide-react';
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
        return (
        <div className='h-screen w-full flex items-center justify-center'>
				<Loader className='size-8 text-emerald-500 animate-spin' />
		</div>
    );
    }
  return <div>{children}</div>
}

export default AuthProvider