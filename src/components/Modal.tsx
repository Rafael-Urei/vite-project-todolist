import { Link } from "react-router-dom";

export const Modal = () => {
    return (
        <>
            <div className="modal-bg">
                <div className="modal">
                    <h1>Welcome, partner!</h1>
                    <p>This is a To Do List project that i've made to set as my first project, here you'll be able to set your tasks into our firebase, and create many accounts with e-mails or GoogleAuth. I hope you enjoy!!</p>
                    <p>Are you new here?</p>
                    <div>
                        <Link to='/login' className="modal-link">Login</Link>
                        <Link to='/register' className="modal-link">Register</Link>
                    </div>
                </div>
            </div>
        </>
    )
};