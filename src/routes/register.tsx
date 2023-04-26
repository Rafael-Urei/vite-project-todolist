import {useForm,  SubmitHandler} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup';
import { auth } from '../firebase/firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { AiFillEye as Show, AiFillEyeInvisible as Hidden } from 'react-icons/ai'
// --------------------- Imports ---------------------

const strengthLabels = ['weak', 'average', 'strong'];

//Schema to validate data of the formulary.
const schema = yup.object ({
    email: yup
        .string()
        .required('E-mail cannot be blank!')
        .email('Invalid e-mail format!'),
    password: yup
        .string()
        .min(6, 'At least 6 characteres!'),
    confirmPassword: yup
        .string()
        .min(6, 'At least 6 characteres!').oneOf([yup.ref('password')], 'Password do not match!'),
    name: yup
        .string()
        .required('Name cannot be blank!')
        .transform((name) => {
            return name
                .toLowerCase()
                .trim()
                .split(' ')
                .map((word: string) => {
                    return word[0]?.toLocaleUpperCase().concat(word.substring(1))
                }).join(' ');
        }),
    birth: yup
        .string()
        .required('Birth cannot be blank!'),
    username: yup
        .string()
        .required('Username cannot be blank!')
        .transform((username) => {
            return username
                .toLowerCase()
                .trim()
                .replaceAll(' ', '');
        })
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


// Register Component
export const Register = () => {

    const [showPassword, setShowPassword] = useState(false); //State to show password
    const [strength, setStrength] = useState(''); //State to set strength
    const navigate = useNavigate(); //State to navigate into pages.
    const [error, setError] = useState(false);


    //State to allow a validated formulary.
    const { register, formState: { errors }, handleSubmit } = useForm<IFormInput>({
        resolver: yupResolver(schema),
    });


    //Function to login and authenticate the user with his/her credentials.
    const onSubmit: SubmitHandler<IFormInput> = async data => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
            console.log(userCredential);
            await updateProfile(userCredential.user, {
                displayName: data.username,
            })
            navigate('/login');
        } catch(error: any) {
            console.log(error);
            if (error.message === 'Firebase: Error (auth/email-already-in-use).') {
                setError(true)
            }
        }
    };

    //Function to show password
    function handleShowPassword() {
        setShowPassword(!showPassword);
    }

    //Function to set the strength to the state
    const getStrength = (password:string) => {
        let strengthIndicator = -1, upper = false, lower = false, numbers = false;
        for (let i = 0; i < password.length; i++) {
            const char = password.charCodeAt(i);
            if (!upper && char >= 65 && char <= 90) {
                upper = true;
                strengthIndicator++;
            }
            if (!lower && char >= 97 && char <= 122) {
                lower = true;
                strengthIndicator++;
            }
            if (!numbers && char >= 48 && char <= 57) {
                numbers = true;
                strengthIndicator++;
            }
        }
        setStrength(strengthLabels[strengthIndicator]);
    };

    //Function to get the value necessary for set strength
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => getStrength(e.target.value); 

    return (
        <div className="container">
            <div className="login-register-container">
                <h1 className="login-register-title">Register</h1>
                <form className='login-register-form' onSubmit={handleSubmit(onSubmit)}>
                    <label>Username</label>
                    <input type="text" { ...register('username')} />
                    <p className='error'>{errors.username?.message}</p>
                    <label>E-mail</label>
                    <input type="email" { ...register('email')} />
                    { error ? <p className='error'>E-mail already in use!</p> : <p className='error'>{errors.email?.message}</p> }
                    <label>Password</label>
                    <div>
                        <input type={showPassword ? 'text' : 'password'} { ...register('password') } autoComplete='off' onChange={handleChange} />
                        {!showPassword ? <Show className='eye' onClick={handleShowPassword}/> : <Hidden className='eye' onClick={handleShowPassword}/>}
                    </div>
                    <div className={`bars ${strength}`}>
                        <div></div>
                    </div>
                    <div className='strength-teste'>{ strength && <>{strength} Password</> }</div>
                    <p className='error'>{errors.password?.message}</p>
                    <label>Confirm Password</label>
                    <input type="password" { ...register('confirmPassword') } />
                    <p className='error'>{errors.confirmPassword?.message}</p>
                    <label>Full Name</label>
                    <input type="text" { ...register('name') } />
                    <p className='error'>{errors.name?.message}</p>
                    <label>Birth</label>
                    <input type="date" { ...register('birth') } />
                    <p className='error'>{errors.birth?.message}</p>
                    <button type='submit'>Sign-Up</button>
                </form>
                <p className="register" onClick={() => navigate('/login')}>Already have an account?<span><strong>Sing-In</strong></span></p>
            </div>
            <div className='img-container'></div>
        </div>
    )
};