import React from 'react';
import { ingredientI } from '../interfaces/interfaces';

interface Props {
    row: ingredientI
}

const BudgetDetailsRow: React.FC<Props> = ({row}) => {
    const {ingredient, amount, cost} = row;

    return (
        <tr className='row'>
            <td>{ingredient}</td>
            <td>{amount}gr</td>
            <td>$ {cost}</td>
        </tr>
    );
};

export default BudgetDetailsRow;