import React, { useState } from 'react';
import './AddBudgetingredient.css'
import { IoMdClose } from 'react-icons/io'
import {ingredientI, budgetI, priceListI} from '../interfaces/interfaces'
import { motion } from 'framer-motion';
import { variantPriceListModals, variantButtonPress } from '../animations/variants'

interface Props {
    budgetRow: ingredientI,
    setShowModalAddBudgetRow: React.Dispatch<React.SetStateAction<boolean>>,
    setBudgetRow: React.Dispatch<React.SetStateAction<ingredientI>>, 
    filterBudget: (data: ingredientI, action: string, type: string, priceItem?: priceListI | undefined) => void | NodeJS.Timeout,
    setMsg: React.Dispatch<React.SetStateAction<string>>,
    setShowModalMsg: React.Dispatch<React.SetStateAction<boolean>>,
    budget: budgetI, 
    setPriceListItem: React.Dispatch<React.SetStateAction<priceListI | null>>,
    manual: boolean
}

const initialState = {
    ingredient: '',
    amount: 0,
    cost: 0
}

const AddBudgetingredient: React.FC<Props> = ({budgetRow, setShowModalAddBudgetRow, setBudgetRow, filterBudget, setMsg, setShowModalMsg, budget, setPriceListItem, manual}) => {
    const [form, setForm] = useState(budgetRow);

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

        const {ingredient, amount, cost} = copyForm

        if(manual){
            if (cost > 0){
                copyForm.budgetTitle = budget.title
                copyForm.budgetDescription = budget.description
                filterBudget(copyForm, 'update', 'manual', {item: ingredient, unit: amount, price: cost})   
                setShowModalAddBudgetRow(false)
                return setBudgetRow(initialState) 
            }
    
            copyForm.budgetTitle = budget.title
            copyForm.budgetDescription = budget.description
            filterBudget(copyForm, 'add', 'manual',{item: ingredient, unit: amount, price: cost})
            setShowModalAddBudgetRow(false)
            return setBudgetRow(initialState)
        }
        if(!manual){
            if (cost > 0){
                copyForm.budgetTitle = budget.title
                copyForm.budgetDescription = budget.description
                filterBudget(copyForm, 'update', 'fast', {item: ingredient, unit: amount, price: cost})   
                setShowModalAddBudgetRow(false)
                return setBudgetRow(initialState) 
            }
    
            copyForm.budgetTitle = budget.title
            copyForm.budgetDescription = budget.description
            filterBudget(copyForm, 'add', 'fast',{item: ingredient, unit: amount, price: cost})
            setShowModalAddBudgetRow(false)
            return setBudgetRow(initialState)
        }
    }

    return (
        <div
            className='add-budget-modal-container'
        >
            <motion.form
                autoComplete='off'
                onSubmit={handleSubmit}
                variants={variantPriceListModals}
                initial='hide'
                animate='visible'
                exit='exit'
            >
                {(budgetRow.ingredient && budgetRow.amount) ? (
                    <h4>Modificar Ingrediente</h4>
                ) : (
                    <h4>Agregar Ingrediente</h4>
                )}
                <div>
                    <label htmlFor="ingredient">Ingrediente</label>
                    <input
                        type='text'
                        name='ingredient'
                        id="ingredient"
                        required
                        value={form.ingredient}
                        onChange={handleForm}
                        disabled={(budgetRow.ingredient && budgetRow.amount)? true : false}
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
                    {(budgetRow.ingredient && budgetRow.amount) ? (
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
                    onClick={() => { setShowModalAddBudgetRow(false); setBudgetRow(initialState) }}
                ><IoMdClose /></motion.button>
            </motion.form>
        </div>
    );
};

export default AddBudgetingredient;