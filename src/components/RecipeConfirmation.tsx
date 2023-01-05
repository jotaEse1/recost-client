import React from 'react';
import './RecipeConfirmation.css'
import { motion } from 'framer-motion';
import { variantBudgetModals, variantButtonPress } from '../animations/variants'
import {MdCheck} from 'react-icons/md'
import {IoMdClose} from 'react-icons/io'
import { recipeIngrI } from '../interfaces/interfaces';

interface Props {
    setShowModalNewRecipeConfirmation: React.Dispatch<React.SetStateAction<boolean>>,
    setShowModalRecipe: React.Dispatch<React.SetStateAction<boolean>>,
    filterRecipe: (data: recipeIngrI, action: string) => void
}

const data = {ingredient: '', amount: 0}

const RecipeConfirmation: React.FC<Props> = ({setShowModalNewRecipeConfirmation, setShowModalRecipe, filterRecipe}) => {
    return (
        <div className='recipe-confirmation-modal'>
            <motion.div
                variants={variantBudgetModals}
                initial='hide'
                animate='visible'
                exit='exit'
            >
                <h4>¿Quieres guardar la receta?</h4>
                <div className='recipe-confirmation-modal-buttons'>
                    <motion.button
                        variants={variantButtonPress}
                        whileTap='click'
                        onClick={() => {
                            setTimeout(() => {
                                setShowModalRecipe(false)
                            }, 500);
                            setShowModalNewRecipeConfirmation(false)
                            filterRecipe(data, 'save-recipe');
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
                            setTimeout(() => {
                                setShowModalRecipe(false)
                            }, 500);
                            setShowModalNewRecipeConfirmation(false);
                            filterRecipe(data, 'not-save-recipe');
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

export default RecipeConfirmation;