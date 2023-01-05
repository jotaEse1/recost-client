import React from 'react';
import './DeleteBudget.css'
import {MdCheck} from 'react-icons/md'
import {IoMdClose} from 'react-icons/io'
import { budgetI, budgetListI, ingredientI } from '../interfaces/interfaces';
import { motion } from 'framer-motion';
import { variantPriceListModals, variantButtonPress } from '../animations/variants'

interface Props {
    setShowDeleteBudget: React.Dispatch<React.SetStateAction<boolean>> ,
    setShowModalBudget: React.Dispatch<React.SetStateAction<boolean>>,
    setShowBudgetDetails: React.Dispatch<React.SetStateAction<boolean>>,
    handleBudget: (action: string, data: ingredientI | budgetListI) => void,
    budget: budgetI
}

const DeleteBudget: React.FC<Props> = ({setShowDeleteBudget, setShowModalBudget, setShowBudgetDetails, handleBudget, budget}) => {
    return (
        <div 
            className='budget-details-modal-delete'
        >
            <motion.div
                variants={variantPriceListModals}
                initial='hide'
                animate='visible'
                exit='exit'
            >
                <h4>¿Quieres eliminar el presupuesto?</h4>
                <div className='budget-details-modal-delete-buttons'>
                    <motion.button
                        variants={variantButtonPress}
                        whileTap='click'
                        onClick={() => {
                            setTimeout(() => {
                                setShowModalBudget(false)
                                setShowBudgetDetails(false)
                            }, 500);
                            setShowDeleteBudget(false)
                            handleBudget('delete', budget)
                        }}
                        title='Eliminar'
                        role='delete'
                    >
                        <MdCheck />
                    </motion.button>
                    <motion.button
                        variants={variantButtonPress}
                        whileTap='click'
                        onClick={() => {
                            setShowDeleteBudget(false)
                        }}
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

export default DeleteBudget;