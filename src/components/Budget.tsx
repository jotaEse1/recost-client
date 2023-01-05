import React from 'react';
import './Budget.css'
import { budgetI } from '../interfaces/interfaces'
import { motion } from 'framer-motion';
import { variantBudget } from '../animations/variants';

interface Props {
    data: budgetI,
    setShowBudgetDetails: React.Dispatch<React.SetStateAction<boolean>>,
    setBudget: React.Dispatch<React.SetStateAction<budgetI>>,
    setShowModalBudget: React.Dispatch<React.SetStateAction<boolean>>
}

const Budget: React.FC<Props> = ({data, setShowBudgetDetails, setBudget, setShowModalBudget }) => {
    const {title, description, total} = data

    return (
        <motion.div 
            className='single-budget-container'
            title='Haga click para verlo en detalle'
            onClick={() => {
                setBudget(data)
                setShowModalBudget(true)
                setShowBudgetDetails(true) 
            }}
            variants={variantBudget}
            whileTap='click'
            role='open'
        >
            <div className='budget-title'>
                <h5>{title}</h5>
            </div>
            <div className='budget-description'>
                <p>{description}</p>
            </div>
            <div className='budget-price'>
                <h5>
                    <p>Monto: </p> $ {total}
                </h5>
            </div>
        </motion.div>
    );
};

export default Budget;