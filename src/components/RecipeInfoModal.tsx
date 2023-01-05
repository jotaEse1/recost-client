import React, {useState} from 'react';
import './RecipeInfoModal.css'
import { recipeI, recipeIngrI } from '../interfaces/interfaces'
import { motion } from 'framer-motion';
import { variantBudgetModals, variantButtonPress } from '../animations/variants'

interface Props {
    setShowModalRecipeInfo: React.Dispatch<React.SetStateAction<boolean>>,
    setShowModalRecipe: React.Dispatch<React.SetStateAction<boolean>>,
    setShowModalRecipeItems: React.Dispatch<React.SetStateAction<boolean>>,
    setMsg: React.Dispatch<React.SetStateAction<string>>,
    setShowModalMsg: React.Dispatch<React.SetStateAction<boolean>>,
    user: string,
    handleRecipe: (action: string, data: recipeIngrI | recipeI) => void
}

const initialState = {
    title: '',
    description: '',
    idUser: ''
}

const RecipeInfoModal: React.FC<Props> = ({setShowModalRecipeInfo, setShowModalRecipe, setShowModalRecipeItems, setMsg, setShowModalMsg, user, handleRecipe}) => {
    const [info, setInfo] = useState<recipeI>(initialState);

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
        if (info.description.length > 100) {
            setMsg('Ingrese una descripción mas corta')
            setShowModalMsg(true)
            return setTimeout(() => { setShowModalMsg(false); setMsg('') }, 3000)
        }

        handleRecipe('new', info)
        setTimeout(() => setShowModalRecipeItems(true), 500)
        setShowModalRecipeInfo(false)
    }

    return (
        <>
            <motion.form
                autoComplete='off'
                className='recipe-information'
                onSubmit={handleSubmit}
                variants={variantBudgetModals}
                initial='hide'
                animate='visible'
                exit='exit'
            >
                <h5>Nueva Receta</h5>
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
                    <div className='modal-buttons'>
                        <motion.button
                            variants={variantButtonPress}
                            whileTap='click'
                            onClick={() => { 
                                setTimeout(() => {
                                    setShowModalRecipe(false) 
                                }, 500);
                                setShowModalRecipeInfo(false); 
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

export default RecipeInfoModal;