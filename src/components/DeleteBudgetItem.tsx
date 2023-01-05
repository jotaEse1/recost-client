import React from 'react';
import './DeleteBudgetItem.css'
import {MdCheck} from 'react-icons/md'
import {IoMdClose} from 'react-icons/io'
import { ingredientI, priceListI } from '../interfaces/interfaces'
import { motion } from 'framer-motion';
import { variantPriceListModals, variantButtonPress } from '../animations/variants'

interface Props {
    setShowModalDeleteBudgetRow:  React.Dispatch<React.SetStateAction<boolean>>,
    setBudgetRow: React.Dispatch<React.SetStateAction<ingredientI>>,
    budgetRow: ingredientI,
    filterBudget: (data: ingredientI, action: string, type: string, priceItem?: priceListI | undefined) => void | NodeJS.Timeout,
    manual: boolean
}

const initialState = {ingredient: '', amount: 0, cost: 0}

const DeleteBudgetItem: React.FC<Props> = ({setShowModalDeleteBudgetRow, setBudgetRow, budgetRow, filterBudget, manual}) => {
    return (
        <div 
            className='budget-item-modal-delete'
        >
            <motion.div
                variants={variantPriceListModals}
                initial='hide'
                animate='visible'
                exit='exit'
            >
                <h4>¿Quieres eliminarlo?</h4>
                <div className='budget-item-modal-delete-buttons'>
                    <motion.button
                        variants={variantButtonPress}
                        whileTap='click'
                        onClick={() => {
                            if(manual){
                                filterBudget(budgetRow, 'remove', 'manual'); 
                                setBudgetRow(initialState)
                                setShowModalDeleteBudgetRow(false)
                            }
                            if(!manual){
                                filterBudget(budgetRow, 'remove', 'fast'); 
                                setBudgetRow(initialState)
                                setShowModalDeleteBudgetRow(false)
                            }
                        }}
                        title='Eliminar'
                        role='delete'
                    >
                        <MdCheck />
                    </motion.button>
                    <motion.button
                        variants={variantButtonPress}
                        whileTap='click'
                        onClick={() => {setShowModalDeleteBudgetRow(false); setBudgetRow(initialState)}}
                        title='Cancelar'
                        role='cancel'
                    >
                        <IoMdClose />
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
};

export default DeleteBudgetItem;