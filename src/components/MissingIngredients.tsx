import { motion } from 'framer-motion';
import React from 'react';
import './MissingIngredients.css'
import { IoMdClose } from 'react-icons/io'
import { variantButtonPress, variantPriceListModals } from '../animations/variants';
import { budgetI, budgetListI, ingredientI } from '../interfaces/interfaces';


interface Props {
    missingIngr: string[],
    setShowModalMissingIngr: React.Dispatch<React.SetStateAction<boolean>>,
    setShowModalBudget: React.Dispatch<React.SetStateAction<boolean>>,
    handleBudget: (action: string, data: ingredientI | budgetListI) => void,
    budget: budgetI
}

const MissingIngredients: React.FC<Props> = ({missingIngr, setShowModalMissingIngr, setShowModalBudget, handleBudget, budget}) => {
    return (
        <div className='missing-modal'>
            <motion.div 
                className='missing-content'
                variants={variantPriceListModals}
                initial='hide'
                animate='visible'
                exit='exit'    
            >
                <h5>!Faltan ingredientes!</h5>
                <p>Para continuar debe cargar estos ingredientes en su lista de precios:</p>
                <div className='missing-list'>
                    {missingIngr.map((ingr, i) => 
                        <div className='missing-ingredient' key={i}>
                            <p role='list'>{ingr}</p>
                        </div>    
                    )}
                </div>
                <motion.button
                    variants={variantButtonPress}
                    whileTap='click'
                    type='button'
                    name='close'
                    role='close'
                    onClick={() => {
                        setTimeout(() => {
                            setShowModalBudget(false)
                            
                        }, 500);
                        setShowModalMissingIngr(false)
                        handleBudget('delete', budget)
                    }}
                ><IoMdClose /></motion.button>
            </motion.div>
        </div>
    );
};

export default MissingIngredients;