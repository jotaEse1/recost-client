import React, { useState } from 'react';
import { budgetI, ingredientI } from '../interfaces/interfaces';
import './BudgetDetails.css'
import BudgetDetailsRow from './BudgetDetailsRow';
import { IoMdClose } from 'react-icons/io'
import { motion } from 'framer-motion';
import { variantPriceListModals, variantButtonPress } from '../animations/variants'


interface Props {
    setShowBudgetDetails: React.Dispatch<React.SetStateAction<boolean>>,
    budget: budgetI,
    setBudgetRow: React.Dispatch<React.SetStateAction<ingredientI>>,
    setIngredientsArr: React.Dispatch<React.SetStateAction<ingredientI[] | null>>,
    setShowModalBudgetItems: React.Dispatch<React.SetStateAction<boolean>>
    setShowModalBudget: React.Dispatch<React.SetStateAction<boolean>>,
    setUpdateBudget: React.Dispatch<React.SetStateAction<boolean>>,
    setShowDeleteBudget: React.Dispatch<React.SetStateAction<boolean>>
}

const BudgetDetails: React.FC<Props> = ({ setShowBudgetDetails, budget, setBudgetRow, setIngredientsArr, setShowModalBudgetItems, setShowModalBudget, setUpdateBudget, setShowDeleteBudget }) => {
    const [utility, setUtility] = useState(300);

    const { title, description, ingredients } = budget,
        total = ingredients ? ingredients.reduce((acum, curr) => Number((acum + curr.cost!).toFixed(2)), 0) : 0;

    const handleUtility = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUtility(Number(e.target.value))
    }

    return (
        <motion.div
            className='budget-details-container'
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
                        setShowModalBudget(false)

                    }, 500);
                    setShowBudgetDetails(false)
                }}
                type='button'
                name='close'
                title='Cerrar pestaña'
            >
                <IoMdClose />
            </motion.button>
            <div className='budget-details'>
                <h6>Ingredientes del presupuesto</h6>
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
                                    <BudgetDetailsRow
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
                                    <tr className='add-ingredient'>
                                        <td colSpan={3}>
                                            <h5>Costo total: <p> $ {ingredients.reduce((acum, curr) => Number((acum + curr.cost).toFixed(2)), 0)}</p></h5>
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
            <div className='budget-modal-buttons'>
                <motion.button
                    variants={variantButtonPress}
                    whileTap='click'
                    onClick={() => {
                        setShowDeleteBudget(true)
                    }}
                    type='button'
                    name='delete'
                    title='Eliminar presupuesto'
                >
                    Eliminar
                </motion.button>
                <motion.button
                    variants={variantButtonPress}
                    whileTap='click'
                    type='submit'
                    onClick={() => {
                        setIngredientsArr(ingredients!)
                        setTimeout(() => {
                            setUpdateBudget(true)
                            setShowModalBudgetItems(true);
                        }, 500);
                        setShowBudgetDetails(false)
                    }}
                    title='Modificar presupuesto'
                >
                    Modificar
                </motion.button>
            </div>
        </motion.div>
    );
};

export default BudgetDetails;