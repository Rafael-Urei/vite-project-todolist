import { auth } from '../firebase/firebase';
import { Nav } from '../components/Nav'

export const Home = () => {

    return (
        <>
            <div className="home-body">
                <Nav/>
                <div className="home-container">
                    <h1 className="apresentation">Welcome { auth.currentUser?.displayName }</h1>
                </div>
            </div>
        </>
    )
};