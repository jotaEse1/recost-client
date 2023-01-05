import React from 'react';
import './BudgetItems.css'
import BudgetRow from './BudgetRow';
import { ingredientI, budgetListI, budgetI, recipeI } from '../interfaces/interfaces'
import { motion } from 'framer-motion';
import { variantBudgetModals, variantButtonPress } from '../animations/variants'

interface Props {
    setShowModalBudgetItems: React.Dispatch<React.SetStateAction<boolean>>,
    setShowModalNewBudgetConfirmation: React.Dispatch<React.SetStateAction<boolean>>,
    setShowModalBudget: React.Dispatch<React.SetStateAction<boolean>>,
    handleBudget: (action: string, data: ingredientI | budgetListI) => void,
    ingredientsArr: ingredientI[] | null,
    budget: budgetI,
    setShowModalAddBudgetRow: React.Dispatch<React.SetStateAction<boolean>>,
    setBudgetRow: React.Dispatch<React.SetStateAction<ingredientI>>,
    setShowModalDeleteBudgetRow: React.Dispatch<React.SetStateAction<boolean>>,
    setIngredientsArr: React.Dispatch<React.SetStateAction<ingredientI[] | null>>,
    updateBudget: boolean,
    setUpdateBudget: React.Dispatch<React.SetStateAction<boolean>>,
    manual: boolean,
    recipeChoosen: recipeI | null
}

const BudgetItems: React.FC<Props> = ({ setShowModalBudgetItems, setShowModalNewBudgetConfirmation, setShowModalBudget, handleBudget, ingredientsArr, budget, setShowModalAddBudgetRow, setBudgetRow, setShowModalDeleteBudgetRow, setIngredientsArr, updateBudget, setUpdateBudget, manual, recipeChoosen }) => {
    const { title, description } = budget;
    //const {ingredients} = recipeChoosen!;

    return (
        <motion.div
            className='budget-items-container'
            variants={variantBudgetModals}
            initial='hide'
            animate='visible'
            exit='exit'
        >
            <h5>{title}</h5>
            <p>{description}</p>
            <div className='budget-items'>
                <h6>Ingredientes del presupuesto</h6>
                <table>
                    <thead>
                        <tr>
                            <th>Ingrediente</th>
                            <th>Unidad en gr</th>
                            <th>Precio</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {manual ? (
                            <>
                                {!ingredientsArr ? (
                                    <tr style={{ height: '5vh', border: '2px solid #041A33' }}>
                                        <td colSpan={4} style={{ textAlign: 'center' }}>No hay ingredientes</td>
                                    </tr>
                                ) : (
                                    (ingredientsArr.length ? (
                                        ingredientsArr.map((row, index) =>
                                            <BudgetRow
                                                key={index}
                                                row={row}
                                                setBudgetRow={setBudgetRow}
                                                setShowModalAddBudgetRow={setShowModalAddBudgetRow}
                                                setShowModalDeleteBudgetRow={setShowModalDeleteBudgetRow}
                                            />)
                                    ) : (
                                        <tr style={{ height: '5vh', border: '2px solid #041A33' }}>
                                            <td colSpan={4} style={{ textAlign: 'center' }}>No hay ingredientes</td>
                                        </tr>
                                    ))
                                )}
                                {!ingredientsArr ? (
                                    <tr style={{ height: '5vh', border: '2px solid #041A33' }}>
                                        <td colSpan={4} style={{ textAlign: 'center' }}>Sin Costo</td>
                                    </tr>
                                ) : (
                                    (ingredientsArr.length ? (
                                        <tr className='add-ingredient'>
                                            <td colSpan={4} role='cost'>
                                                <h5>Costo total: <p>$ {ingredientsArr.reduce((acum, curr) => Number((acum + curr.cost).toFixed(2)), 0)}</p></h5>
                                            </td>
                                        </tr>
                                    ) : (
                                        <tr style={{ height: '5vh', border: '2px solid #041A33' }}>
                                            <td colSpan={4} style={{ textAlign: 'center' }}>Sin Costo</td>
                                        </tr>
                                    ))
                                )}
                            </>
                        ) : (
                            // Renders the recipe choosen ingredients if it's not manual
                            // Remember that recipeChoosen in fast option ALWAYS will have a recipe because the
                            // button is disabled until the user choose a recipe. And if ingredients it's null
                            // or an empty array it's going to be render a modal saying that the recipe has no
                            // ingredients
                            <>
                                {recipeChoosen!.ingredients!.map((row: any, index) =>
                                    <BudgetRow
                                        key={index}
                                        row={row}
                                        setBudgetRow={setBudgetRow}
                                        setShowModalAddBudgetRow={setShowModalAddBudgetRow}
                                        setShowModalDeleteBudgetRow={setShowModalDeleteBudgetRow}
                                    />)
                                }
                                <tr className='add-ingredient'>
                                    <td colSpan={4} role='cost'>
                                        <h5>Costo total: <p>$ {recipeChoosen!.ingredients!.reduce((acum, curr) => Number((acum + curr.cost!).toFixed(2)), 0)}</p></h5>
                                    </td>
                                </tr>
                            </>
                        )}
                        <tr className='add-ingredient'>
                            <td colSpan={4}>
                                <motion.button
                                    variants={variantButtonPress}
                                    whileTap='click'
                                    onClick={() => setShowModalAddBudgetRow(true)}
                                >
                                    Agregar Ingrediente
                                </motion.button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className='budget-modal-buttons'>
                <motion.button
                    variants={variantButtonPress}
                    whileTap='click'
                    onClick={() => {
                        if (updateBudget) {
                            setTimeout(() => {
                                setShowModalBudget(false);
                                setUpdateBudget(false);
                                setIngredientsArr(null)
                            }, 500);
                            return setShowModalBudgetItems(false);
                        }

                        setTimeout(() => {
                            setShowModalBudget(false);
                            setIngredientsArr(null)
                        }, 500);
                        setShowModalBudgetItems(false);
                        handleBudget('delete', budget)
                    }}
                    type='button'
                    name='close'
                >
                    Cancelar
                </motion.button>
                <motion.button
                    variants={variantButtonPress}
                    whileTap='click'
                    type='submit'
                    onClick={() => {
                        setShowModalBudgetItems(false);
                        setTimeout(() => setShowModalNewBudgetConfirmation(true), 300)
                    }}
                >
                    Continuar
                </motion.button>
            </div>
        </motion.div >
    );
};

export default BudgetItems;