import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { RiTodoLine as Todolist } from 'react-icons/ri'

export const Nav = () => {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    const logoutUser  = () => {
        signOut(auth);
        navigate('/login');
    };
    return (
        <>
            <div className="container-header">
                <header className="nav-header"></header>
                <nav className="nav">
                    <div>
                        <Todolist className="todo-icon"/>
                        <Link to='/dashboard' className="link">To do List</Link>
                    </div>
                    <div>
                        { user ? <Link to='/login' onClick={logoutUser} className="link">Logout</Link> : <Link to='/login' className="link">Login</Link> }
                        <Link to='/Register' className="link" id="register-link">Register</Link>
                    </div>
                </nav>
            </div>
        </>
    )
};