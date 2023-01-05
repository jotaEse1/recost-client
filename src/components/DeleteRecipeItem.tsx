import React from 'react';
import './DeleteRecipeItem.css'
import { MdCheck } from 'react-icons/md'
import { IoMdClose } from 'react-icons/io'
import { recipeIngrI } from '../interfaces/interfaces'
import { motion } from 'framer-motion';
import { variantPriceListModals, variantButtonPress } from '../animations/variants'

interface Props {
    setShowModalDeleteRecipeRow: React.Dispatch<React.SetStateAction<boolean>>,
    setRecipeRow:  React.Dispatch<React.SetStateAction<recipeIngrI>>,
    recipeRow: recipeIngrI,
    filterRecipe: (data: recipeIngrI, action: string) => void | NodeJS.Timeout
}

const initialState = { ingredient: '', amount: 0 }

const DeleteRecipeItem: React.FC<Props> = ({setShowModalDeleteRecipeRow, setRecipeRow, recipeRow, filterRecipe}) => {
    return (
        <div
            className='recipe-item-modal-delete'
        >
            <motion.div
                variants={variantPriceListModals}
                initial='hide'
                animate='visible'
                exit='exit'
            >
                <h4>¿Quieres eliminarlo?</h4>
                <div className='recipe-item-modal-delete-buttons'>
                    <motion.button
                        variants={variantButtonPress}
                        whileTap='click'
                        onClick={() => {
                            filterRecipe(recipeRow, 'remove');
                            setRecipeRow(initialState)
                            setShowModalDeleteRecipeRow(false)
                        }}
                        title='Eliminar'
                        role='delete'
                    >
                        <MdCheck />
                    </motion.button>
                    <motion.button
                        variants={variantButtonPress}
                        whileTap='click'
                        onClick={() => { setShowModalDeleteRecipeRow(false); setRecipeRow(initialState) }}
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

export default DeleteRecipeItem;