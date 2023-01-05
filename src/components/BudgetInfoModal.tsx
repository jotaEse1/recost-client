import React, { useState } from 'react';
import './BudgetInfoModal.css'
import { budgetListI, ingredientI } from '../interfaces/interfaces'
import { motion } from 'framer-motion';
import { variantBudgetModals, variantButtonPress } from '../animations/variants'


interface Props {
    setShowModalBudgetInfo: React.Dispatch<React.SetStateAction<boolean>>,
    setShowModalBudgetItems: React.Dispatch<React.SetStateAction<boolean>>,
    setShowModalBudget: React.Dispatch<React.SetStateAction<boolean>>,
    user: string,
    handleBudget: (action: string, data: ingredientI | budgetListI) => void,
    setMsg: React.Dispatch<React.SetStateAction<string>>,
    setShowModalMsg: React.Dispatch<React.SetStateAction<boolean>>, 
    setShowModalChooseRecipe: React.Dispatch<React.SetStateAction<boolean>>,
    setManual: React.Dispatch<React.SetStateAction<boolean>>
}

const initialState = {
    title: '',
    description: '',
    idUser: ''
}

const BudgetInfoModal: React.FC<Props> = ({ setShowModalBudgetInfo, setShowModalBudgetItems, setShowModalBudget, user, handleBudget, setMsg, setShowModalMsg, setShowModalChooseRecipe, setManual }) => {
    const [info, setInfo] = useState<budgetListI>(initialState);
    const [modality, setModality] = useState('');

    const handleInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInfo({
            ...info,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!info.title || !info.description) {
            setMsg('Casilleros incompletos')
            setShowModalMsg(true)
            return setTimeout(() => { setShowModalMsg(false); setMsg('') }, 3000)
        }
        if (!modality) {
            setMsg('Escoja una modalidad.')
            setShowModalMsg(true)
            return setTimeout(() => { setShowModalMsg(false); setMsg('') }, 3000)
        }
        if (info.description.length > 100) {
            setMsg('Ingrese una descripción mas corta')
            setShowModalMsg(true)
            return setTimeout(() => { setShowModalMsg(false); setMsg('') }, 3000)
        }
        if (modality === 'fast'){
            setManual(false)
            handleBudget('new', info)
            setTimeout(() => setShowModalChooseRecipe(true), 500)
            return setShowModalBudgetInfo(false)    
        }

        setManual(true)
        handleBudget('new', info)
        setTimeout(() => setShowModalBudgetItems(true), 500)               
        setShowModalBudgetInfo(false) 
    }

    return (
        <>
            <motion.form
                autoComplete='off'
                className='budget-information'
                onSubmit={handleSubmit}
                variants={variantBudgetModals}
                initial='hide'
                animate='visible'
                exit='exit'
            >
                <h5>Nuevo Presupuesto</h5>
                <div>
                    <label htmlFor="title">Título</label>
                    <input
                        type='text'
                        name='title'
                        id='title'
                        required
                        placeholder='Ingrese un título'
                        value={info.title}
                        onChange={handleInfo}
                    />
                    <label htmlFor="description">Descripcion</label>
                    <input
                        type='text'
                        name='description'
                        id='description'
                        required
                        placeholder='Ingrese una descripción'
                        value={info.description}
                        onChange={handleInfo}
                    />
                    <label htmlFor="options">
                        Escoja una modalidad 
                    </label>
                    <div className='modal-radio'>
                        <label 
                            htmlFor="manual-option"
                            style={modality === 'manual'? {color: '#5699F6'} : {color: '#fff'}}
                        >
                            <input 
                                type="radio" 
                                name="option" 
                                id="manual-option" 
                                value='manual' 
                                checked={modality === 'manual'}
                                onChange={() => setModality('manual')}
                            />
                            Carga manual
                        </label>
                        <label 
                            htmlFor="fast-option"
                            style={modality === 'fast'? {color: '#5699F6'} : {color: '#fff'}}
                        >
                            <input 
                                type="radio" 
                                name="option" 
                                id="fast-option" 
                                value='fast'
                                onChange={() => setModality('fast')}
                            />
                            Cargar receta
                        </label>
                    </div>
                    <div className='modal-buttons'>
                        <motion.button
                            variants={variantButtonPress}
                            whileTap='click'
                            onClick={() => { 
                                setTimeout(() => {
                                    setShowModalBudget(false) 
                                }, 500);
                                setShowModalBudgetInfo(false); 
                            }}
                            type='button'
                            name='close'
                        >
                            Cancelar
                        </motion.button>
                        <motion.button
                            variants={variantButtonPress}
                            whileTap='click'
                            type='submit'
                        >
                            Continuar
                        </motion.button>
                    </div>
                </div>
            </motion.form>
        </>
    );
};

export default BudgetInfoModal;