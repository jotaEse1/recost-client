import React from 'react';
import './DeleteRecipe.css'
import {MdCheck} from 'react-icons/md'
import {IoMdClose} from 'react-icons/io'
import { recipeI, recipeIngrI } from '../interfaces/interfaces';
import { motion } from 'framer-motion';
import { variantPriceListModals, variantButtonPress } from '../animations/variants'

interface Props {
    setShowDeleteRecipe: React.Dispatch<React.SetStateAction<boolean>>,
    setShowModalRecipe: React.Dispatch<React.SetStateAction<boolean>>,
    setShowRecipeDetails: React.Dispatch<React.SetStateAction<boolean>>,
    handleRecipe: (action: string, data: recipeIngrI | recipeI) => void,
    recipe: recipeI
}

const DeleteRecipe: React.FC<Props> = ({setShowDeleteRecipe, setShowModalRecipe, setShowRecipeDetails, handleRecipe, recipe}) => {
    return (
        <div 
            className='recipe-details-modal-delete'
        >
            <motion.div
                variants={variantPriceListModals}
                initial='hide'
                animate='visible'
                exit='exit'
            >
                <h4>¿Quieres eliminar la receta?</h4>
                <div className='recipe-details-modal-delete-buttons'>
                    <motion.button
                        variants={variantButtonPress}
                        whileTap='click'
                        onClick={() => {
                            setTimeout(() => {
                                setShowModalRecipe(false)
                                setShowRecipeDetails(false)
                            }, 500);
                            setShowDeleteRecipe(false)
                            handleRecipe('delete', recipe)
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
                            setShowDeleteRecipe(false)
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

export default DeleteRecipe;