// --------------------- Imports ---------------------
import { useForm,  SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { IoLogoGoogle as Google } from 'react-icons/io';
import { AiFillEye as Show, AiFillEyeInvisible as Hidden } from 'react-icons/ai';
import * as yup from 'yup';
import { auth, googleProvider } from '../firebase/firebase';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
// --------------------- Imports ---------------------


//Schema to validate data of the formulary.
const schema = yup.object ({
    email: yup
        .string()
        .required('E-mail cannot be blank!'),
    password: yup
        .string()
        .min(6, 'At least 6 characteres!'),
})


interface IFormInput {
    email: string,
    password: string,
    name: string,
    phone: string,
    username: string,
    confirmPassword: string,
    birth: string,
}

// Login Component
export const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(false);

    //State to allow a validated formulary.
    const { register, formState: { errors }, handleSubmit } = useForm<IFormInput>({
        resolver: yupResolver(schema),
    });

    const navigate = useNavigate(); //State to navigate into pages.

    //Function to sign-in with google popup.
    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            localStorage.setItem('AlreadyKnown', 'true');
            navigate('/home');
        } catch(error) {
            console.log(error);
        }
    };

    //Function to login and authenticate the user with his/her credentials.
    const onSubmit: SubmitHandler<IFormInput> = async data => {
        try {
            await signInWithEmailAndPassword(auth, data.email, data.password);
            localStorage.setItem('AlreadyKnown', 'true');
            navigate('/home');
        } catch(e: any) {
            console.log(e.message)
            if (e.message === 'Firebase: Error (auth/user-not-found).') {
                setError(true);
                
            }
            if (e.message === 'Firebase: Error (auth/wrong-password).') {
                setError(true);
            }
        }
    };

    function handleShowPassword() {
        setShowPassword(!showPassword);
    }

    return (
        <div className="container">
            <div className="login-register-container">
                <h1 className="login-register-title">Login</h1>
                <form className='login-register-form' onSubmit={handleSubmit(onSubmit)}>
                    <label>E-mail</label>
                    <input type="email" { ...register('email')} autoComplete='off' />
                    { error ? <p className='error'>Wrong e-mail or password!</p> : <p className='error'>{errors.email?.message}</p>}
                    <label>Password</label>
                    <div>
                        <input type={showPassword ? 'text' : 'password'} { ...register('password') } autoComplete='off'/>
                        {!showPassword ? <Show className='eye' onClick={handleShowPassword}/> : <Hidden className='eye' onClick={handleShowPassword}/>}
                    </div>
                    <p className='error'>{errors.password?.message}</p>
                    <button type='submit'>Sign-In</button>
                </form>
                <div className="other-login">
                    <p>Or</p>
                    <button onClick={signInWithGoogle}>Sign-In with <Google/></button>
                </div>
                <p className="register">Don't have an account?<span onClick={() => navigate('/register')}><strong>Sing-Up</strong></span></p>
            </div>
            <div className='img-container'></div>
        </div>
    )
};