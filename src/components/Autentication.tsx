import React from 'react';
import './Autentication.css'
import {useNavigate} from 'react-router-dom'
import AnimatePages from '../animations/AnimatePages'
import { motion } from 'framer-motion';
import { variantButtonPress } from '../animations/variants';

const Autentication = () => {
    const navigate = useNavigate();

    return (
        <AnimatePages>
            <div className='autentication-container'>
                <div className='autentication-options-container'>
                    <div className='autentication-options'>
                        <h2>Unete a Recost hoy mismo!</h2>
                        <div className='options'>
                            <motion.button 
                                onClick={() => navigate('signin')}
                                variants={variantButtonPress}
                                whileTap='click'
                            >Registrarse</motion.button>
                            <motion.button 
                                onClick={() => navigate('login')}
                                variants={variantButtonPress}
                                whileTap='click'
                            >Ingresar</motion.button>
                        </div>
                    </div>
                </div>
            </div>
        </AnimatePages>
    );
};

export default Autentication;