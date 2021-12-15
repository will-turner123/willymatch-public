import { getAuth, signOut } from 'firebase/auth';
import { Navigate } from 'react-router-dom';

export default function LogOut(){
    const auth = getAuth();
    signOut(auth).then(() => {
        localStorage.removeItem('user');
        return <Navigate to='/login' />
    }).catch((error) => {
        <h1 class="text-danger">Failed to log you out</h1>
        console.log(error);
    })
    return <Navigate to='/login' />
}
