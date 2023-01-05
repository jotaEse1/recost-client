import React from 'react';
import { recipeIngrI } from '../interfaces/interfaces';
import './RecipeDetailsRow.css'

interface Props {
    row: recipeIngrI
}

const RecipeDetailsRow: React.FC<Props> = ({row}) => {
    const { ingredient, amount, cost } = row;

    return (
        <tr className='row'>
            <td>{ingredient}</td>
            <td>{amount}gr</td>
            <td>$ {cost}</td>
        </tr>
    );
};

export default RecipeDetailsRow;