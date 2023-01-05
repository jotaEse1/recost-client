import React, {useState} from 'react';
import './AddRecipeItem.css'
import { IoMdClose } from 'react-icons/io'
import {recipeI, recipeIngrI} from '../interfaces/interfaces'
import { motion } from 'framer-motion';
import { variantPriceListModals, variantButtonPress } from '../animations/variants'

interface Props {
    recipeRow: recipeIngrI,
    setShowModalAddRecipeRow: React.Dispatch<React.SetStateAction<boolean>>,
    setRecipeRow: React.Dispatch<React.SetStateAction<recipeIngrI>>,
    filterRecipe: (data: recipeIngrI, action: string) => void | NodeJS.Timeout,
    setMsg: React.Dispatch<React.SetStateAction<string>>,
    setShowModalMsg: React.Dispatch<React.SetStateAction<boolean>>,
    recipe: recipeI

}

const initialState = {
    ingredient: '',
    amount: 0
}

const AddRecipeItem: React.FC<Props> = ({recipeRow, setShowModalAddRecipeRow, setRecipeRow, filterRecipe, setMsg, setShowModalMsg, recipe}) => {
    const [form, setForm] = useState(recipeRow);

    const handleForm = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!form.ingredient || !form.amount) {
            setMsg('Casilleros incompletos')
            setShowModalMsg(true)
            return setTimeout(() => { setShowModalMsg(false); setMsg('') }, 3000)
        }
        if (!Number(form.amount)) {
            setMsg('Unidad en gr debe ser un número')
            setShowModalMsg(true)
            return setTimeout(() => { setShowModalMsg(false); setMsg('') }, 3000)
        }

        let copyForm = JSON.parse(JSON.stringify(form))
        copyForm.ingredient = copyForm.ingredient.trim().toLocaleLowerCase()

        if(recipeRow.ingredient && recipeRow.amount){
            copyForm.recipeTitle = recipe.title
            copyForm.recipeDescription = recipe.description
            setShowModalAddRecipeRow(false)
            filterRecipe(copyForm, 'update')
            return setRecipeRow(initialState)    
        }
        
        copyForm.recipeTitle = recipe.title
        copyForm.recipeDescription = recipe.description
        setShowModalAddRecipeRow(false)
        filterRecipe(copyForm, 'add')
        setRecipeRow(initialState)
    }

    return (
        <div
            className='add-recipe-modal-container'
        >
            <motion.form
                autoComplete='off'
                onSubmit={handleSubmit}
                variants={variantPriceListModals}
                initial='hide'
                animate='visible'
                exit='exit'
            >
                {(recipeRow.ingredient && recipeRow.amount) ? (
                    <h4>Modificar Ingrediente</h4>
                ) : (
                    <h4>Agregar Ingrediente</h4>
                )}
                <div>
                    <label htmlFor="ingredient">Ingrediente</label>
                    <input
                        type='text'
                        name='ingredient'
                        id='ingredient'
                        required
                        value={form.ingredient}
                        onChange={handleForm}
                        disabled={(recipeRow.ingredient && recipeRow.amount)? true : false}
                    />
                    <label htmlFor="amount">Unidad en gr</label>
                    <input
                        type='number'
                        min='0'
                        step='.01'
                        name='amount'
                        id='amount'
                        required
                        value={form.amount? form.amount : ''}
                        onChange={handleForm}
                    />
                </div>
                <motion.button
                    variants={variantButtonPress}
                    whileTap='click'
                    type='submit'
                >
                    {(recipeRow.ingredient && recipeRow.amount) ? (
                        'Modificar'
                    ) : (
                        'Agregar'
                    )}
                </motion.button>
                <motion.button
                    variants={variantButtonPress}
                    whileTap='click'
                    type='button'
                    name='close'
                    onClick={() => { setShowModalAddRecipeRow(false); setRecipeRow(initialState) }}
                ><IoMdClose /></motion.button>
            </motion.form>
        </div>
    );
};

export default AddRecipeItem;