import React from 'react';
import './BudgetConfirmation.css'
import {ingredientI, priceListI} from '../interfaces/interfaces'
import {MdCheck} from 'react-icons/md'
import {IoMdClose} from 'react-icons/io'
import { motion } from 'framer-motion';
import { variantBudgetModals, variantButtonPress } from '../animations/variants'


interface Props {
    setShowModalNewBudgetConfirmation: React.Dispatch<React.SetStateAction<boolean>>,
    setShowModalBudget: React.Dispatch<React.SetStateAction<boolean>>,
    filterBudget: (data: ingredientI, action: string, type: string, priceItem?: priceListI | undefined) => void | NodeJS.Timeout,
    manual: boolean
}

const data = {ingredient: '',amount: 0, cost: 0}

const BudgetConfirmation: React.FC<Props> = ({setShowModalNewBudgetConfirmation, setShowModalBudget, filterBudget, manual}) => {
    return (
        <div className='budget-confirmation-modal'>
            <motion.div
                variants={variantBudgetModals}
                initial='hide'
                animate='visible'
                exit='exit'
            >
                <h4>¿Quieres guardar este presupuesto?</h4>
                <div className='budget-confirmation-modal-buttons'>
                    <motion.button
                        variants={variantButtonPress}
                        whileTap='click'
                        onClick={() => {
                            if(manual){
                                setTimeout(() => {
                                    setShowModalBudget(false)
                                }, 500);
                                setShowModalNewBudgetConfirmation(false)
                                filterBudget(data, 'save-budget', 'manual'); 
                            }
                            if(!manual){
                                setTimeout(() => {
                                    setShowModalBudget(false)
                                }, 500);
                                setShowModalNewBudgetConfirmation(false)
                                filterBudget(data, 'save-budget', 'fast'); 
                            }
                        }}
                        title='Guardar'
                        role='save'
                    >
                        <MdCheck />
                    </motion.button>
                    <motion.button
                        variants={variantButtonPress}
                        whileTap='click'
                        onClick={() => {
                            if(manual){
                                setTimeout(() => {
                                    setShowModalBudget(false)
                                }, 500);
                                setShowModalNewBudgetConfirmation(false); 
                                filterBudget(data, 'not-save-budget', 'manual'); 
                            }
                            if(!manual){
                                setTimeout(() => {
                                    setShowModalBudget(false)
                                }, 500);
                                setShowModalNewBudgetConfirmation(false); 
                                filterBudget(data, 'not-save-budget', 'fast'); 
                            }
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

export default BudgetConfirmation;