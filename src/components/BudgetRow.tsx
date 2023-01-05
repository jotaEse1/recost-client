import React from 'react';
import './BudgetRow.css'
import {BsPencilSquare} from 'react-icons/bs'
import {RiDeleteBin5Fill} from 'react-icons/ri'
import {ingredientI} from '../interfaces/interfaces'
import { motion } from 'framer-motion';
import { variantButtonPress } from '../animations/variants';

interface Props {
    row: ingredientI,
    setBudgetRow: React.Dispatch<React.SetStateAction<ingredientI>>,
    setShowModalAddBudgetRow: React.Dispatch<React.SetStateAction<boolean>>,
    setShowModalDeleteBudgetRow: React.Dispatch<React.SetStateAction<boolean>>
}

const BudgetRow: React.FC<Props> = ({row, setBudgetRow, setShowModalAddBudgetRow, setShowModalDeleteBudgetRow}) => {
    const {ingredient, amount, cost} = row;

    return (
        <tr className='row'>
            <td>{ingredient}</td>
            <td>{amount}gr</td>
            <td>$ {cost}</td>
            <td>
                <motion.button
                    variants={variantButtonPress}
                    whileTap='click'
                    onClick={() => {setBudgetRow(row); setShowModalAddBudgetRow(true)}}
                    title='Modificar ingrediente'
                    name='edit'
                    role='edit'
                >
                    <BsPencilSquare />
                </motion.button>
                <motion.button
                    variants={variantButtonPress}
                    whileTap='click'
                    onClick={() => {setBudgetRow(row); setShowModalDeleteBudgetRow(true)}}
                    title='Eliminar ingrediente'
                    name='delete'
                    role='delete'
                >
                    <RiDeleteBin5Fill />
                </motion.button>
            </td>
        </tr>
    );
};

export default BudgetRow;