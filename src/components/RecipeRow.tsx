import React from 'react';
import './RecipeRow.css'
import { BsPencilSquare } from 'react-icons/bs'
import { RiDeleteBin5Fill } from 'react-icons/ri'
import { recipeIngrI } from '../interfaces/interfaces';
import { motion } from 'framer-motion';
import { variantButtonPress } from '../animations/variants';


interface Props {
    row: recipeIngrI, 
    setRecipeRow: React.Dispatch<React.SetStateAction<recipeIngrI>>, 
    setShowModalAddRecipeRow: React.Dispatch<React.SetStateAction<boolean>>, 
    setShowModalDeleteRecipeRow: React.Dispatch<React.SetStateAction<boolean>>
}

const RecipeRow: React.FC<Props> = ({ row, setRecipeRow, setShowModalAddRecipeRow, setShowModalDeleteRecipeRow }) => {
    const { ingredient, amount } = row

    return (
        <tr className='row'>
            <td>{ingredient}</td>
            <td>{amount}gr</td>
            <td>
                <motion.button
                    variants={variantButtonPress}
                    whileTap='click'
                    onClick={() => { setRecipeRow(row); setShowModalAddRecipeRow(true) }}
                    title='Modificar ingrediente'
                    name='edit'
                    role='edit'
                >
                    <BsPencilSquare />
                </motion.button>
                <motion.button
                    variants={variantButtonPress}
                    whileTap='click'
                    onClick={() => { setRecipeRow(row); setShowModalDeleteRecipeRow(true) }}
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

export default RecipeRow;