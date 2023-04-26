import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/firebase';
import { Nav } from '../components/Nav'

export const Home = () => {
    const [user] = useAuthState(auth);

    return (
        <>
            <div className="home-body">
                <Nav/>
                { user ? <div className="home-container">
                    <h1 className="apresentation">Welcome { auth.currentUser?.displayName }</h1>
                </div> : <div className="loading-bg">
                    <div className="loading-border"><div className="loading"></div></div>
                </div> }
            </div>
        </>
    )
};