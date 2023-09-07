import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function admin({isAuthenticated, role, loading}){
    const router = useRouter();
    useEffect(()=>{
        console.log(isAuthenticated, role)
        if(!loading){
            if(isAuthenticated && role === "ADMIN"){
            
            }else{
                router.push("/")
            }
        }
        
    })
    return(
        <div>
            {isAuthenticated && role === "ADMIN"?
            <div>
                <p className="text-xl text-white">Hallo Admin</p>
            </div>
            :
            <div className='bg-slate-600'>
                <p className='text-5xl text-black'>No access</p>
            </div>
            }
            
        </div>
    )
}