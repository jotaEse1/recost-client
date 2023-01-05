import React, { useState } from 'react';
import { budgetI } from '../interfaces/interfaces';
import './OptionRecipe.css'
import { AiOutlineUp, AiOutlineDown } from 'react-icons/ai'
import { motion } from 'framer-motion';
import { variantAppearOption } from '../animations/variants';

interface Props {
    data: budgetI,
    setRecipeChoosen: React.Dispatch<React.SetStateAction<budgetI | null>>,
    id: string,
    selected: string,
    setSelected: React.Dispatch<React.SetStateAction<string>>
}

const OptionRecipe: React.FC<Props> = ({ data, setRecipeChoosen, id, selected, setSelected }) => {
    const [showRecipe, setShowRecipe] = useState(false);

    const { title, ingredients } = data;

    return (
        <div
            className='optionRecipe-container'
            onClick={() => { setRecipeChoosen(data); setSelected(id) }}
            style={selected === id ? { border: '2px solid #5699F6' } : { border: '2px solid transparent' }}
            title='Haga click para seleccionar esta receta'
            role='pressable'
        >
            <h5>{title}</h5>
            {!showRecipe ? (
                <button
                    onClick={() => setShowRecipe(true)}
                    className='view-button'
                    title='Mostrar receta'
                    role='open'
                ><AiOutlineDown /></button>
            ) : (
                <>
                    <button
                        onClick={() => setShowRecipe(false)}
                        className='view-button'
                        title='Cerrar receta'
                        role='close'
                    ><AiOutlineUp /></button>
                    <motion.div
                        variants={variantAppearOption}
                        initial='hide'
                        animate='visible'
                    >
                        <table>
                            <thead>
                                <tr>
                                    <th>Ingrediente</th>
                                    <th>Unidad en gr</th>
                                </tr>
                            </thead>
                            <tbody>
                                {!ingredients ? (
                                    <tr style={{ height: '5vh', border: '2px solid #041A33' }}>
                                        <td colSpan={3} style={{ textAlign: 'center' }}>No hay ingredientes</td>
                                    </tr>
                                ) : (
                                    (ingredients.length ? (
                                        ingredients.map(row =>
                                            <tr key={row._id}>
                                                <td role='list'>{row.ingredient}</td>
                                                <td>{row.amount}gr</td>
                                            </tr>
                                        )
                                    ) : (
                                        <tr style={{ height: '5vh', border: '2px solid #041A33' }}>
                                            <td colSpan={3} style={{ textAlign: 'center' }}>No hay ingredientes</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </motion.div>
                </>
            )}


        </div>
    );
};

export default OptionRecipe;