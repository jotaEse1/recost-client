import React from 'react';
import './Options.css'
import Option from './Option'
import { useNavigate } from 'react-router-dom';
import AnimatePages from '../animations/AnimatePages'
import { motion } from 'framer-motion';
import { variantButtonPress } from '../animations/variants';
import {FiLogOut} from 'react-icons/fi'
import { loginForm, registerForm } from '../interfaces/interfaces';

interface Props {
    setLoadOption: React.Dispatch<React.SetStateAction<boolean>>,
    handleAuth: (action: string, data: registerForm | loginForm) => void
}

const data = {email: '', password: ''}

const Options: React.FC<Props> = ({setLoadOption, handleAuth}) => {
    const navigate = useNavigate()

    return (
        <AnimatePages>
            <div className='options-container'>
                <div className='logout-option'>
                    <FiLogOut 
                        title='Cerrar sesión'
                        onClick={() => handleAuth('logout', data)}
                    />
                </div>
                <h1>¿Qué quieres hacer?</h1>
                <div className='all-options'>
                    <motion.div
                        variants={variantButtonPress}
                        whileTap='click'
                        onClick={() => {
                            setLoadOption(true)
                            navigate('/list')
                        }}
                        className='single-option-container'
                    >
                        <Option
                            title='Lista de Precios'
                            description='Aquí encontrarás tu lista de precios en donde podrás crearla y modificarla'
                        />
                    </motion.div>
                    <motion.div
                        variants={variantButtonPress}
                        whileTap='click'
                        onClick={() => {
                            setLoadOption(true)
                            navigate('/budget')
                        }}
                        className='single-option-container'
                    >
                        <Option
                            title='Presupuestos'
                            description='Ver presupuestos guardados, crear nuevos y saber el costo del producto'
                        />
                    </motion.div>
                    <motion.div
                        variants={variantButtonPress}
                        whileTap='click'
                        onClick={() => {
                            setLoadOption(true)
                            navigate('/recipes')
                        }}
                        className='single-option-container'
                    >
                        <Option
                            title='Recetas'
                            description='En esta sección podras cargar tus recetas'
                        />
                    </motion.div>
                </div>
            </div>
        </AnimatePages>
    );
};

export default Options;