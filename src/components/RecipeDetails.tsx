import React, { useState } from 'react';
import './RecipeDetails.css'
import { IoMdClose } from 'react-icons/io'
import { motion } from 'framer-motion';
import { variantPriceListModals, variantButtonPress } from '../animations/variants'
import { recipeI, recipeIngrI } from '../interfaces/interfaces';
import RecipeDetailsRow from './RecipeDetailsRow';

interface Props {
    setShowRecipeDetails: React.Dispatch<React.SetStateAction<boolean>>,
    recipe: recipeI,
    setIngredientsRecipeArr: React.Dispatch<React.SetStateAction<recipeIngrI[] | null>>,
    setShowModalRecipeItems: React.Dispatch<React.SetStateAction<boolean>>,
    setShowModalRecipe: React.Dispatch<React.SetStateAction<boolean>>,
    setUpdateRecipe: React.Dispatch<React.SetStateAction<boolean>>,
    setShowDeleteRecipe: React.Dispatch<React.SetStateAction<boolean>>
}

const RecipeDetails: React.FC<Props> = ({ setShowRecipeDetails, recipe, setIngredientsRecipeArr, setShowModalRecipeItems, setShowModalRecipe, setUpdateRecipe, setShowDeleteRecipe }) => {
    const [utility, setUtility] = useState(300);

    const { title, description, ingredients } = recipe,
        total = ingredients ? ingredients.reduce((acum, curr) => Number((acum + curr.cost!).toFixed(2)), 0) : 0;

    const handleUtility = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUtility(Number(e.target.value))
    }

    return (
        <motion.div
            className='recipe-details-container'
            variants={variantPriceListModals}
            initial='hide'
            animate='visible'
            exit='exit'
        >
            <h5>{title}</h5>
            <p>{description}</p>
            <motion.button
                variants={variantButtonPress}
                whileTap='click'
                onClick={() => {
                    setTimeout(() => {
                        setShowModalRecipe(false)
                    }, 500);
                    setShowRecipeDetails(false)
                }}
                type='button'
                name='close'
                title='Cerrar pestaña'
                role='close'
            >
                <IoMdClose />
            </motion.button>
            <div className='details-container'>
                <h6>Ingredientes de la receta</h6>
                <table>
                    <thead>
                        <tr>
                            <th>Ingrediente</th>
                            <th>Unidad en gr</th>
                            <th>Precio</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!ingredients ? (
                            <tr style={{ height: '5vh', border: '2px solid #041A33' }}>
                                <td colSpan={3} style={{ textAlign: 'center' }}>No hay ingredientes</td>
                            </tr>
                        ) : (
                            (ingredients.length ? (
                                ingredients.map((row, index) =>
                                    <RecipeDetailsRow
                                        key={index}
                                        row={row}
                                    />)
                            ) : (
                                <tr style={{ height: '5vh', border: '2px solid #041A33' }}>
                                    <td colSpan={3} style={{ textAlign: 'center' }}>No hay ingredientes</td>
                                </tr>
                            ))
                        )}
                        {!ingredients ? (
                            <tr style={{ height: '5vh', border: '2px solid #041A33' }}>
                                <td colSpan={3} style={{ textAlign: 'center' }}>Sin Costo</td>
                            </tr>
                        ) : (
                            (ingredients.length ? (
                                <>
                                    <tr className='total-cost'>
                                        <td colSpan={3}>
                                            <h5>Costo total: <p>$ {total}</p></h5>
                                        </td>
                                    </tr>
                                    <tr className='price-detail-row'>
                                        <td colSpan={1} className='input-td'>
                                            <p>% utilidad</p>
                                            <input
                                                type="number"
                                                min='0'
                                                value={utility ? utility : ''}
                                                onChange={handleUtility}
                                            />%
                                        </td>
                                        <td colSpan={2} className='prices-td'>
                                            <h5>
                                                Precio final: <p>$ {(total * ((utility / 100) + 1)).toFixed(2)}</p>
                                            </h5>
                                            <h5>
                                                Utilidad: <p>$ {((total * ((utility / 100) + 1)) - total).toFixed(2)}</p>
                                            </h5>
                                        </td>
                                    </tr>
                                </>

                            ) : (
                                <tr style={{ height: '5vh', border: '2px solid #041A33' }}>
                                    <td colSpan={3} style={{ textAlign: 'center' }}>Sin Costo</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            <div className='recipe-modal-buttons'>
                <motion.button
                    variants={variantButtonPress}
                    whileTap='click'
                    onClick={() => {
                        setShowDeleteRecipe(true)
                    }}
                    type='button'
                    name='delete'
                    title='Eliminar receta'
                >
                    Eliminar
                </motion.button>
                <motion.button
                    variants={variantButtonPress}
                    whileTap='click'
                    type='submit'
                    onClick={() => {
                        setIngredientsRecipeArr(ingredients!)
                        setTimeout(() => {
                            setUpdateRecipe(true)
                            setShowModalRecipeItems(true);
                        }, 500);
                        setShowRecipeDetails(false)
                    }}
                    title='Modificar receta'
                >
                    Modificar
                </motion.button>
            </div>
        </motion.div>
    );
};

export default RecipeDetails;