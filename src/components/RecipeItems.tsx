import React from 'react';
import './RecipeItems.css'
import { recipeIngrI, recipeI } from '../interfaces/interfaces'
import { motion } from 'framer-motion';
import { variantBudgetModals, variantButtonPress } from '../animations/variants'
import { FaListUl } from 'react-icons/fa'
import RecipeRow from './RecipeRow';

interface Props {
    setShowModalRecipeItems: React.Dispatch<React.SetStateAction<boolean>>,
    ingredientsRecipeArr: recipeIngrI[] | null,
    setShowModalNewRecipeConfirmation: React.Dispatch<React.SetStateAction<boolean>>,
    setShowModalRecipe: React.Dispatch<React.SetStateAction<boolean>>,
    handleRecipe: (action: string, data: recipeIngrI | recipeI) => void,
    recipe: recipeI,
    setShowModalAddRecipeRow: React.Dispatch<React.SetStateAction<boolean>>,
    setRecipeRow: React.Dispatch<React.SetStateAction<recipeIngrI>>,
    setShowModalDeleteRecipeRow: React.Dispatch<React.SetStateAction<boolean>>,
    setIngredientsRecipeArr: React.Dispatch<React.SetStateAction<recipeIngrI[] | null>>,
    updateRecipe: boolean,
    setUpdateRecipe: React.Dispatch<React.SetStateAction<boolean>>,
    setShowModalPriceList: React.Dispatch<React.SetStateAction<boolean>>
}

const RecipeItems: React.FC<Props> = ({ setShowModalRecipeItems, ingredientsRecipeArr, setShowModalNewRecipeConfirmation, setShowModalRecipe, handleRecipe, recipe, setShowModalAddRecipeRow, setRecipeRow, setShowModalDeleteRecipeRow, setIngredientsRecipeArr, updateRecipe, setUpdateRecipe, setShowModalPriceList }) => {
    const { title, description } = recipe;

    return (
        <motion.div
            className='recipe-items-container'
            variants={variantBudgetModals}
            initial='hide'
            animate='visible'
            exit='exit'
        >
            <h5>{title}</h5>
            <p>{description}</p>
            <div className='items-container'>
                <h6>Ingredientes de la Receta</h6>
                <table>
                    <thead>
                        <tr>
                            <th>Ingrediente</th>
                            <th>Unidad en gr</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!ingredientsRecipeArr ? (
                            <tr style={{ height: '5vh', border: '2px solid #041A33' }}>
                                <td colSpan={4} style={{ textAlign: 'center' }}>No hay ingredientes</td>
                            </tr>
                        ) : (
                            (ingredientsRecipeArr.length ? (
                                ingredientsRecipeArr.map((row, index) =>
                                    <RecipeRow
                                        key={index}
                                        row={row}
                                        setRecipeRow={setRecipeRow}
                                        setShowModalAddRecipeRow={setShowModalAddRecipeRow}
                                        setShowModalDeleteRecipeRow={setShowModalDeleteRecipeRow}
                                    />)
                            ) : (
                                <tr style={{ height: '5vh', border: '2px solid #041A33' }}>
                                    <td colSpan={4} style={{ textAlign: 'center' }}>No hay ingredientes</td>
                                </tr>
                            ))
                            // ingredientsRecipeArr.map((row, index) =>
                            //     <RecipeRow
                            //         key={index}
                            //         row={row}
                            //         setRecipeRow={setRecipeRow}
                            //         setShowModalAddRecipeRow={setShowModalAddRecipeRow}
                            //         setShowModalDeleteRecipeRow={setShowModalDeleteRecipeRow}
                            //     />)
                        )}
                        <tr className='add-ingredient'>
                            <td colSpan={4}>
                                <motion.button
                                    variants={variantButtonPress}
                                    whileTap='click'
                                    onClick={() => setShowModalAddRecipeRow(true)}
                                >
                                    Agregar Ingrediente
                                </motion.button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className='recipe-modal-buttons'>
                <motion.button
                    variants={variantButtonPress}
                    whileTap='click'
                    onClick={() => {
                        if (updateRecipe) {
                            setTimeout(() => {
                                setShowModalRecipe(false);
                                setUpdateRecipe(false);
                                setIngredientsRecipeArr(null)
                            }, 500);
                            return setShowModalRecipeItems(false);
                        }

                        setTimeout(() => {
                            setShowModalRecipe(false);
                            setIngredientsRecipeArr(null)
                        }, 500);
                        setShowModalRecipeItems(false);
                        handleRecipe('delete', recipe)
                    }}
                    type='button'
                    name='close'
                >
                    Cancelar
                </motion.button>
                <motion.button
                    variants={variantButtonPress}
                    whileTap='click'
                    type='button'
                    title='Ver lista de precios'
                    name='showList'
                    role='list'
                    onClick={() => setShowModalPriceList(true)}
                >
                    <FaListUl />
                </motion.button>
                <motion.button
                    variants={variantButtonPress}
                    whileTap='click'
                    type='submit'
                    onClick={() => {
                        setShowModalRecipeItems(false);
                        setTimeout(() => setShowModalNewRecipeConfirmation(true), 300)
                    }}
                >
                    Continuar
                </motion.button>
            </div>
        </motion.div>
    );
};

export default RecipeItems;