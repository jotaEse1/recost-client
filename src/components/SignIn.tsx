import React, { useState } from 'react';
import './SignIn.css'
import { useNavigate } from 'react-router-dom'
import AnimatePages from '../animations/AnimatePages'
import { registerForm, loginForm } from '../interfaces/interfaces';
import { variantButtonPress } from '../animations/variants';
import { motion } from 'framer-motion';

interface Props {
    setMsg: React.Dispatch<React.SetStateAction<string>>,
    setShowModalMsg: React.Dispatch<React.SetStateAction<boolean>>,
    handleAuth: (action: string, data: registerForm | loginForm) => void,
    disable: boolean,
    setDisable: React.Dispatch<React.SetStateAction<boolean>>
}

const intialState = {
    username: '',
    email: '',
    password: ''
}

const SignIn: React.FC<Props> = ({ setMsg, setShowModalMsg, handleAuth, disable, setDisable }) => {
    const [form, setForm] = useState<registerForm>(intialState);

    const navigate = useNavigate()

    const handleForm = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const { username, email, password } = form;

        if (!username || !email || !password) {
            setMsg('Casilleros incompletos')
            setShowModalMsg(true)
            return setTimeout(() => setShowModalMsg(false), 3000)
        }

        handleAuth('register', form)
        setDisable(true)
    }

    return (
        <AnimatePages>
            <div className='signin-container'>
                <div className='signin-container-div'>
                    <h2>Registrarse</h2>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor='username'>Nombre usuario</label>
                        <input
                            type='text'
                            name='username'
                            id='username'
                            value={form.username}
                            onChange={handleForm}
                        />
                        <label htmlFor='email'>Correo Electronico</label>
                        <input
                            type='text'
                            name='email'
                            id='email'
                            value={form.email}
                            onChange={handleForm}
                        />
                        <label htmlFor='password'>Contraseña</label>
                        <input
                            type='password'
                            name='password'
                            id='password'
                            value={form.password}
                            onChange={handleForm}
                        />
                        <span
                            onClick={() => navigate('/login')}
                        >¿Ya tienes una cuenta?</span>
                        <motion.button
                            variants={variantButtonPress}
                            whileTap='click'
                            type='submit'
                            disabled={disable? true : false}
                            className={disable? 'disabled' : 'active'}
                        >Registrarse!</motion.button>
                    </form>
                </div>
            </div>
        </AnimatePages>
    );
};

export default SignIn;